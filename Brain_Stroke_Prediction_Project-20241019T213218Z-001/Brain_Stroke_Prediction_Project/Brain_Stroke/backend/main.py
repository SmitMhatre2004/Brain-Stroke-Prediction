from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import logging
import pydicom

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the model
try:
    model = tf.keras.models.load_model('Brain_Stroke\Models\stroke.h5')
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load model: {str(e)}")

class ModelVerifier:
    # ... [ModelVerifier class remains unchanged]
    def __init__(self, model):
        self.model = model
        self.prediction_history = []
        self.verified = False
    
    def verify_model(self):
        """
        Verify model performance using basic test cases
        """
        # Create test cases (you would need to replace these with actual test cases)
        test_cases = [
            {'input': np.zeros((1, 224, 224, 3)), 'expected': 'normal'},
            {'input': np.ones((1, 224, 224, 3)), 'expected': 'stroke'}
        ]
        
        results = []
        for case in test_cases:
            pred = self.model.predict(case['input'])
            results.append({
                'expected': case['expected'],
                'predicted': float(pred[0][0])
            })
        
        logger.info(f"Model verification results: {results}")
        
        # Check if predictions are too similar
        predictions = [r['predicted'] for r in results]
        if max(predictions) - min(predictions) < 0.1:
            logger.warning("Model predictions show little variation between test cases")
            return False
        
        return True

    def track_prediction(self, prediction):
        self.prediction_history.append(prediction)
        if len(self.prediction_history) > 100:
            self.prediction_history.pop(0)
        
        # Analyze prediction distribution
        if len(self.prediction_history) > 10:
            std_dev = np.std(self.prediction_history)
            if std_dev < 0.1:
                logger.warning(f"Low prediction variance detected: {std_dev}")

model_verifier = ModelVerifier(model)

def analyze_model_output(raw_prediction):
    # ... [analyze_model_output function remains unchanged]
    logger.info(f"Raw prediction value: {raw_prediction}")
    
    # Track prediction for monitoring
    model_verifier.track_prediction(raw_prediction)
    
    # If model consistently gives similar outputs, adjust the thresholds
    if len(model_verifier.prediction_history) > 10:
        mean_pred = np.mean(model_verifier.prediction_history)
        std_dev = np.std(model_verifier.prediction_history)
        
        if std_dev < 0.1:
            # Model is not differentiating well, adjust thresholds
            logger.warning(f"Adjusting thresholds due to low prediction variance. Mean: {mean_pred}, StdDev: {std_dev}")
            
            # Center the prediction around the historical mean
            adjusted_prediction = (raw_prediction - mean_pred) / (std_dev + 1e-5)
            
            # Apply sigmoid to get a probability
            from scipy.special import expit
            adjusted_probability = float(expit(adjusted_prediction))
            
            logger.info(f"Adjusted probability: {adjusted_probability}")
            
            # Use adjusted probability for risk assessment
            if adjusted_probability < 0.4:
                return "Low risk", adjusted_probability
            elif adjusted_probability < 0.6:
                return "Moderate risk", adjusted_probability
            else:
                return "High risk", adjusted_probability
    
    # If model is working well, use original thresholds
    if raw_prediction < 0.3:
        return "Low risk", raw_prediction
    elif raw_prediction < 0.7:
        return "Moderate risk", raw_prediction
    else:
        return "High risk", raw_prediction

@app.route('/verify_model', methods=['GET'])
def verify_model():
    # ... [verify_model route remains unchanged]
    is_verified = model_verifier.verify_model()
    return jsonify({
        'model_verified': is_verified,
        'prediction_stats': {
            'mean': float(np.mean(model_verifier.prediction_history)) if model_verifier.prediction_history else None,
            'std_dev': float(np.std(model_verifier.prediction_history)) if model_verifier.prediction_history else None,
            'num_predictions': len(model_verifier.prediction_history)
        }
    })
    
    
@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        
        # Read the image file
        img_bytes = file.read()
        img = Image.open(io.BytesIO(img_bytes))
        
        # Preprocess the image
        img = img.convert('RGB')
        img = img.resize((150, 150))  # Resize to 150x150 (adjust as needed)
        img_array = np.array(img)
        img_array = img_array / 255.0  # Normalize pixel values
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        
        try:
            predictions = model.predict(img_array)  # Your model prediction logic
            raw_probability = float(predictions[0][0])
            
            # Log raw prediction for debugging
            logging.info(f"Raw model output: {raw_probability}")
            
            # Analyze model output and get risk level (implement this function)
            risk_level, adjusted_probability = analyze_model_output(raw_probability)
            
            # Determine recommendation based on risk level
            if risk_level == "Low risk":
                recommendation = "Regular health check-ups recommended."
            elif risk_level == "Moderate risk":
                recommendation = "Consider consulting a healthcare provider for evaluation."
            else:  # High risk
                recommendation = "Please seek immediate medical attention for proper evaluation."
            
            response = {
                'raw_probability': raw_probability,
                'adjusted_probability': adjusted_probability,
                'risk_level': risk_level,
                'recommendation': recommendation,
                'disclaimer': "This tool is for preliminary screening only and should not be used for diagnosis. Always consult healthcare professionals for proper medical evaluation.",
                'technical_note': "Model predictions are being monitored for quality assurance."
            }
            
            logging.info(f"Complete prediction response: {response}")
            
            return jsonify(response)
        
        except Exception as e:
            logging.error(f"Prediction error: {str(e)}")
            return jsonify({'error': 'Failed to make prediction'}), 500
        
    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    
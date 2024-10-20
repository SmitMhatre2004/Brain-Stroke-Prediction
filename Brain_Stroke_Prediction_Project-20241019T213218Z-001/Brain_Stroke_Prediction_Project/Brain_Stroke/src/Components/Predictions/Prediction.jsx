import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setPredictionResult(null);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select an image first.');
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    const formData = new FormData();
    formData.append('image', selectedFile);
  
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      // Check for response status
      if (!response.ok) {
        throw new Error(data.error || 'Prediction failed. Please try again.');
      }
  
      // Set prediction result state with response data
      setPredictionResult(data);
    } catch (err) {
      setError(err.message || 'Failed to get prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Low risk': return '#4caf50'; // Green
      case 'Moderate risk': return '#ff9800'; // Orange
      case 'High risk': return '#f44336'; // Red
      default: return '#000000'; // Black
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Stroke Risk Screening Tool</h1>
      
      <div style={{ 
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <h3>Important Notice</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>
          This tool is for preliminary screening purposes only and should not be used for diagnosis.
          The results may include false positives. Always consult healthcare professionals for proper medical evaluation.
        </p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ marginBottom: '10px' }}
        />
        <p style={{ fontSize: '14px', color: '#666' }}>
          Supported formats: PNG, JPG, JPEG, BMP, TIFF
        </p>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {imagePreview && (
          <div style={{ flex: 1 }}>
            <h3>Selected Image</h3>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
            />
          </div>
        )}
      </div>

      <button 
        onClick={handleSubmit} 
        disabled={!selectedFile || isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: !selectedFile || isLoading ? 'not-allowed' : 'pointer',
          width: '100%',
          fontSize: '16px'
        }}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Image'}
      </button>

      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>
      )}

      {predictionResult && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '4px' 
        }}>
          <h2>Analysis Results</h2>
          <div style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '4px'
          }}>
            <h3 style={{ 
              color: getRiskLevelColor(predictionResult.risk_level),
              marginBottom: '10px'
            }}>
              {predictionResult.risk_level}
            </h3>
            <p><strong>Recommendation:</strong> {predictionResult.recommendation}</p>
            <p><strong>Raw Probability:</strong> {predictionResult.raw_probability}</p>
            <p><strong>Adjusted Probability:</strong> {predictionResult.adjusted_probability}</p>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <h3>Important Notes</h3>
            <ul style={{ fontSize: '14px', color: '#666' }}>
              <li>{predictionResult.disclaimer}</li>
              <li>{predictionResult.technical_note}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

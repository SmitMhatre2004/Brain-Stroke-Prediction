import React from "react";
import "./Contact.css";
import msg_icon from "../../assets/msg-icon.png";
import mail_icon from "../../assets/mail-icon.png";
import phone_icon from "../../assets/phone-icon.png";
import location_icon from "../../assets/location-icon.png";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "58fc7ff9-2f36-4ecd-bc80-3582569e4b46");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="main-contact">
      <h1 className="main_title">Contact</h1>
      <div className="contact">
        <div className="contact-col">
          <h3>
            Send us a message <img src={msg_icon} alt="" />
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            neque quas iste dolores quae possimus. Placeat temporibus, incidunt
            ut accusamus nulla fugit et quos dignissimos iusto distinctio modi
            exercitationem repellendus?
          </p>
          <ul>
            <li>
              {" "}
              <img src={mail_icon} alt="" />
              dhruv.222373105@vcet.edu.in
            </li>
            <li>
              <img src={phone_icon} alt="" />
              +1 234 567 8901
            </li>
            <li>
              <img src={location_icon} alt="" />
              Address
              <br />
              address
            </li>
          </ul>
        </div>
        <div className="contact-col">
          <form onSubmit={onSubmit}>
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
            <label>Phone number</label>
            <input
              type=" tel"
              name="phone"
              placeholder="Enter your phone number"
              required
            />
            <label>Write your message here</label>
            <textarea
              name="message"
              rows="6"
              placeholder="Enter your message"
              required
            ></textarea>
            <button type="submit" className="btn-dark-btn">
              Submit now
            </button>
          </form>
          <span>{result}</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;

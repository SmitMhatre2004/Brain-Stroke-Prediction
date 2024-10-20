import React from "react";
import "./Hero.css";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";
const Hero = () => {
  const loadExternalScript = () => {
    const script = document.createElement("script");
    script.src = "App.js";
    script.async = true;
    document.body.appendChild(script);

    // Call the function from the external script
    script.onload = () => {
      if (typeof runExternalScript === "function") {
        runExternalScript();
      }
    };
  };

  return (
    <div className="hero container">
      <div className="hero-text">
        <h1>AI-Powered Brain Stroke Predictions</h1>
        <h1>– Because Every Second Counts</h1>

        <Link to="prediction " smooth={true} offset={-100} duration={500}>
          <button className="btn">GET STARTED</button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default Hero;

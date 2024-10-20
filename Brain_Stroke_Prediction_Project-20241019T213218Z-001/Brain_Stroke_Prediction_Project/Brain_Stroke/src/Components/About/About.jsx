import React from "react";
import "./About.css";
import About_img from "../../assets/About.jpg";
const About = () => {
  return (
    <div className="about">
      <div className="about-left">
        <img src={About_img} alt="" className="about-img" />
      </div>

      <div className="about-right">
        <h3>ABOUT</h3>
        <h2>Predict. Prevent. Protect </h2>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
          expedita placeat nihil provident voluptatem aspernatur doloribus
          mollitia esse officiis cum optio, natus soluta repellat! Eos, ducimus?
          Odit facere cumque dolores. Sequi assumenda, similique maiores magni
          tenetur blanditiis praesentium nemo, dignissimos architecto id
          doloremque, corrupti repellat? Ratione nihil hic magni at sed sint
          maxime nisi porro corrupti quisquam? Est, quidem et. Blanditiis porro
          id accusamus nobis, illum laboriosam labore unde cumque autem saepe
          dolor. Odio, velit iure dolore fugiat delectus quasi itaque ullam
          optio! Veritatis, quasi ea. Autem praesentium est voluptas. Voluptate
          repudiandae maxime doloremque ipsum illo. Veniam commodi eligendi
          dolorum ratione? Alias dolor illo excepturi delectus ut quibusdam,
          dignissimos unde eaque placeat est nemo illum dolore veniam hic porro
          cupiditate?
        </p>
      </div>
    </div>
  );
};

export default About;

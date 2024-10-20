import React, { useEffect, useState } from "react";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";

import "./Navbar1.css";
import logo from "../../assets/logo.png";
const Navbar1 = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []);

  return (
    <nav className={`container ${sticky ? "dark-nav" : ""}`}>
      <img src={logo} alt="" className="logo" />

      <ul>
        <li>
          <button className="btn">Back</button>{" "}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar1;

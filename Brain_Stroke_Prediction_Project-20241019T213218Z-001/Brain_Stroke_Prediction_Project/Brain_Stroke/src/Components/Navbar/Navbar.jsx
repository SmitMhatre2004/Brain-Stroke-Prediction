import React, { useEffect, useState } from "react";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";

import "./Navbar.css";
import logo from "../../assets/logo.png";
const Navbar = () => {
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
          <Link to="hero " smooth={true} offset={0} duration={500}>
            HOME
          </Link>
        </li>

        <li>
          {" "}
          <Link to="information  " smooth={true} offset={-260} duration={500}>
            RESOURCES
          </Link>
        </li>

        <li>
          {" "}
          <Link to="about " smooth={true} offset={-150} duration={500}>
            ABOUT
          </Link>
        </li>
        <li>
          {" "}
          <Link to="main-contact " smooth={true} offset={-260} duration={500}>
            CONTACT
          </Link>
        </li>
        <li>
          <Link to="prediction " smooth={true} offset={-100} duration={500}>
            <button className="btn">GET STARTED</button>{" "}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

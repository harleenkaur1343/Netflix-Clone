import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import "./Navbar.css";

function Navbar() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
      //remove the listener after executing once so that it does not keep executing
      return () => {
        window.removeEventListener("scroll");
      };
    });
  }, []);
  return (
    <div className={`nav ${show && "showBg"}`}>
      <img className="logo" src={logo} alt="netflix_logo" />
    </div>
  );
}

export default Navbar;

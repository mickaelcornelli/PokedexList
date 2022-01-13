import React from "react";
import "./Header.css";
import logo from "../assets/logo.png";
const Header = () => {
  return (
    <div className="nav">
      <img src={logo} className="logo" />
    </div>
  );
};

export default Header;

import React from "react";
import { Component } from "react";
import Actions from "./Actions";
import Navigation from "./Navigation";

import logo from "../../assets/CompanyLogo.svg";
import classes from "./Header.module.css";

class Header extends Component {
  render() {
    return (
      <header className={classes.header}>
        <Navigation />
        <img src={logo} alt="" />
        <Actions />
      </header>
    );
  }
}

export default Header;

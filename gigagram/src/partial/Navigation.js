import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../pages/assets/img/Logo_gram-transformed.png"

function Navigation() {
    return(
        <header>
        <ul>
          <li>
            <a href="/">
            <img src={logo} alt="" />
          </a>
          </li>
          <li><NavLink exact="true" activeclassname="active" to="/">Home</NavLink></li>
          <li><NavLink activeclassname="active"to="/signin">Sign In</NavLink></li>
        </ul>
      </header>
    )
}

export default Navigation;
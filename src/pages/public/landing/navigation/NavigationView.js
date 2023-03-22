import React from "react";
import { NavLink } from "react-router-dom";
import headerStyle from '../scss/header.scss'

function Navigation() {
  return (
    <header className="header-top">
      <div className="logo">
        <a href="/">
          <h2 className="logo">Gigagram</h2>
        </a>
      </div>

      <div className="links">
        <ul>
          <li>
            <NavLink to="/signin" className="nav_link">
              signin
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="nav_link">
              signup
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navigation;

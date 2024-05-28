import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import './css/Navbar.css';

export class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-dark z-index-3 py-3">
          <div className="container">
            <a className="navbar-brand text-white fs-1" href="/" rel="tooltip" title="Designed and Coded by Creative Tim" data-placement="bottom" target="_blank">
              Splitwise Ultra
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-start" id="navigation">
              <ul className="navbar-nav">
                <li className="nav-item px-3">
                  <NavLink className="nav-link text-white opacity-8" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item px-3">
                  <NavLink className="nav-link text-white opacity-8" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

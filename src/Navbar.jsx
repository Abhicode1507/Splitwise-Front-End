import React, { Component } from "react";
import { NavLink, Navigate } from "react-router-dom";
import './css/Navbar.css';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const accessToken = localStorage.getItem("accessToken");
    console.log('access token--', accessToken);
    fetch("http://localhost:8000/api/v1/users/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Clear user data from local storage or state management
        localStorage.removeItem("accessToken");
        this.setState({ redirectToLogin: true });
        if (this.props.updateIsLoggedInStatus) {
          this.props.updateIsLoggedInStatus(false);
        }
        console.log('Logout success');
      } else {
        // Handle logout error
        console.error("Logout failed");
      }
    })
    .catch(error => {
      console.error("An error occurred while logging out:", error);
    });
  }

  render() {
    if (this.state.redirectToLogin) {
      return <Navigate to="/login" replace />;
    }

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-dark z-index-3 py-3">
          <div className="container">
            <a className="navbar-brand text-white fs-1" href="/" rel="tooltip" title="Designed and Coded by Creative Tim" data-placement="bottom">
              Splitwise Ultra
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-start" id="navigation">
              <ul className="navbar-nav">
                {this.props.isLoggedIn && (
                  <>
                    <li className="nav-item px-3">
                      <NavLink className="nav-link text-white opacity-8" to="/profile">
                        Profile
                      </NavLink>
                    </li>
                    <li className="nav-item px-3">
                      <span className="nav-link text-white opacity-8" style={{ cursor: "pointer" }} onClick={this.handleLogout}>
                        Logout
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import './css/Navbar.css';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false,
      redirectToProfile: false,
      user: null
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
  }

  handleLogout() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      // Token is not available, redirect to login
      this.setState({ redirectToLogin: true });
      return;
    }

    fetch("http://localhost:8000/api/v1/users/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    .then(response => {
      if (response.status === 401) {
        // Handle unauthorized error (token might be expired)
        console.error("Token expired or unauthorized");
        // Clear user data from local storage or state management
        localStorage.removeItem("accessToken");
        this.setState({ redirectToLogin: true });
        if (this.props.updateIsLoggedInStatus) {
          this.props.updateIsLoggedInStatus(false);
        }
      }
      return response.json();
    })
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
      // Assume the token might be expired and clear user data
      localStorage.removeItem("accessToken");
      this.setState({ redirectToLogin: true });
      if (this.props.updateIsLoggedInStatus) {
          this.props.updateIsLoggedInStatus(false);
      }
    });
  }

  handleProfileClick() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ redirectToProfile: true, user });
  }

  render() {
    if (this.state.redirectToLogin) {
      return <Navigate to="/login" replace />;
    }

    if (this.state.redirectToProfile) {
      return <Navigate to="/profile" state={{ user: this.state.user }} replace />;
    }

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-dark z-index-3 py-3">
          <div className="container">
            <Link className="navbar-brand text-white fs-1" to="/" rel="tooltip" title="Designed and Coded by Creative Tim" data-placement="bottom">
              Splitwise Ultra
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-start" id="navigation">
              <ul className="navbar-nav">
                {this.props.isLoggedIn && (
                  <>
                    <li className="nav-item px-3">
                      <Link to="/home" className="nav-link text-white opacity-8">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item px-3">
                      <Link to="/groups" className="nav-link text-white opacity-8">
                        Groups
                      </Link>
                    </li>
                    <li className="nav-item px-3">
                      <Link to="/profile" className="nav-link text-white opacity-8" state={{ user: this.state.user }}>
                        Profile
                      </Link>
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

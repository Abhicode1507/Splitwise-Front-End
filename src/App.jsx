import React, { Component } from "react";
import { NavBar } from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  render() {
    return (
      <Router>
        <NavBar isLoggedIn={this.state.isLoggedIn} />
        <div className="container-fluid">
          <Routes>
            <Route
              path="/login"
              element={<Login updateIsLoggedInStatus={this.updateIsLoggedInStatus} />}
            />
            <Route
              path="/signup"
              element={<Signup updateIsLoggedInStatus={this.updateIsLoggedInStatus} />}
            />
            {/* Redirect to login if no route matches */}
            <Route path="*" element={<Login updateIsLoggedInStatus={this.updateIsLoggedInStatus} />} />
          </Routes>
        </div>
      </Router>
    );
  }

  updateIsLoggedInStatus = (status) => {
    this.setState({ isLoggedIn: status });
  };
}

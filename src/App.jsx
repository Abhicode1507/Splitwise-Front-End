import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './css/App.css';
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import AddExpense from "./AddExpense";
import Profile from "./Profile";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, expenses: [] };
    this.handleAddExpense = this.handleAddExpense.bind(this); // Binding the method
  }

  componentDidMount() {
    // Check if the user is already logged in
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      this.setState({ isLoggedIn: true });
    }
  }

  handleAddExpense(expense) {
    this.setState((prevState) => ({
      expenses: [...prevState.expenses, expense]
    }));
  }

  render() {
    return (
      <Router>
        {/* <NavBar isLoggedIn={this.state.isLoggedIn} /> */}
        <div className="container-fluid">
          <Routes>
            <Route
              path="/login"
              element={<Login updateIsLoggedInStatus={this.updateIsLoggedInStatus} />}
            />
            {/* Protected routes */}
            {this.state.isLoggedIn ? (
              <>
                <Route path="/home" element={<Home expenses={this.state.expenses} />} />
                <Route path="/addexpense" element={<AddExpense onAddExpense={this.handleAddExpense} />} />
              </>
            ) : (
              // Redirect to login if user is not logged in
              <Route to="/login" replace />
            )}
            <Route
              path="/signup"
              element={<Signup updateIsLoggedInStatus={this.updateIsLoggedInStatus} />}
            />
            <Route path="/profile" element={<Profile />} />
            {/* Redirect to login if no route matches */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    );
  }

  updateIsLoggedInStatus = (status) => {
    this.setState({ isLoggedIn: status });
  };
}

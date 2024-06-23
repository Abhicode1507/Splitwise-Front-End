import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import './css/App.css';
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import AddExpense from "./AddExpense";
import Profile from "./Profile";
import { NavBar } from "./Navbar";
import EditExpense from "./EditExpense";
import ProfileWrapper from "./ProfileWrapper";
import AddGroup from "./AddGroup";
import Groups from "./Groups";
import GroupExpenses from "./GroupExpenses";

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
        <ConditionalNavBar isLoggedIn={this.state.isLoggedIn} updateIsLoggedInStatus={this.updateIsLoggedInStatus} />
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
                <Route path="/addgroup" element={<AddGroup onAddExpense={this.handleAddExpense} />} />
                <Route path="/profile" element={<ProfileWrapper />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/editexpense/:id" element={<EditExpense />} />
                <Route path="/groupexpenses" element={<GroupExpenses />} />
              </>
            ) : (
              // Redirect to login if user is not logged in
              <Route path="/" element={<Navigate to="/login" replace />} />
            )}
            <Route
              path="/signup"
              element={<Signup updateIsLoggedInStatus={this.updateIsLoggedInStatus} />}
            />
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

const ConditionalNavBar = (props) => {
  const location = useLocation();
  const hideNavBarRoutes = ['/login', '/signup'];

  return !hideNavBarRoutes.includes(location.pathname) ? (
    <NavBar {...props} />
  ) : null;
};

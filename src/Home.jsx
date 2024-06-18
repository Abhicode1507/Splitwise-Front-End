import React, { Component } from "react";
// import { NavBar } from "./Navbar";
import { Link } from "react-router-dom";
import Expenses from "./Expenses";
import './css/Home.css';

class Home extends Component {
  render() {
    return (
      <div className="container container-margin-top">
        {/* <NavBar className="my-10" /> */}
        <br />
        <Link to="/addexpense" className="btn m-1 addExpense-btn">
          Add Expense
        </Link>
        <Link to="/addgroup" className="btn m-1 addExpense-btn">
          Add Group
        </Link>
        <Expenses expenses={this.props.expenses} />
      </div>
    );
  }
}

export default Home;
import React, { Component } from "react";
import { useNavigate } from 'react-router-dom';
import "./css/App.css";

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      description: "",
      error: null
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { amount, description } = this.state;
    if (amount && description) {
      const token = localStorage.getItem("accessToken"); // Retrieve access token from localStorage
      const id = localStorage.getItem("id");
      fetch('http://localhost:8000/api/v1/expense/add-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include access token in request headers
        },
        body: JSON.stringify({
          id:id,
          amount: amount,
          description: description
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.props.onAddExpense({ amount: amount, description: description });
          this.setState({ amount: "", description: "", error: null });
          this.props.navigate("/");
          console.log("Expense added successfully!");
        } else {
          this.setState({ error: data.message });
          console.error("Error adding expense:", data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        this.setState({ error: 'An error occurred while adding the expense.' });
      });
    }
  }

  render() {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div
          className="card p-4 shadow-sm max-vh-100"
          style={{ width: "500px" }}
        >
          <h4 className="m-1 p-2 border-bottom">Add your expense</h4>
          <form
            id="userForm"
            className="needs-validation"
            noValidate
            onSubmit={this.handleFormSubmit}
          >
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="text"
                className="form-control"
                id="amount"
                value={this.state.amount}
                onChange={(event) =>
                  this.setState({ amount: event.target.value })
                }
                required
              />
              <div className="invalid-feedback">Please enter an amount.</div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={this.state.description}
                onChange={(event) =>
                  this.setState({ description: event.target.value })
                }
                required
              />
              <div className="invalid-feedback">
                Please enter a description.
              </div>
            </div>

            {this.state.error && <div className="text-danger">{this.state.error}</div>}

            <div className="text-end">
              <button type="submit" className="btn classic-btn mt-3">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default function(props) {
  const navigate = useNavigate();
  return <AddExpense {...props} navigate={navigate} />;
}

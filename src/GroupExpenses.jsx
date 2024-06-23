import React, { Component } from "react";
import { Link } from "react-router-dom";
import './css/App.css';

class GroupExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: []
    };
  }

  componentDidMount() {
    this.fetchGroupExpenses();
  }

  fetchGroupExpenses = async () => {
    try {
      const { groupId } = this.props;
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8000/api/v1/groups/${groupId}/expenses`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      if (data.success) {
        this.setState({ expenses: data.data });
      } else {
        console.error("Failed to fetch group expenses:", data.message);
      }
    } catch (error) {
      console.error("Error fetching group expenses:", error);
    }
  };

  deleteExpense = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8000/api/v1/expense/delete-expense/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      if (data.success) {
        this.setState(prevState => ({
          expenses: prevState.expenses.filter(expense => expense._id !== id)
        }));
        console.log("Expense deleted successfully");
      } else {
        console.error("Failed to delete expense:", data.message);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  render() {
    const { expenses } = this.state;
    return (
      <div className="container mt-5">
        <Link to="/addexpense" className="btn btn-primary mb">
          Add Expense
        </Link>
        <h4 className="mb-3">Group Expenses</h4>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={expense._id}>
                <td>{index + 1}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>
                  <Link to={`/editexpense/${expense._id}`} className="btn btn-primary btn-space">
                    Edit
                  </Link>
                  <button 
                    onClick={() => this.deleteExpense(expense._id)} 
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GroupExpenses;

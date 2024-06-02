import React from "react";
import './css/App.css';

export class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: []
    };
  }

  componentDidMount() {
    this.fetchExpenses();
  }

  fetchExpenses = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log('acces token--',accessToken);
      console.log('expense api hit');
      const response = await fetch("http://localhost:8000/api/v1/expense", {
        method: "GET",
        headers:{
          Authorization : `Bearer ${accessToken}`
        }
      });
      console.log('response--',response);
      const data = await response.json();
      if (data.success) {
        this.setState({ expenses: data.data });
      } else {
        console.error("Failed to fetch expenses:", data.message);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <h4 className="mb-3">Expenses</h4>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.expenses.map((expense, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Expenses;

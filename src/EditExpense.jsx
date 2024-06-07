import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditExpense = () => {
  const { id } = useParams(); // Get the expense ID from the URL params
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchExpenseDetails(id);
  }, [id]);

  const fetchExpenseDetails = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8000/api/v1/expense/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setAmount(data.data.amount || "");
        setDescription(data.data.description || "");
      } else {
        console.error("Failed to fetch expense details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching expense details:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8000/api/v1/expense/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ amount, description }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Expense updated successfully");
      } else {
        setMessage(`Failed to update expense: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      setMessage("Error updating expense");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div>
        <h1 style={{ color: "white" }}>Edit Expense</h1>
        <br />
        <div className="card p-4" style={{ width: '500px' }}>
          <h4 className="m-1 p-2 border-bottom">Edit Expense</h4>
          {message && <div className="alert alert-info">{message}</div>}
          <form
            id="editExpenseForm"
            className="needs-validation"
            noValidate
            onSubmit={handleSubmit}
          >
            {/* Amount starts here */}
            <div className="form-group form-row">
              <label className="col-lg-6 p-2">Amount:</label>
              <input
                type="text"
                className="form-control m-1 p-2"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
              <div className="invalid-feedback">Please enter a valid amount.</div>
            </div>

            {/* Description starts here */}
            <div className="form-group form-row">
              <label className="col-lg-6 p-2">Description:</label>
              <input
                type="text"
                className="form-control m-1 p-2"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
              <div className="invalid-feedback">Please enter a description.</div>
            </div>

            <div className="text-end">
              <button type="submit" className="btn m-1 login-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;

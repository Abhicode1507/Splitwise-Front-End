import React, { Component } from "react";
import { useNavigate } from 'react-router-dom';
import "./css/App.css";

class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      memberIds: "",
      error: null
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { name, memberIds } = this.state;
    if (name && memberIds) {
      const token = localStorage.getItem("accessToken"); // Retrieve access token from localStorage
      fetch('http://localhost:8000/api/v1/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include access token in request headers
        },
        body: JSON.stringify({
          name: name,
          memberIds: memberIds.split(",").map(id => id.trim()) // Convert comma-separated member IDs to an array
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.setState({ name: "", memberIds: "", error: null });
          this.props.navigate("/home");
          console.log("Group created successfully!");
        } else {
          this.setState({ error: data.message });
          console.error("Error creating group:", data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        this.setState({ error: 'An error occurred while creating the group.' });
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
          <h4 className="m-1 p-2 border-bottom">Create a new group</h4>
          <form
            id="groupForm"
            className="needs-validation"
            noValidate
            onSubmit={this.handleFormSubmit}
          >
            <div className="form-group">
              <label htmlFor="name">Group Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={this.state.name}
                onChange={(event) =>
                  this.setState({ name: event.target.value })
                }
                required
              />
              <div className="invalid-feedback">Please enter a group name.</div>
            </div>

            <div className="form-group">
              <label htmlFor="memberIds">Member IDs (comma-separated):</label>
              <input
                type="text"
                className="form-control"
                id="memberIds"
                value={this.state.memberIds}
                onChange={(event) =>
                  this.setState({ memberIds: event.target.value })
                }
                required
              />
              <div className="invalid-feedback">
                Please enter member IDs.
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
  return <AddGroup {...props} navigate={navigate} />;
}

import React, { Component } from "react";
import GroupExpenses from "./GroupExpenses";
import './css/Home.css';

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      selectedGroupId: null // To hold the selected group ID
    };
  }

  componentDidMount() {
    this.fetchGroups();
  }

  fetchGroups = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const userData = localStorage.getItem("user");
      const user = JSON.parse(userData);
      const userId = user._id;

      const response = await fetch(`http://localhost:8000/api/v1/groups/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      if (data.success) {
        this.setState({ groups: data.data });
      } else {
        console.error("Failed to fetch groups:", data.message);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  handleViewClick = (groupId) => {
    this.setState({ selectedGroupId: groupId });
  };

  render() {
    const { groups, selectedGroupId } = this.state;

    if (selectedGroupId) {
      // Render GroupExpenses component if a group is selected
      return <GroupExpenses groupId={selectedGroupId} />;
    }

    return (
      <div className="container mt-5">
        <h4 className="mb-3">Groups</h4>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Group Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <tr key={group._id}>
                <td>{index + 1}</td>
                <td>{group.name}</td>
                <td>
                  <button 
                    onClick={() => this.handleViewClick(group._id)} 
                    className="btn btn-primary btn-space"
                  >
                    View
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

export default Groups;

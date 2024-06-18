import React, { Component } from "react";
import { Link } from "react-router-dom";
import './css/Home.css';

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
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
      console.log("user in groups",user);
      const userId = user._id
      console.log('usrId---',userId);
      console.log("accessToken---",accessToken);
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

  render() {
    const { groups } = this.state;
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
                  <Link to={`/groups/${group._id}/expenses`} className="btn btn-primary btn-space">
                    View
                  </Link>
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

import React, { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  componentDidMount() {
    // Retrieve user information from session storage or wherever it's stored
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored in localStorage

    if (user) {
      this.setState({ user, loading: false });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <div>User not found. Please log in.</div>;
    }

    return (
      <div className="container">
        <h1>Profile</h1>
        <div>
          <img src={user.avatar} alt="Avatar" style={{ width: 100, height: 100, borderRadius: "50%" }} />
        </div>
        <div>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Full Name: {user.fullName}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    );
  }
}

export default Profile;

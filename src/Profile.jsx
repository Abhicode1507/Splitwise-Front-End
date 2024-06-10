import React, { Component } from "react";
import './css/Profile.css'; // Add your custom CSS file if needed

class Profile extends Component {
  render() {
    const { user } = this.props;
    console.log('user data in profile', user);
    if (!user) {
      return <div>User data is not available.</div>;
    }

    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card">
          <div className="upper">
            <img src={user.coverImage} className="img-fluid" alt="Cover" />
          </div>
          <div className="user text-center">
            <div className="profile">
              <img src={user.avatar} className="rounded-circle" width="80" alt="Profile" />
            </div>
          </div>
          <div className="mt-5 text-center">
            <h4 className="mb-0">{user.userName}</h4>
            <span className="text-muted d-block mb-2"><b>Full Name</b>:{user.fullName}</span>
            <span className="text-muted d-block mb-2"><b>Email</b>:{user.email}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

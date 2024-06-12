import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./css/Profile.module.css"; // Import the CSS module

class Profile extends Component {
  render() {
    const { user } = this.props;
    console.log("user data in profile", user);
    if (!user) {
      return <div>User data is not available.</div>;
    }

    return (
      <div
        className={`container d-flex justify-content-center align-items-center vh-100 ${styles.container}`}
      >
        <div className={styles.card}>
          <div className={styles.upper}>
            <img src={user.coverImage} className="img-fluid" alt="Cover" />
          </div>
          <div className={`user text-center ${styles.user}`}>
            <div className={styles.profile}>
              <img
                src={user.avatar}
                className="rounded-circle"
                width="80"
                alt="Profile"
              />
            </div>
          </div>
          <div className={`mt-5 text-center ${styles.textCenter}`}>
            <h4 className="mb-0">{user.userName}</h4>
            <span className={`text-muted d-block mb-2 ${styles.textMuted}`}>
              <b>Full Name</b>: {user.fullName}
            </span>
            <span className={`text-muted d-block mb-2 ${styles.textMuted}`}>
              <b>Email</b>: {user.email}
            </span>
          </div>
          <div className={styles.backButtonContainer}>
            <Link to="/" className="btn btn-primary btn-space">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

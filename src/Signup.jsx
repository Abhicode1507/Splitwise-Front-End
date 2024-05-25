import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: null,
      cover: null,
      message: "",
    };
  }

  render() {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-sm max-vh-100" style={{ width: "500px" }}>
          <h4 className="m-1 p-2 border-bottom">Sign Up</h4>
          <form
            id="userForm"
            className="needs-validation"
            noValidate
            onSubmit={this.onSignupClick}
          >
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={this.state.username}
                    onChange={(event) =>
                      this.setState({ username: event.target.value })
                    }
                    required
                  />
                  <div className="invalid-feedback">Please enter a username.</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    value={this.state.fullName}
                    onChange={(event) =>
                      this.setState({ fullName: event.target.value })
                    }
                    required
                  />
                  <div className="invalid-feedback">Please enter your full name.</div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={this.state.email}
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
                required
              />
              <div className="invalid-feedback">Please enter a valid email address.</div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={this.state.password}
                onChange={(event) =>
                  this.setState({ password: event.target.value })
                }
                required
              />
              <div className="invalid-feedback">Please enter a password.</div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={this.state.confirmPassword}
                onChange={(event) =>
                  this.setState({ confirmPassword: event.target.value })
                }
                required
              />
              <div className="invalid-feedback">Passwords do not match.</div>
            </div>

            <div className="form-group">
              <label htmlFor="avatar">Avatar:</label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="avatar"
                  accept="image/*"
                  onChange={(event) =>
                    this.setState({ avatar: event.target.files[0] })
                  }
                  required
                />
                <label className="custom-file-label" htmlFor="avatar">
                  Choose file
                </label>
                <div className="invalid-feedback">Please upload an avatar.</div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cover">Cover:</label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="cover"
                  accept="image/*"
                  onChange={(event) =>
                    this.setState({ cover: event.target.files[0] })
                  }
                  required
                />
                <label className="custom-file-label" htmlFor="cover">
                  Choose file
                </label>
                <div className="invalid-feedback">Please upload a cover image.</div>
              </div>
            </div>

            <div className="text-end">
              {this.state.message}
              <button type="submit" className="btn btn-primary mt-3">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  onSignupClick = async (event) => {
    event.preventDefault();

    // Check form validity
    const form = event.target;
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        message: <span className="text-danger">Passwords do not match</span>,
      });
      return;
    }
    
    const formData = new FormData();
    formData.append("userName", this.state.username);
    formData.append("fullName", this.state.fullName);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("avatar", this.state.avatar);
    formData.append("coverImage", this.state.cover);

    for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]);
      }

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/register", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response");
      }

      const body = await response.json();
      console.log(body);

      if (response.ok) {
        this.setState({
          message: <span className="text-success">Successfully Signed Up</span>,
        });
        this.props.updateIsLoggedInStatus(true);
        // history.replace("/dashboard");
      } else {
        this.setState({
          message: <span className="text-danger">Signup failed, please try again</span>,
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      this.setState({
        message: <span className="text-danger">Signup failed, please try again</span>,
      });
    }
  };
}

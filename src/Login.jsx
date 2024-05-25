import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", message: "" };
  }

  render() {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4" style={{width:'500px'}}>
          <h4 className="m-1 p-2 border-bottom">Login</h4>

          <form
            id="loginForm"
            className="needs-validation"
            noValidate
            onSubmit={this.onLoginClick}
          >
            {/* Email starts here */}
            <div className="form-group form-row">
              <label className="col-lg-6 p-2">Email:</label>
              <input
                type="email"
                className="form-control m-1 p-2"
                value={this.state.email}
                onChange={(event) => this.setState({ email: event.target.value })}
                required
              />
              <div className="invalid-feedback">Please enter a valid email address.</div>
            </div>

            {/* Password starts here */}
            <div className="form-group form-row">
              <label className="col-lg-6 p-2">Password:</label>
              <input
                type="password"
                className="form-control m-1 p-2"
                value={this.state.password}
                onChange={(event) => this.setState({ password: event.target.value })}
                required
              />
              <div className="invalid-feedback">Please enter your password.</div>
            </div>

            <div className="text-end">
              {this.state.message}
              <button type="submit" className="btn btn-primary m-1">
                Login
              </button>
              <button type="button" className="btn btn-secondary m-1" onClick={this.onSignupClick}>
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  onLoginClick = async (event) => {
    event.preventDefault();

    // Check form validity
    const form = event.target;
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    console.log("onLoginClick", this.state);

    var response = await fetch(
      `http://localhost:5000/users?email=${this.state.email}&password=${this.state.password}`,
      { method: "GET" }
    );

    var body = await response.json();
    console.log(body);
    if (body.length > 0) {
      // success
      this.setState({
        message: <span className="text-success">Successfully Logged-in</span>,
      });
      // call updateIsLoggedInStatus of parent component to update the status as true
      this.props.updateIsLoggedInStatus(true);

      // navigate to dashboard
    } else {
      // error
      this.setState({
        message: <span className="text-danger">Invalid Login, please try again</span>,
      });
    }
  };

  onSignupClick = () => {
    this.props.navigate("/signup");
  };
}

const LoginWithNavigate = (props) => {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
};

export default LoginWithNavigate;

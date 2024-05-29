import React, { Component, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", message: "" };
  }

  componentDidMount() {
    // Check if the user is already logged in
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      this.props.updateIsLoggedInStatus(true);
    }
  }

  render() {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div>
          <h1 style={{ color: "white" }}>
            Welcomeback!
            <span role="img" aria-label="Wave" className="wave-emoji" style={{ animationDuration: "2s" }}>
              👋
            </span>
          </h1>
          <br />
          <div className="card p-4" style={{ width: '500px' }}>
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
                <button type="submit" className="btn m-1 login-btn">
                  Login
                </button>
                <p className="m-1 text-center">
                  Don't have an account? <span className="register-link" onClick={this.onSignupClick}>Register now</span>
                </p>
              </div>
            </form>
          </div>
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

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
        }
      );

      const body = await response.json();
      console.log(body);
      if (body.success) {
        // success
        this.setState({
          message: <span className="text-success">Successfully Logged-in</span>,
        });
        // Store the access token in localStorage
        console.log('access token---',body.data.accessToken);
        localStorage.setItem("accessToken", body.data.accessToken);
        localStorage.setItem("id",body.data.user.id);

        // call updateIsLoggedInStatus of parent component to update the status as true
        this.props.updateIsLoggedInStatus(true);
      } else {
        // error
        this.setState({
          message: <span className="text-danger">{body.message}</span>,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // handle error
    }
  };


  onSignupClick = () => {
    this.props.navigate("/signup");
  };
}

const LoginWithNavigate = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if user is already logged in
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      props.updateIsLoggedInStatus(true);
      navigate("/home");
    }
  }, [navigate, props]);

  return <Login {...props} navigate={navigate} />;
};

export default LoginWithNavigate;

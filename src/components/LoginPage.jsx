import React from "react";
import { Redirect, Link } from "react-router-dom";
import Joi from "joi-browser";
import auth from "../services/authService";
import Form from "./common/Form";

class LoginPage extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().min(3).required().label("Email"),
    password: Joi.string().min(3).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { email, password } = this.state.data;
      await auth.login(email, password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="login row mt-5">
        <div className="auth-container">
          <h4 className="mb-3">Login</h4>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default LoginPage;

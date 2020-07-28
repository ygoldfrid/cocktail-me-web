import React from "react";
import { Redirect, Link } from "react-router-dom";
import Joi from "joi-browser";
import auth from "../services/authService";
import userService from "../services/userService";
import Form from "./common/Form";

class RegisterPage extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
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
          <h4 className="mb-3">Create your Account</h4>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderButton("Register")}
          </form>
          <p className="text-center mt-3">
            Already registered? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default RegisterPage;

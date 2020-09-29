import React from "react";
import { Redirect, Link } from "react-router-dom";
import Joi from "joi-browser";

import auth from "../../services/authService";
import FooterDesktop from "../footer/FooterDesktop";
import Form from "../common/Form";
import userService from "../../services/userService";

class RegisterPage extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    passwordConfirmation: Joi.string()
      .required()
      .label("Password Confirmation")
      .valid(Joi.ref("password"))
      .options({
        language: { any: { allowOnly: "!!Passwords do not match" } },
      }),
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
      <div className="register row mt-5">
        <div className="auth-container">
          <h4 className="mb-3">Create your Account</h4>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput(
              "passwordConfirmation",
              "Confirm Password",
              "password"
            )}
            {this.renderButton("Register")}
          </form>
          <p className="text-center mt-3">
            Already registered? <Link to="/login">Login here</Link>
          </p>
        </div>
        <FooterDesktop />
      </div>
    );
  }
}

export default RegisterPage;

import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import Form from "../common/Form";
import Footer from "../common/Footer";
import userService from "../../services/userService";

class ResetPassword extends Form {
  state = {
    data: {
      password: "",
      passwordConfirmation: "",
    },
    errors: {},
  };

  schema = {
    password: Joi.string().min(5).required().label("New Password"),
    passwordConfirmation: Joi.string()
      .min(5)
      .required()
      .label("Password Confirmation")
      .valid(Joi.ref("password"))
      .options({
        language: { any: { allowOnly: "!!Passwords do not match" } },
      }),
  };

  doSubmit = async () => {
    try {
      const { password } = this.state.data;
      const email = this.props.history.location.state.email;
      const token = this.props.history.location.state.token;
      const response = await userService.resetPassword(email, token, password);

      if (response.status === 200)
        this.props.history.push({
          pathname: "/forgotPassword/successReset",
          state: { success: true },
        });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.password = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (!this.props.history.location.state)
      return <Redirect to="/forgotPassword" />;

    return (
      <div className="row mt-5">
        <div className="auth-container">
          <h4 className="mb-3">Reset Password</h4>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("password", "New Password", "password")}
            {this.renderInput(
              "passwordConfirmation",
              "Confirm Password",
              "password"
            )}
            {this.renderButton("Send")}
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ResetPassword;

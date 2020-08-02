import React from "react";
import Joi from "joi-browser";

import auth from "../../services/authService";
import Form from "../common/Form";
import userService from "../../services/userService";
import { Redirect } from "react-router-dom";

class ForgotPasswordPage extends Form {
  state = {
    data: {
      email: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().min(3).required().label("Email"),
  };

  doSubmit = async () => {
    try {
      const { email } = this.state.data;
      const response = await userService.requestResetToken(email);

      if (response.status === 200)
        this.props.history.push({
          pathname: "/forgotPassword/validate",
          state: { email },
        });
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
      <div className="row mt-5">
        <div className="auth-container">
          <h4 className="mb-3">Reset your password</h4>
          <p className="mb-3">
            Type in your email and we will send you the reset instructions
          </p>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderButton("Send")}
          </form>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordPage;

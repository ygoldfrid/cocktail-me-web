import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import Footer from "../common/Footer";
import Form from "../common/Form";
import userService from "../../services/userService";

class ValidateToken extends Form {
  state = {
    data: {
      token: "",
    },
    errors: {},
  };

  schema = {
    token: Joi.string().required().label("Code"),
  };

  doSubmit = async () => {
    try {
      const { token } = this.state.data;
      const email = this.props.history.location.state.email;
      const response = await userService.validateToken(email, token);

      if (response.status === 200)
        this.props.history.push({
          pathname: "/forgotPassword/reset",
          state: { email, token },
        });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.token = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleResendCode = async () => {
    await userService.requestResetToken(
      this.props.history.location.state.email
    );
  };

  render() {
    if (!this.props.history.location.state)
      return <Redirect to="/forgotPassword" />;

    return (
      <div className="row mt-5">
        <div className="auth-container">
          <h4 className="mb-3">Validate Code</h4>
          <p className="mb-3">Type in the code you received in your email</p>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("token", "Code")}
            {this.renderButton("Send")}
          </form>
          <p className="mt-3">
            Didn't get the code?
            <button className="ml-1 link" onClick={this.handleResendCode}>
              Resend email
            </button>
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ValidateToken;

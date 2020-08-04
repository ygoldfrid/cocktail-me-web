import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ForgotPasswordPage extends Component {
  render() {
    if (!this.props.history.location.state)
      return <Redirect to="/forgotPassword" />;

    return (
      <div className="row mt-5">
        <div className="auth-container">
          <div className="card text-center">
            <div className="card-header">Success!</div>
            <div className="card-body">
              <p>Your password has been reset successfully</p>
              <Link to="/login">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordPage;

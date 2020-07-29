import React, { useContext } from "react";

import AuthContext from "../contexts/authContext";
import auth from "../services/authService";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="login row mt-5">
      <div className="auth-container">
        {user && (
          <div className="card text-center">
            <div className="card-header">Your Profile</div>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text mb-2">{user.email}</p>
              <button className="link" onClick={auth.logout}>
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

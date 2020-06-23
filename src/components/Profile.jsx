import React from "react";
import { Link } from "react-router-dom";

function Profile({ user }) {
  return (
    <div className="login row mt-5">
      <div className="col" />
      <div className="col">
        {user && (
          <div class="card text-center">
            <div class="card-header">Your Profile</div>
            <div class="card-body">
              <h5 class="card-title">{user.name}</h5>
              <p class="card-text mb-2">{user.email}</p>
              <Link to="logout">Sign out</Link>
            </div>
          </div>
        )}
      </div>
      <div className="col" />
    </div>
  );
}

export default Profile;

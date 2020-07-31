import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import AuthContext from "../contexts/authContext";
import auth from "../services/authService";
import CocktailList from "./CocktailList";

function Profile() {
  const { user, favorites } = useContext(AuthContext);

  if (!user) return <Redirect to="/" />;

  return (
    <div className="login mt-5">
      {user && (
        <div className="mb-5 auth-container">
          <div className="card text-center">
            <div className="card-header">MyProfile</div>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text mb-2">{user.email}</p>
              <button className="link" onClick={auth.logout}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
      {favorites && favorites.length > 0 && (
        <div className="favorites-container">
          <div className="row mb-3 justify-content-center">
            <h4 className="text-center">My Favorite Cocktails</h4>
          </div>
          <CocktailList cocktails={favorites} size="big" />
        </div>
      )}
    </div>
  );
}

export default Profile;

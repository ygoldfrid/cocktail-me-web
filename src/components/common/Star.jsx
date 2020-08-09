import React, { useContext } from "react";
import { toast } from "react-toastify";

import AuthContext from "../../contexts/authContext";
import { useHistory } from "react-router-dom";

function Star({ cocktail, isFavorite }) {
  const history = useHistory();
  const { addOrRemoveFavorites, favorites, user } = useContext(AuthContext);

  if (!isFavorite)
    isFavorite = favorites.some((fav) => fav._id === cocktail._id);

  const handleClick = (e) => {
    e.stopPropagation();

    if (user) addOrRemoveFavorites(cocktail._id, isFavorite);
    else {
      toast.info("Login to add to Favorites");
      history.push("/login");
    }
  };

  return (
    <i
      className={isFavorite ? "fa fa-star star-on" : "fa fa-star-o star-off"}
      onClick={handleClick}
    />
  );
}

export default Star;

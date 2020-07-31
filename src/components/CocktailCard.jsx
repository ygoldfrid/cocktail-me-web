import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../contexts/authContext";
import Image from "./common/Image";
import Star from "./Star";

function CocktailCard({ cocktail }) {
  const history = useHistory();
  const { favorites } = useContext(AuthContext);

  const isFavorite = favorites.some((fav) => fav._id === cocktail._id);

  return (
    <div
      id={cocktail._id}
      className="card hover-opacity clickable h-100"
      onClick={({ currentTarget }) => {
        history.push("/cocktails/" + currentTarget.id);
      }}
    >
      <div className="image-container">
        <Image
          images={cocktail.images}
          alt={cocktail.name}
          className="card-img-top"
        />
        {cocktail.missing === 0 && (
          <div className="top-right">You can make this</div>
        )}
        {cocktail.missing > 0 && (
          <div className="top-right">
            {cocktail.missing === 1
              ? `${cocktail.missing} ingredient missing`
              : `${cocktail.missing} ingredients missing`}
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{cocktail.name}</h5>
          <h5 className="card-title">
            <Star cocktail={cocktail} isFavorite={isFavorite} />
          </h5>
        </div>
        <p className="card-text">
          <small className="text-muted">
            {cocktail.components.length} ingredients
          </small>
        </p>
        <p className="card-text">{cocktail.preparation[0]}</p>
      </div>
    </div>
  );
}

export default CocktailCard;

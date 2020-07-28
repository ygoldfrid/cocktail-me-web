import React from "react";

import Image from "./common/Image";

function CocktailList({ cocktails, history }) {
  return (
    <div className="row row-cols-1 row-cols-sm-3 row-cols-md-2 row-cols-lg-3">
      {cocktails.map((cocktail) => (
        <div key={cocktail._id} className="col mb-4">
          <div
            id={cocktail._id}
            className="card clickable h-100"
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
              <h5 className="card-title">{cocktail.name}</h5>
              <p className="card-text">
                <small className="text-muted">
                  {cocktail.components.length} ingredients
                </small>
              </p>
              <p className="card-text">{cocktail.preparation[0]}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CocktailList;

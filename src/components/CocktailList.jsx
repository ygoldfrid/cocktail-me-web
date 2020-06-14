import React, { Fragment } from "react";

function CocktailList({ cocktails, history }) {
  return (
    <Fragment>
      {cocktails.map((cocktail) => (
        <div
          key={cocktail._id}
          id={cocktail._id}
          className="card clickable mb-3 mr-3"
          style={{ width: "18rem" }}
          onClick={({ currentTarget }) => {
            history.push("/cocktails/" + currentTarget.id);
          }}
        >
          <div className="image-container">
            <img
              src={cocktail.image}
              className="card-img-top"
              alt="cocktail"
              width="300"
              height="300"
            />
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
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default CocktailList;

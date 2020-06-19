import React from "react";

function CocktailList({ cocktails, history }) {
  return (
    <div className="row">
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
          <div className="card-body card-body-home">
            <h4 className="card-title">{cocktail.name}</h4>
            <p className="card-title">
              {cocktail.components.length} ingredients
            </p>
            <p className="card-text">{cocktail.preparation[0]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CocktailList;

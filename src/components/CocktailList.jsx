import React from "react";

import CocktailCard from "./CocktailCard";

function CocktailList({ cocktails, size }) {
  const getSize = () => {
    return size === "small"
      ? "row row-cols-1 row-cols-sm-3 row-cols-md-2 row-cols-lg-3"
      : "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center";
  };

  return (
    <div className={getSize()}>
      {cocktails.map((cocktail) => (
        <div key={cocktail._id} className="col mb-4">
          <CocktailCard cocktail={cocktail} />
        </div>
      ))}
    </div>
  );
}

export default CocktailList;

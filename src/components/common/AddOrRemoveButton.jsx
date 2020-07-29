import React, { useContext } from "react";

import BarContext from "../../contexts/barContext";

function AddRemoveButton({ ingredient, stickBottom }) {
  const { bar, addOrRemoveItem } = useContext(BarContext);

  const isInMyBar = bar ? bar.some((ing) => ing._id === ingredient._id) : false;

  const getClasses = () => {
    let classes = "btn ";
    if (isInMyBar) classes += "btn-cocktailme-red";
    else classes += "btn-cocktailme-clear";
    if (stickBottom) classes += " stick-bottom";
    return classes;
  };

  return (
    <button
      className={getClasses()}
      onClick={() => addOrRemoveItem(ingredient, isInMyBar)}
    >
      {isInMyBar ? "Remove" : "Add to My Bar"}
    </button>
  );
}

export default AddRemoveButton;

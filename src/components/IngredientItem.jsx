import React from "react";
import AddRemoveButton from "./common/AddRemoveButton";

function IngredientItem({ bar, ing, history, onAddRemove }) {
  return (
    <div className="card p-1 pb-3 h-100">
      <img
        src={ing.image}
        className="clickable card-img-top"
        alt={ing.name}
        id={ing._id}
        onClick={({ currentTarget }) => {
          history.push(`/ingredients/${currentTarget.id}`);
        }}
      />
      <div className="card-body">
        <h6 className="card-title text-center">{ing.name}</h6>
        <div className="row justify-content-center">
          <AddRemoveButton
            bar={bar}
            ingredient={ing}
            onAddRemove={onAddRemove}
            stickBottom={true}
          />
        </div>
      </div>
    </div>
  );
}

export default IngredientItem;

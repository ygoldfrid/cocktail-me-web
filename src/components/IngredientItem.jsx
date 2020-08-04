import React from "react";
import { useHistory } from "react-router-dom";

import AddOrRemoveButton from "./common/AddOrRemoveButton";
import Image from "./common/Image";

function IngredientItem({ ing }) {
  const history = useHistory();

  return (
    <div className="card p-1 pb-3 h-100" tour_id={`market-${ing._id}`}>
      <Image
        images={ing.images}
        alt={ing.name}
        className="clickable card-img-top"
        id={ing._id}
        onClick={({ currentTarget }) => {
          history.push(`/ingredients/${currentTarget.id}`);
        }}
      />
      <div className="card-body">
        <h6 className="card-title text-center">{ing.name}</h6>
        <div className="row justify-content-center">
          <AddOrRemoveButton ingredient={ing} stickBottom={true} />
        </div>
      </div>
    </div>
  );
}

export default IngredientItem;

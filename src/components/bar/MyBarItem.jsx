import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import BarContext from "../../contexts/barContext";
import Image from "../common/Image";

function MyBarItem({ ing }) {
  const history = useHistory();
  const { addOrRemoveItem } = useContext(BarContext);

  return (
    <li className="list-group-item hover-opacity" tour_id={`mybar-${ing._id}`}>
      <div className="d-flex flex-row">
        <div
          className="clickable"
          id={ing._id}
          onClick={({ currentTarget }) => {
            history.push(`/ingredients/${currentTarget.id}`);
          }}
        >
          <Image
            images={ing.images}
            alt={ing.name}
            className="rounded mr-2"
            height="50"
            width="50"
          />
        </div>
        <div
          id={ing._id}
          onClick={({ currentTarget }) => {
            history.push(`/ingredients/${currentTarget.id}`);
          }}
          className="clickable align-self-center"
        >
          <p>{ing.name}</p>
        </div>
        <div
          className="ml-auto align-self-center"
          onClick={() => addOrRemoveItem(ing)}
        >
          <i className="clickable fa fa-trash-o" aria-hidden="true" />
        </div>
      </div>
    </li>
  );
}

export default MyBarItem;

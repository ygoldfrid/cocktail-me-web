import React from "react";

import Image from "./common/Image";

function MyBarItem({ ing, onAddRemove, history }) {
  return (
    <li className="list-group-item">
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
          onClick={() => onAddRemove(ing)}
        >
          <i className="clickable fa fa-trash-o" aria-hidden="true" />
        </div>
      </div>
    </li>
  );
}

export default MyBarItem;

import React from "react";

function BarItem({ ing, onRemove, history }) {
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
          <img
            className="mr-1"
            height="50"
            width="50"
            src={ing.image}
            alt={ing.name}
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
          onClick={() => onRemove(ing)}
        >
          <i className="clickable fa fa-trash-o" aria-hidden="true" />
        </div>
      </div>
    </li>
  );
}

export default BarItem;

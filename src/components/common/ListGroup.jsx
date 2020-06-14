import React, { Fragment } from "react";

const ListGroup = ({
  items,
  textProperty,
  idProperty,
  onItemSelect,
  selectedItem,
}) => {
  return (
    <Fragment>
      <ul className="list-group clickable mb-4">
        {items.map((item) => (
          <li
            key={item[idProperty]}
            className={
              item === selectedItem
                ? "list-group-item list-group-item-action list-group-item-success active"
                : "list-group-item list-group-item-action list-group-item-success"
            }
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  idProperty: "_id",
};

export default ListGroup;

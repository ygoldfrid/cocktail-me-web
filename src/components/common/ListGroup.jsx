import React from "react";

const ListGroup = ({
  items,
  textProperty,
  idProperty,
  onItemSelect,
  selectedItem,
}) => {
  return (
    <div className="col-2">
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
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  idProperty: "_id",
};

export default ListGroup;

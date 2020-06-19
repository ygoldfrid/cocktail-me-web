import React from "react";
import { Dropdown } from "react-bootstrap";

function DropDownList({ items, onSelect }) {
  return (
    <Dropdown className="ingredient-list-mobile overflow-auto">
      {items.map((item) => (
        <Dropdown.Item key={item._id} onSelect={() => onSelect(item)}>
          {item.name}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}

export default DropDownList;

import React from "react";
import { Dropdown } from "react-bootstrap";

function DropDownList({ title, items, onSelect }) {
  return (
    <div className="col">
      <h3>{title}</h3>
      <Dropdown className="ingredient-list overflow-auto">
        {items.map((item) => (
          <Dropdown.Item key={item._id} onSelect={() => onSelect(item)}>
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
}

export default DropDownList;

import React from "react";
import Form from "react-bootstrap/Form";

function Filter({ ingredients, onChange }) {
  return (
    <Form>
      {ingredients.map((ingredient) => (
        <div key={ingredient._id} className="mb-3">
          <Form.Check
            type="checkbox"
            id={ingredient._id}
            name={ingredient.name}
            label={ingredient.name}
            onChange={onChange}
          />
        </div>
      ))}
    </Form>
  );
}

export default Filter;

import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
import AddRemoveButton from "./AddRemoveButton";
import Thumbnail from "./Thumbnail";

function TopBox({
  history,
  bar,
  type,
  element,
  ingredients,
  missing,
  onCheck,
  onClick,
}) {
  return (
    <Fragment>
      {type === "cocktail" && (
        <Fragment>
          <h5 className="card-title">{element.name}</h5>
          <p className="card-text mb-2">
            <small className="text-muted">
              {missing === 0
                ? "You have all the ingredients in My Bar"
                : `Missing ${missing} from My Bar`}
            </small>
          </p>
          <Form.Check
            id="useMyBar"
            type="checkbox"
            label="Replace ingredients with My Bar"
            onChange={onCheck}
          />
          <p className="card-text my-2">Ingredients:</p>
          <div className="row ml-1">
            {ingredients &&
              ingredients.map((ing) => (
                <Thumbnail
                  type="ingredients"
                  missing={ing.missing}
                  item={ing.ingredient}
                  measure={ing.measure}
                  history={history}
                  size="70"
                />
              ))}
          </div>
        </Fragment>
      )}
      {type === "ingredient" && (
        <Fragment>
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{element.name}</h5>
            <AddRemoveButton bar={bar} ingredient={element} onClick={onClick} />
          </div>
          <p className="card-text mb-3">
            <small className="text-muted">{element.category}</small>
          </p>
          {element.alternatives && element.alternatives.length > 0 && (
            <Fragment>
              <p className="card-text mb-2">You can replace it with:</p>
              {element.alternatives.map((ing) => (
                <Thumbnail type="ingredients" item={ing} history={history} />
              ))}
            </Fragment>
          )}
          {element.alternatives && element.alternatives.length === 0 && (
            <p className="card-text">
              There are no replacements for this ingredient. It's one of a kind!
            </p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default TopBox;

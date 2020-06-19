import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
import Thumbnail from "./Thumbnail";

function TopBox({
  type,
  title,
  items,
  history,
  element,
  missing,
  onClick,
  subtitle,
  isInMyBar,
  onCheckChange,
  showAlternatives,
  showCaption = true,
  showIngredients = true,
}) {
  return (
    <Fragment>
      <h1>{title}</h1>
      {type === "cocktail" && (
        <Fragment>
          {missing === 0 && (
            <span className="badge badge-pill badge-success mb-3">
              You have all the ingredients in My Bar
            </span>
          )}
          {missing > 0 && (
            <span className="badge badge-pill badge-danger mb-3">
              Missing {missing} from My Bar
            </span>
          )}
          <Form.Check
            id="useMyBar"
            type="checkbox"
            label="Replace ingredients with My Bar"
            onChange={onCheckChange}
          />
        </Fragment>
      )}
      {type === "ingredient" && (
        <Fragment>
          {isInMyBar && (
            <span className="badge badge-pill badge-success">In My Bar</span>
          )}
          {!isInMyBar && (
            <span className="badge badge-pill badge-danger">Not in My Bar</span>
          )}
          <span className="badge badge-pill badge-primary mb-3 ml-1">
            {element.category}
          </span>
        </Fragment>
      )}
      <h5>{subtitle}</h5>
      {showIngredients && (
        <Fragment>
          <div className="row">
            {items &&
              items.map((item) => (
                <div key={item._id} className="px-1">
                  <Thumbnail
                    type="ingredients"
                    size={80}
                    missing={item.missing}
                    showAlternatives={showAlternatives}
                    element={item.ingredient ? item.ingredient : item}
                    caption={
                      showCaption && item.measure ? `(${item.measure})` : ""
                    }
                    history={history}
                  />
                </div>
              ))}
          </div>
        </Fragment>
      )}
      {type === "ingredient" && (
        <button
          className="btn btn-sm btn-cocktailme"
          id={element._id}
          onClick={onClick}
        >
          {isInMyBar ? "Remove from My Bar" : "Add to My Bar"}
        </button>
      )}
    </Fragment>
  );
}

export default TopBox;

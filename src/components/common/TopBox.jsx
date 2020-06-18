import React, { Fragment } from "react";
import Thumbnail from "./Thumbnail";

function TopBox({
  title,
  pills,
  checkbox,
  subtitle,
  items,
  history,
  showAlternatives,
  showIngredients = true,
  showCaption = true,
}) {
  return (
    <Fragment>
      <h1>{title}</h1>
      {pills}
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
    </Fragment>
  );
}

export default TopBox;

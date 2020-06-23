import React, { Fragment } from "react";
import Thumbnail from "./Thumbnail";

function BottomBox({ history, type, element, cocktails }) {
  return (
    <Fragment>
      {type === "cocktail" && (
        <Fragment>
          <h5 class="card-title mb-3">Preparation</h5>
          <ol>
            {element.preparation &&
              element.preparation.map((step) => <li>{step}</li>)}
          </ol>
        </Fragment>
      )}
      {type === "ingredient" && (
        <Fragment>
          <h5 class="card-title mb-3">
            Cocktails you can make with {element.name}
          </h5>
          {cocktails &&
            cocktails.map((cocktail) => (
              <Thumbnail
                type="cocktails"
                item={cocktail}
                history={history}
                size="100"
              />
            ))}
        </Fragment>
      )}
    </Fragment>
  );
}

export default BottomBox;

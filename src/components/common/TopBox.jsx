import React, { Fragment } from "react";
import Thumbnail from "./Thumbnail";

function TopBox({
  title,
  pills,
  subtitle,
  showContent,
  items,
  showCaption,
  history,
}) {
  return (
    <Fragment>
      <h1>{title}</h1>
      {pills}
      {showContent && (
        <Fragment>
          <h5>{subtitle}</h5>
          <div className="d-flex flex-row">
            {items &&
              items.map((item) => (
                <div key={item._id} className="p-2">
                  <Thumbnail
                    type="ingredients"
                    element={item.ingredient ? item.ingredient : item}
                    caption={showCaption ? `(${item.measure})` : ""}
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

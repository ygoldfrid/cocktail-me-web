import React, { Fragment } from "react";
import Thumbnail from "./Thumbnail";

function BottomBox({ type, title, subtitle, body, items, onRemove, history }) {
  return (
    <Fragment>
      <h2>{title}</h2>
      {subtitle}
      {items && items.length > 0 && (
        <div className="row">
          {items.map((item) => (
            <div key={item._id} className="p-2">
              <Thumbnail
                type={type}
                element={item}
                onRemove={onRemove}
                history={history}
              />
            </div>
          ))}
        </div>
      )}
      {(!items || items.length === 0) && body && (
        <ol>
          {body.map((paragraph) => (
            <li key={body.indexOf(paragraph)} className="lead">
              {paragraph}
            </li>
          ))}
        </ol>
      )}
    </Fragment>
  );
}

export default BottomBox;

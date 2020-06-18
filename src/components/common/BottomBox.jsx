import React from "react";
import Thumbnail from "./Thumbnail";

function BottomBox({ type, title, subtitle, body, items, onRemove, history }) {
  return (
    <div className="box">
      <h2>{title}</h2>
      {subtitle}
      {items && items.length > 0 && (
        <div className="row">
          {items.map((item) => (
            <div key={item._id} className="p-2">
              <Thumbnail
                type={type}
                size={100}
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
    </div>
  );
}

export default BottomBox;

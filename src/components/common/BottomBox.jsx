import React from "react";
import Thumbnail from "./Thumbnail";

function BottomBox({ type, title, body, items, onRemove, history }) {
  return (
    <div className="box px-4">
      <h2>{title}</h2>
      <div className="d-flex flex-row">
        {items &&
          items.map((item) => (
            <div key={item._id} className="p-2">
              <Thumbnail
                type={type}
                element={item}
                onRemove={onRemove}
                history={history}
              />
            </div>
          ))}
        {(!items || items.length === 0) && <p className="lead">{body}</p>}
      </div>
    </div>
  );
}

export default BottomBox;

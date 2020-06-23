import React from "react";

function Thumbnail({ type, item, history, missing, measure, size = 70 }) {
  console.log(item);
  return (
    <figure
      style={{ width: `${size}px` }}
      className="figure clickable mr-2"
      id={item._id}
      onClick={({ currentTarget }) => {
        history.push(`/${type}/${currentTarget.id}`);
      }}
    >
      <img
        src={item.image}
        className={
          missing
            ? "figure-img img-fluid rounded disabled"
            : "figure-img img-fluid rounded"
        }
        alt={item.name}
        height={size}
        width={size}
      />
      <figcaption className="text-center">
        <small className="text-muted">
          <div className="caption">{item.name}</div>
        </small>
      </figcaption>
      <figcaption className="text-center">
        <small>{measure ? `(${measure})` : ""}</small>
      </figcaption>
    </figure>
  );
}

export default Thumbnail;

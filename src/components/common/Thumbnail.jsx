import React from "react";
import { useHistory } from "react-router-dom";

import Image from "./Image";

function Thumbnail({ item, measure, missing, size = 70, type }) {
  const history = useHistory();

  return (
    <figure
      style={{ width: `${size}px` }}
      className="figure clickable mr-2"
      id={item._id}
      onClick={({ currentTarget }) => {
        history.push(`/${type}/${currentTarget.id}`);
      }}
    >
      <Image
        images={item.images}
        alt={item.name}
        className={
          missing
            ? "figure-img img-fluid rounded hover-opacity disabled"
            : "figure-img img-fluid rounded hover-opacity"
        }
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

import React from "react";

function Thumbnail({
  type,
  size,
  element,
  history,
  onRemove,
  caption,
  missing,
}) {
  const handleClick = (e) => {
    if (e.target.id === "image") history.push(`/${type}/${e.currentTarget.id}`);
  };

  return (
    <figure className="figure clickable" id={element._id} onClick={handleClick}>
      <div className="image-container">
        <img
          className={
            missing
              ? "figure-img img-fluid rounded disabled"
              : "figure-img img-fluid rounded"
          }
          id="image"
          src={element.image}
          alt={element.name}
          height={size}
          width={size}
        />
        {onRemove && (
          <div className="remove-top-right" onClick={() => onRemove(element)}>
            <i className="fa fa-times" aria-hidden="true" />
          </div>
        )}
      </div>
      <figcaption className="text-center">{element.name}</figcaption>
      <figcaption className="text-center">{caption}</figcaption>
    </figure>
  );
}

export default Thumbnail;

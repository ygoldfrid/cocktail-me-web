import React from "react";
import ProgressiveImage from "react-progressive-image";

function Image({ images, alt, ...rest }) {
  return (
    <ProgressiveImage
      src={images[0].url}
      placeholder={images[0].thumbnailUrl}
    >
      {(src) => <img src={src} alt={alt} {...rest} />}
    </ProgressiveImage>
  );
}

export default Image;

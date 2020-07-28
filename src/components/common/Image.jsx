import React from "react";
import ProgressiveImage from "react-progressive-image";
import { imagePath } from "../../utils/imagePath";

function Image({ images, alt, ...rest }) {
  return (
    <ProgressiveImage
      src={imagePath(images[0].url)}
      placeholder={imagePath(images[0].thumbnailUrl)}
    >
      {(src) => <img src={src} alt={alt} {...rest} />}
    </ProgressiveImage>
  );
}

export default Image;

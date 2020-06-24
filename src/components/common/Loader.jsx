import React from "react";

function Loader({ text }) {
  return (
    <div class="d-flex justify-content-center">
      <div class="spinner-grow text-success m-2" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="align-self-center">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Loader;

import React from "react";

function Loader({ text }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-grow text-success m-2" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="align-self-center">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Loader;

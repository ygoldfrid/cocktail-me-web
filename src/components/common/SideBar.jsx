import React from "react";
import MyBar from "../MyBar";

function SideBar({ ...rest }) {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block sidebar collapse">
      <MyBar sidebar={true} {...rest} />
    </nav>
  );
}

export default SideBar;

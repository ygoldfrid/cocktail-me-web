import React, { Fragment } from "react";

import Image from "./Image";
import BottomBox from "./BottomBox";
import SideBar from "./SideBar";
import TopBox from "./TopBox";

function MainPage({ element, ...rest }) {
  return (
    <Fragment>
      <SideBar />
      <div className="row element col-md-9 mr-sm-auto col-lg-10 px-md-4">
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              {element.images && (
                <Image
                  images={element.images}
                  alt={element.name}
                  className="card-img"
                />
              )}
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <TopBox element={element} {...rest} />
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <BottomBox element={element} {...rest} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MainPage;

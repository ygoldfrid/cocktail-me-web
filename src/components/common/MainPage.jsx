import React, { Fragment } from "react";
import TopBox from "./TopBox";
import BottomBox from "./BottomBox";
import SideBar from "./../SideBar";

function MainPage({
  history,
  bar,
  onRemove,
  type,
  element,
  ingredients,
  missing,
  onCheck,
  onClick,
  cocktails,
}) {
  return (
    <Fragment>
      <SideBar bar={bar} onRemove={onRemove} history={history} />
      <div className="row element col-md-9 mr-sm-auto col-lg-10 px-md-4">
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={element.image}
                className="card-img"
                alt={element.name}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <TopBox
                  history={history}
                  bar={bar}
                  type={type}
                  element={element}
                  ingredients={ingredients}
                  missing={missing}
                  onCheck={onCheck}
                  onClick={onClick}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <BottomBox
              history={history}
              type={type}
              element={element}
              cocktails={cocktails}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MainPage;

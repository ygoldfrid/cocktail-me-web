import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MyBarItem from "./MyBarItem";

function MyBar({ bar, onAddRemove, sidebar, ...rest }) {
  const getButtonClasses = () => {
    return sidebar
      ? "sidebar-btn row justify-content-center"
      : "my-bar-btn row justify-content-center";
  };

  return (
    <Fragment>
      <div className="row justify-content-center">
        <h4>
          My Bar{" "}
          <span className="badge badge-success badge-pill">
            {bar && bar.length}
          </span>
        </h4>
      </div>
      <div className={sidebar ? "sidebar-sticky" : ""}>
        {bar && bar.length === 0 && (
          <p className="empty-bar text-center">
            Your Bar is empty. Start adding some items{" "}
            <Link to={"/items"}>here!</Link>
          </p>
        )}
        <ul className="nav flex-column list-group list-group-flush">
          {bar &&
            bar.map((ing) => (
              <div key={ing._id}>
                <MyBarItem
                  ing={ing}
                  onAddRemove={() => onAddRemove(ing)}
                  {...rest}
                />
              </div>
            ))}
        </ul>
      </div>
      <div className={getButtonClasses()}>
        <Link
          className="btn btn-cocktailme"
          to={{ pathname: "/home", state: true }}
        >
          Cocktail Me!
        </Link>
      </div>
    </Fragment>
  );
}

export default MyBar;

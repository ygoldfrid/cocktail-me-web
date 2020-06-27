import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MyBarItem from "./MyBarItem";

function MyBar({ bar, onClick, onAddRemove, sidebar, history, ...rest }) {
  const getButtonClasses = () => {
    return sidebar
      ? "sidebar-btn row justify-content-center"
      : "my-bar-btn row justify-content-center";
  };

  const handleClick = () => {
    history.push({ pathname: "/home", state: true });
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
        <button
          className="btn btn-cocktailme"
          onClick={onClick ? onClick : handleClick}
        >
          Cocktail Me!
        </button>
      </div>
    </Fragment>
  );
}

export default MyBar;

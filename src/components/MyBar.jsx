import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MyBarItem from "./MyBarItem";

function MyBar({ bar, onClick, onAddRemove, sidebar, history, ...rest }) {
  const getButtonClasses = () => {
    return sidebar
      ? "sidebar-btn row justify-content-center"
      : "my-bar-btn row justify-content-center";
  };

  const handleCocktailClick = () => {
    if (bar.length < 3)
      return toast.info(`You need at least 3 items in My Bar`);
    history.push({ pathname: "/home", state: true });
  };

  const handlePlusClick = () => {
    history.push("/items");
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-between">
        <div />
        <div>
          <h4>
            My Bar{" "}
            <span className="badge badge-success badge-pill">
              {bar && bar.length}
            </span>
          </h4>
        </div>
        <div className="plus-sign clickable mr-3" onClick={handlePlusClick}>
          <i className="fa fa-plus-square-o fa-2x" aria-hidden="true" />
        </div>
      </div>
      <div className={sidebar ? "sidebar-sticky" : ""}>
        {bar && bar.length === 0 && (
          <p className="empty-bar text-center">
            My Bar is empty. Start adding some items{" "}
            <Link to={"/items"}>here!</Link>
          </p>
        )}
        <ul className="nav flex-column list-group list-group-flush">
          {bar &&
            bar.map((ing) => (
              <div key={ing._id}>
                <MyBarItem
                  ing={ing}
                  history={history}
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
          onClick={onClick ? onClick : handleCocktailClick}
        >
          Cocktail Me!
        </button>
      </div>
    </Fragment>
  );
}

export default MyBar;

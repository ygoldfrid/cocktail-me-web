import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import BarContext from "../../contexts/barContext";
import MyBarItem from "./MyBarItem";

function MyBar({ onClick, sidebar }) {
  const history = useHistory();
  const { bar } = useContext(BarContext);

  const handleCocktailClick = () => {
    if (bar.length < 3)
      return toast.info(`You need at least 3 items in My Bar`);
    history.push({ pathname: "/home", state: true });
  };

  const handlePlusClick = () => {
    history.push("/market");
  };

  return (
    <>
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
      {!sidebar && (
        <div className="my-bar-btn row justify-content-center">
          <button
            className="btn btn-cocktailme"
            onClick={onClick ? onClick : handleCocktailClick}
          >
            Cocktail Me!
          </button>
        </div>
      )}
      <div className={sidebar ? "sidebar-sticky" : ""}>
        {bar && bar.length === 0 && (
          <p className="empty-bar text-center">
            My Bar is empty. Start adding some items{" "}
            <Link to={"/market"}>here!</Link>
          </p>
        )}
        <ul className="nav flex-column list-group list-group-flush">
          {bar &&
            bar.map((ing) => (
              <div key={ing._id}>
                <MyBarItem ing={ing} />
              </div>
            ))}
        </ul>
      </div>
      {sidebar && (
        <div className="sidebar-btn row justify-content-center">
          <button
            className="btn btn-cocktailme"
            onClick={onClick ? onClick : handleCocktailClick}
          >
            Cocktail Me!
          </button>
        </div>
      )}
    </>
  );
}

export default MyBar;

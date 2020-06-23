import React from "react";
import { Link } from "react-router-dom";
import BarItem from "./BarItem";

function SideBar({ bar, onAddRemove, history }) {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block sidebar collapse">
      <div className="row justify-content-center">
        <h4>
          My Bar{" "}
          <span className="badge badge-success badge-pill">
            {bar && bar.length}
          </span>
        </h4>
      </div>
      <div className="sidebar-sticky">
        {bar && bar.length === 0 && (
          <p className="empty-bar text-center">
            Your Bar is empty. Start adding some items!
          </p>
        )}
        <ul className="nav flex-column list-group list-group-flush">
          {bar &&
            bar.map((ing) => (
              <div key={ing._id}>
                <BarItem
                  ing={ing}
                  onRemove={() => onAddRemove(ing)}
                  history={history}
                />
              </div>
            ))}
        </ul>
      </div>
      <div className="my-bar-bottom row justify-content-center">
        <Link
          className="btn btn-cocktailme"
          to={{ pathname: "/home", state: true }}
        >
          Cocktail Me!
        </Link>
      </div>
    </nav>
  );
}

export default SideBar;

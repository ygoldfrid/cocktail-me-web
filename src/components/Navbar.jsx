import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Media from "react-media";

import AuthContext from "../contexts/authContext";
import BarContext from "../contexts/barContext";
import useTour from "../contexts/useTour";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const { bar } = useContext(BarContext);
  const { openTour } = useTour();

  return (
    <nav className="navbar navbar-expand-sm navbar-dark sticky-top">
      <div
        className="navbar-name row align-items-center clickable"
        onClick={() => (window.location = "/")}
      >
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="logo"
          width="30"
          height="30"
          className="mr-1"
        />
        <h6>Cocktail Me!</h6>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <Media
        queries={{
          mobile: "(max-width: 575px)",
          desktop: "(min-width: 575px)",
        }}
      >
        {(matches) => (
          <>
            {matches.mobile && (
              <div
                className="collapse navbar-collapse"
                id="navbarNav"
                data-toggle="collapse"
                data-target="#navbarNav"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="mybar nav-item navbar-link" to="/mybar">
                      <i
                        className="clickable navbar-icon fa fa-glass"
                        aria-hidden="true"
                      />{" "}
                      My Bar
                      <span className="badge badge-light badge-bar">
                        {bar && bar.length}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="market navbar-link" to="/market">
                      <i
                        className="clickable navbar-icon fa fa-shopping-basket"
                        aria-hidden="true"
                      />{" "}
                      Market
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="tour navbar-link"
                      onClick={() => openTour()}
                      to={"#"}
                    >
                      <i
                        className="clickable navbar-icon fa fa-superpowers"
                        aria-hidden="true"
                      />{" "}
                      Tour
                    </Link>
                  </li>
                  <li className="nav-item">
                    {!user && (
                      <Link className="navbar-link" to="/login">
                        <i
                          className="clickable navbar-icon fa fa-user-o"
                          aria-hidden="true"
                        />{" "}
                        Login
                      </Link>
                    )}
                    {user && (
                      <Link className="navbar-link" to="/profile">
                        <i
                          className="clickable navbar-icon fa fa-user-o"
                          aria-hidden="true"
                        />{" "}
                        {user.name}
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            )}
            {matches.desktop && (
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="market navbar-link" to="/market">
                      Market
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="tour mx-3 navbar-link"
                      onClick={() => openTour()}
                      to={"#"}
                    >
                      Tour
                    </Link>
                  </li>
                  <li className="nav-item">
                    {!user && (
                      <Link className="navbar-link" to="/login">
                        <i
                          className="clickable navbar-icon fa fa-user-o"
                          aria-hidden="true"
                        />{" "}
                        Login
                      </Link>
                    )}
                    {user && (
                      <Link className="navbar-link" to="/profile">
                        <i
                          className="clickable navbar-icon fa fa-user-o"
                          aria-hidden="true"
                        />{" "}
                        Hello {user.name}!
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
      </Media>
    </nav>
  );
};

export default NavBar;

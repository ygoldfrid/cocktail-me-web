import React, { Fragment, useContext } from "react";
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
    <nav className="navbar navbar-expand sticky-top">
      <Link className="navbar-brand" to="/">
        Cocktail Me!
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <Media
          queries={{
            mobile: "(max-width: 767px)",
            desktop: "(min-width: 768px)",
          }}
        >
          {(matches) => (
            <Fragment>
              {matches.mobile && (
                <Fragment>
                  <ul className="navbar-nav ml-auto">
                    {!user && (
                      <Link className="nav-item nav-link" to="/login">
                        <i
                          className="clickable navbar-icon fa fa-user-o"
                          aria-hidden="true"
                        />{" "}
                        Login
                      </Link>
                    )}
                    {user && (
                      <div className="nav-container">
                        <Link
                          className="nav-item nav-link nav-name"
                          to="/profile"
                        >
                          <i
                            className="clickable navbar-icon fa fa-user-o"
                            aria-hidden="true"
                          />{" "}
                          {user.name}
                        </Link>
                      </div>
                    )}
                    <Link className="mybar mx-2 nav-item nav-link" to="/mybar">
                      <i
                        className="clickable navbar-icon fa fa-glass"
                        aria-hidden="true"
                      />
                      <span className="badge badge-light badge-bar">
                        {bar && bar.length}
                      </span>
                    </Link>
                    <Link className="market nav-item nav-link" to="/market">
                      <i
                        className="clickable navbar-icon fa fa-shopping-basket"
                        aria-hidden="true"
                      />
                    </Link>
                    <Link
                      className="tour mx-3 nav-item nav-link"
                      onClick={() => openTour()}
                      to={"#"}
                    >
                      <i
                        className="clickable navbar-icon fa fa-superpowers"
                        aria-hidden="true"
                      />
                    </Link>
                  </ul>
                </Fragment>
              )}
              {matches.desktop && (
                <Fragment>
                  <ul className="navbar-nav ml-auto">
                    <Link className="market nav-item nav-link" to="/market">
                      Market
                    </Link>
                    <Link
                      className="tour mx-3 nav-item nav-link"
                      onClick={() => openTour()}
                      to={"#"}
                    >
                      Tour
                    </Link>
                    {!user && (
                      <Link className="nav-item nav-link" to="/login">
                        <i
                          className="clickable navbar-icon fa fa-user-o"
                          aria-hidden="true"
                        />{" "}
                        Login
                      </Link>
                    )}
                    {user && (
                      <Link className="nav-item nav-link" to="/profile">
                        <i
                          className="clickable navbar-icon fa fa-user-o"
                          aria-hidden="true"
                        />{" "}
                        Hello {user.name}!
                      </Link>
                    )}
                  </ul>
                </Fragment>
              )}
            </Fragment>
          )}
        </Media>
      </div>
    </nav>
  );
};

export default NavBar;

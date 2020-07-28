import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Media from "react-media";

const NavBar = ({ user, bar }) => {
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
                  <ul className="navbar-nav mr-auto">
                    <Link className="nav-item nav-link" to="/items">
                      Items
                    </Link>
                  </ul>
                  <ul className="navbar-nav ml-auto">
                    {!user && (
                      <Link className="nav-item nav-link" to="/login">
                        <i
                          className="clickable fa fa-user-o"
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
                            className="clickable fa fa-user-o"
                            aria-hidden="true"
                          />{" "}
                          {user.name}
                        </Link>
                      </div>
                    )}
                    <Link className="nav-item nav-link" to="/mybar">
                      <i
                        className="clickable fa fa-glass 3x"
                        aria-hidden="true"
                      />
                      <span className="badge badge-light badge-bar">
                        {bar && bar.length}
                      </span>
                    </Link>
                  </ul>
                </Fragment>
              )}
              {matches.desktop && (
                <Fragment>
                  <ul className="navbar-nav mr-auto">
                    <Link className="nav-item nav-link" to="/items">
                      Items
                    </Link>
                  </ul>
                  <ul className="navbar-nav ml-auto">
                    {!user && (
                      <Link className="nav-item nav-link" to="/login">
                        <i
                          className="clickable fa fa-user-o"
                          aria-hidden="true"
                        />{" "}
                        Login
                      </Link>
                    )}
                    {user && (
                      <Link className="nav-item nav-link" to="/profile">
                        <i
                          className="clickable fa fa-user-o"
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

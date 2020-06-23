import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = ({ user }) => {
  return (
    <Navbar className="sticky-top" variant="dark" expand="lg">
      <Link className="navbar-link" to="/">
        Cocktail Me!
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className="nav-item nav-link" to="/bar">
            My Bar
          </NavLink>
        </Nav>
        <Nav className="ml-auto">
          {!user && (
            <NavLink className="nav-item nav-link" to="/login">
              <i className="clickable fa fa-user-o" aria-hidden="true" /> Login
            </NavLink>
          )}
          {user && (
            <NavLink className="nav-item nav-link" to="/profile">
              <i className="clickable fa fa-user-o" aria-hidden="true" /> Hello{" "}
              {user.name}!
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

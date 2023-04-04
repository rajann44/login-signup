import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../img/nav.png";

const Navbar = () => {
  let location = useLocation();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex justify-content-center" to="/">
            <img
              src={logo}
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top"
            />
            <div className="mx-2">Login | Signup flow</div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/signup" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                  to="/login"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

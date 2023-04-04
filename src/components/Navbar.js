import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../img/nav.png";

const Navbar = () => {
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

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
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link
                  class={`nav-link ${
                    location.pathname === "/signup" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class={`nav-link ${
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

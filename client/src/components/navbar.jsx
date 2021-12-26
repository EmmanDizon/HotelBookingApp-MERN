import React, { Fragment } from "react";
import DropDown from "./dropdown";

export default function navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };
  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="/home">
        Hotel Booking App
      </a>
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

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {user ? (
            <h1>
              <div className="row">
                <div className="col-md-1">
                  <i className="fa fa-fw fa-user mt-2"></i>
                </div>
                <div className="col">
                  <DropDown username={user.name} logout={logout} />
                </div>
              </div>
            </h1>
          ) : (
            <Fragment>
              <li className="nav-item active">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
}

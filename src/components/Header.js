import React from "react";

import { Link } from "react-router-dom";

const Header = ({ whichPage, bgClass = "primary" }) => {
  return (
    <nav
      style={{ position: "relative" }}
      className={`navbar navbar-expand-sm navbar-dark bg-${bgClass}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          React Cover
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${whichPage === "home" ? "active" : ""}`}
                aria-current="page"
                to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  whichPage === "product-list" ? "active" : ""
                }`}
                aria-current="page"
                to={"/product-list"}>
                Product List
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ position: "absolute", right: "30px" }}>
        <Link to={"/basket"}>
          <span style={{ color: "#fff", paddingRight: "10px" }}>0</span>
          <i style={{ color: "#fff" }} class="fa-solid fa-basket-shopping"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Header;

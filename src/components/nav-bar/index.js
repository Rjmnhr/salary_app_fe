import React from "react";

const NavBar = () => {
  return (
    <>
      <div
        className="container-fluid p-3 px-lg-8 "
        style={{ borderBottom: "1px solid" }}
      >
        <a
          style={{ fontSize: "25px" }}
          className="navbar-brand fw-bold"
          href="/"
        >
          SALARY APP
        </a>
      </div>
    </>
  );
};

export default NavBar;

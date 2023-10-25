import React from "react";

import NavBar from "../../components/nav-bar";

const SalesIncentive = () => {
  return (
    <>
      <NavBar />
      <div
        className="vh-90 section-title col-12"
        style={{ marginTop: "100px", display: "grid", placeItems: "center" }}
      >
        <h1 className="col-12">Sales Incentive</h1>
      </div>
    </>
  );
};

export default SalesIncentive;

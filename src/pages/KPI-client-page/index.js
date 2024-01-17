import React from "react";
import NavBar from "../../components/nav-bar";
import KPIClientComponent from "../../components/KPI-client";

const KPIClientPage = () => {
  return (
    <div>
      <NavBar />
      <div style={{ marginTop: "100px" }} className="container p-3">
        <KPIClientComponent />
      </div>
    </div>
  );
};

export default KPIClientPage;

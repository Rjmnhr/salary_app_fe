import React from "react";

import NavBar from "../../components/nav-bar";
import pdf from "./CEO_pay_NSE100.pdf";

const ExecutiveReports = () => {
  return (
    <>
      <NavBar />
      <div className="vh-100" style={{ marginTop: "100px" }}>
        <h1>Executive Compensation Reports</h1>
        <iframe title="pdf" src={pdf} width="100%" height="700px"></iframe>
      </div>
    </>
  );
};

export default ExecutiveReports;

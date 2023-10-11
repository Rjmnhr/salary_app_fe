import React from "react";

import DocViewer from "react-doc-viewer";
import NavBar from "../../components/nav-bar";

function PPTviewer() {
  const docs = [
    { uri: require("./CEO_pay_NSE100.pptx") }, // Local File
  ];

  return <DocViewer documents={docs} />;
}

const ExecutiveReports = () => {
  return (
    <>
      <NavBar />
      <div className="vh-100 " style={{ marginTop: "100px" }}>
        <h1>Executive Compensation Reports</h1>
        <PPTviewer />
      </div>
    </>
  );
};

export default ExecutiveReports;

import React from "react";

import DocViewer from "react-doc-viewer";

function PPTviewer() {
  const docs = [
    { uri: require("./CEO_pay_NSE100.pptx") }, // Local File
  ];

  return <DocViewer documents={docs} />;
}

const ExecutiveReports = () => {
  return (
    <>
      <div className="vh-100">
        <h1>Executive Compensation Reports</h1>
        <PPTviewer />
      </div>
    </>
  );
};

export default ExecutiveReports;

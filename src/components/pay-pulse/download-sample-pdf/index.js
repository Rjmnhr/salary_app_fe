import React from "react";
import pdfPath from "./sample_report.pdf";
import { notification } from "antd";
function DownloadSamplePDF() {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: `Your report is getting downloaded`,

      placement,
    });
  };

  const downloadPdf = () => {
    openNotification("topRight");
    // Construct the path to your PDF file

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = pdfPath;

    // Set the 'download' attribute to prompt the user to download the file
    link.download = "sample_report.pdf";

    // Trigger a click event to initiate the download
    link.click();
  };

  return (
    <div>
      {contextHolder}
      <button
        onClick={downloadPdf}
        style={{
          fontSize: "20px",

          background: "rgb(0, 128, 128)",
          color: "white",
        }}
        className="btn "
      >
        Download sample report
      </button>
    </div>
  );
}

export default DownloadSamplePDF;

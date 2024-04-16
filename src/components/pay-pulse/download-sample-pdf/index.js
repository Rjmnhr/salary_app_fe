import React from "react";
import pdfPath from "./sample_report.pdf";
import { notification } from "antd";
import { PayPulsePageStyled } from "../../../pages/pay-pulse-landing/style";

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
    <PayPulsePageStyled>
      <div>
        {contextHolder}

        <button
          onClick={downloadPdf}
          className="custom-download-btn mt-2 mb-3 shadow p-3"
        >
          PayPuls sample report
        </button>
      </div>
    </PayPulsePageStyled>
  );
}

export default DownloadSamplePDF;

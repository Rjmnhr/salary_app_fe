import React from "react";
import FileSaver from "file-saver";
import { EXCEL_FILE_BASE64 } from "./constant";
import FileUploader from "./file-uploader";
import NavBar from "../nav-bar";
import { CloudDownloadOutlined } from "@mui/icons-material";

export const TemplateDownloadComponent = () => {
  const handleDownload = () => {
    let sliceSize = 1024;
    let byteCharacters = atob(EXCEL_FILE_BASE64);
    let bytesLength = byteCharacters.length;
    let sliceCount = Math.ceil(bytesLength / sliceSize);
    let bytesArray = new Array(sliceCount);
    for (let sliceIndex = 0; sliceIndex < sliceCount; ++sliceIndex) {
      let begin = sliceIndex * sliceSize;
      let end = Math.min(begin + sliceSize, bytesLength);
      let bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      bytesArray[sliceIndex] = new Uint8Array(bytes);
    }
    let blob = new Blob(bytesArray, { type: "application/vnd.ms-excel" });
    FileSaver.saveAs(new Blob([blob], {}), "downloaded_survey_data.xlsx");
  };
  return (
    <>
      <button onClick={handleDownload} className="btn btn-lg btn-dark">
        Download Template <CloudDownloadOutlined className="ml-2" />
      </button>
    </>
  );
};
const SurveyExcel = () => {
  return (
    <>
      <NavBar />
      <div style={{ marginTop: "100px" }} className="container p-3 ">
        <h2>Survey Template</h2>
        <p>
          Download the survey template Excel sheet by clicking the button below.
          Fill in the required details in the downloaded file.
        </p>
        <TemplateDownloadComponent />
        <br />

        <h2>Submit Survey</h2>
        <p>
          After filling in the survey details in the template, upload the file
          using the file uploader below. Click the "Continue" button to complete
          the process.
        </p>
        <FileUploader />
      </div>
    </>
  );
};

export default SurveyExcel;

import React from "react";
import FileSaver from "file-saver";
import { EXCEL_FILE_BASE64 } from "./template-file";
import FileUploader from "./file-uploader";

import { CloudDownloadOutlined } from "@mui/icons-material";
import AxiosInstance from "../../config/axios";
import NavBar from "../layout/nav-bar";


export const TemplateDownloadComponent = () => {
  const name = sessionStorage.getItem("name");
  const organization = sessionStorage.getItem("organization");
  const email = sessionStorage.getItem("email");
  const phone = sessionStorage.getItem("phone");
  const title = sessionStorage.getItem("title");
  const revenue = sessionStorage.getItem("revenue");
  const sector = sessionStorage.getItem("sector");
  const geographies = sessionStorage.getItem("geographies");
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
    FileSaver.saveAs(
      new Blob([blob], {}),
      "equipay_partners_survey_template.xlsx"
    );

    const formData = new FormData();

    formData.append("name", name);
    formData.append("organization", organization);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("title", title);
    formData.append("revenue", revenue);
    formData.append("sector", sector);
    formData.append("geographies", geographies);

    AxiosInstance.post("/api/survey/template-download", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        console.log("Mail sent");
      })
      .catch((err) => console.log("error notifying", err));
  };
  return (
    <>
      <button onClick={handleDownload} className="btn btn-lg btn-dark">
        Download Template <CloudDownloadOutlined className="ml-2" />
      </button>
    </>
  );
};
const SurveyExcelUploader = () => {
  return (
    <>
      <NavBar />
      <div style={{ marginTop: "100px" }} className="container p-3 ">
        <div className="mb-5">
          <h2>Survey Template</h2>
          <p>
            Download the survey template Excel sheet by clicking the button
            below. Fill in the required details in the downloaded file.
          </p>
          <TemplateDownloadComponent />
          <br />
        </div>

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

export default SurveyExcelUploader;

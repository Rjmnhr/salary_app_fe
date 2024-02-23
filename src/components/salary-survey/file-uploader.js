import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../config/axios";

const { Dragger } = Upload;

const FileUploader = () => {
  const [fileList, setFileList] = useState([]);
  const name = sessionStorage.getItem("name");
  const organization = sessionStorage.getItem("organization");
  const email = sessionStorage.getItem("email");
  const phone = sessionStorage.getItem("phone");
  const title = sessionStorage.getItem("title");
  const revenue = sessionStorage.getItem("revenue");
  const sector = sessionStorage.getItem("sector");
  const geographies = sessionStorage.getItem("geographies");
  const navigate = useNavigate();
  const props = {
    name: "file",
    multiple: false,
    action: "http://localhost:3001/upload", // Your Node.js backend endpoint
    fileList: fileList,
    beforeUpload(file) {
      const isXLSX =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      if (!isXLSX) {
        message.error(
          "You can only upload Microsoft Excel files in .xlsx format!"
        );
      }

      // Only allow .xlsx files to be added to the fileList
      if (isXLSX) {
        setFileList([file]);
      }

      // Return false to prevent default upload behavior if the file is not a .xlsx file
      return isXLSX;
    },
    onChange(info) {
      const { status } = info.file;

      if (status === "uploading") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleSubmit = (fileList) => {
    // Ensure that a file is selected
    if (fileList.length === 0) {
      message.warning("Please upload a file first.");
      return;
    }

    // Send the file to the backend
    const formData = new FormData();

    formData.append("file", fileList[0]);
    formData.append("name", name);
    formData.append("organization", organization);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("title", title);
    formData.append("revenue", revenue);
    formData.append("sector", sector);
    formData.append("geographies", geographies);

    AxiosInstance.post("api/survey/upload-excel", formData)
      .then(async (res) => {
        const response = await res.data;
        console.log(response);
        navigate("/survey-complete");
      })
      .catch((err) => {
        console.log("Uploading Data failed", err);
      });
  };

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single upload. Strictly prohibited from uploading other
          banned files.
        </p>
      </Dragger>

      <div className="mt-3">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => handleSubmit(fileList)}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default FileUploader;

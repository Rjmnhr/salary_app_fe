import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import AxiosInstance from "../axios/index";
import { useNavigate } from "react-router-dom";

const { Dragger } = Upload;

const FileUploader = () => {
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  const props = {
    name: "file",
    multiple: false,
    action: "http://localhost:3001/upload", // Your Node.js backend endpoint
    fileList: fileList,
    beforeUpload(file) {
      // Clear previous files and add the new file
      setFileList([file]);

      // Return false to prevent default upload behavior
      return false;
    },
    onChange(info) {
      const { status } = info.file;

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
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

import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../axios";
import { availableRoles } from "../../role-information";

const HandSelectedCompanies = ({ sectors }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  useEffect(() => {
    AxiosInstance.get("api/benchmark/distinct-companies")
      .then(async (res) => {
        const response = await res.data;
        const sectorGroupValues = response.map(
          (item) => Object.values(item)[0]
        );

        // Filter out null and blank values
        const filteredValues = sectorGroupValues.filter(
          (value) => value !== null && value.trim() !== ""
        );
        // Create a new Set to store unique values
        const uniqueSet = new Set(filteredValues);

        // Convert the Set back to an array
        const uniqueArray = Array.from(uniqueSet);
        uniqueArray.sort();
        setCompanies(uniqueArray);
      })
      .catch((err) => console.log(err));
  });

  const handleChange = (value) => {
    setRole(value);
  };

  const handleCompaniesChange = (value) => {
    setSelectedCompanies(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("role", role);
    formData.append("companies", selectedCompanies?.join(","));
    AxiosInstance.post("api/benchmark/data", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;
        sessionStorage.setItem("result-data", JSON.stringify(response));
        sessionStorage.setItem("role", role);
        navigate("/output");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid p-0 p-lg-3">
      <div
        className="w-100 mt-3"
        style={{ display: "grid", placeItems: "center" }}
      >
        <div className="mb-3 p-0 p-lg-3 d-lg-flex col-12 col-lg-6 text-left bg-light pt-2">
          <div class=" d-flex col-lg-9 col-12 form-group">
            <label className="w-100">Companies </label>
            <Select
              mode="multiple"
              className="select-antd" // Add a custom class for styling
              style={{
                width: "100%",
                border: "1px solid #ced4da",
                outline: "none",
              }}
              placeholder="Please select"
              onChange={handleCompaniesChange}
              options={(companies || []).map((d) => ({
                value: d,
                label: d,
              }))}
            />
          </div>
        </div>

        <div className="mb-3 p-0 p-lg-3  col-12 col-lg-6 text-left bg-light pt-2">
          <div class=" d-flex col-lg-9 col-12 form-group">
            <label className="w-100">Role </label>
            <Select
              placeholder="Select"
              className="select-antd" // Add a custom class for styling
              style={{
                width: "100%",
                border: "1px solid #ced4da",
                paddingLeft: "10px",
                outline: "none",
                background: "white",
              }}
              onChange={handleChange}
              options={(availableRoles || []).map((d) => ({
                value: d,
                label: d,
              }))}
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary mt-3 w-25"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HandSelectedCompanies;

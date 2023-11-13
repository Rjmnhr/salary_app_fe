import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../axios";

const indexNames = [
  "NSE500",
  "NIFTY SMALLCAP 250",
  "NIFTY MNC",
  "NIFTY MICROCAP 250",
  "NIFTY MIDCAP 100",
  "NIFTY PHARMA",
  "NIFTY HEALTHCARE INDEX",
  "NIFTY INFRASTRUCTURE",
  "NIFTY ENERGY",
  "NIFTY SERVICES SECTOR",
  "NIFTY METAL",
  "NIFTY OIL & GAS",
  "NIFTY CONSUMER DURABLES",
  "NIFTY AUTO",
  "NIFTY BANK",
  "NIFTY FINANCIAL SERVICES",
  "NIFTY PRIVATE BANK",
  "NIFTY PSU BANK",
  "NIFTY REALTY",
  "NIFTY FMCG",
  "NIFTY IT",
  "NIFTY MEDIA",
];

export function formatColumnName(columnName) {
  // Replace spaces and slashes with underscores
  columnName = columnName.replace(/[\s/]+/g, "_").toLowerCase();

  // Remove any characters other than letters, numbers, and underscores
  columnName = columnName.replace(/[^a-zA-Z0-9_]/g, "");

  // Replace consecutive underscores with a single underscore
  columnName = columnName.replace(/_+/g, "_");
  return columnName;
}

const BasedOnIndex = ({ sectors }) => {
  const navigate = useNavigate();
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [industries, setIndustries] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [isSelectIndustriesDisabled, setIsSelectIndustriesDisabled] =
    useState(true);
  const [distinctCompaniesCount, setDistinctCompaniesCount] = useState(null);

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("industries", selectedIndustries?.join(","));
    formData.append("index", formatColumnName(selectedIndex));

    AxiosInstance.post("/api/benchmark/companies-index", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;

        const companiesList = response.map((item) => Object.values(item)[0]);

        // Create a new Set to store unique values
        const uniqueSet = new Set(companiesList);

        // Convert the Set back to an array, sort it, and remove "unclassified" if present
        const uniqueArray = Array.from(uniqueSet).sort();

        sessionStorage.setItem("companies", JSON.stringify(uniqueArray));
        sessionStorage.setItem("option", "index");
        sessionStorage.setItem("index", selectedIndex);
        navigate("/companies-filtered");
      })
      .catch((err) => console.log(err));
  };

  const handleChangeIndexes = (value) => {
    setSelectedIndex(value);
  };

  const handleChange = (value) => {
    setSelectedIndustries(value);
    getCompaniesCount(value);
  };

  const getCompaniesCount = (data) => {
    const formData = new FormData();

    formData.append("industries", data?.join(","));
    AxiosInstance.post("api/benchmark/companies-count", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;
        setDistinctCompaniesCount(response[0].distinct_company_count);
      })
      .catch((err) => console.log(err));
  };

  const handleSectorChange = (value) => {
    setSelectedSectors(value);
    getIndustries(value);
  };
  const getIndustries = (data) => {
    const formData = new FormData();

    formData.append("sectors", data?.join(","));
    AxiosInstance.post("api/benchmark/industries", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
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
        setIndustries(uniqueArray);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (selectedSectors.length > 0) {
      setIsSelectIndustriesDisabled(false);
    } else {
      setIsSelectIndustriesDisabled(true);
      setSelectedIndustries([]);
    }
  }, [selectedSectors]);
  return (
    <div className="container-fluid p-0 p-lg-3">
      <div
        className="w-100 mt-3"
        style={{ display: "grid", placeItems: "center" }}
      >
        <div className="mb-3 p-0 p-lg-3 d-lg-flex col-12 col-lg-6 text-left bg-light pt-2">
          <div class=" d-flex col-lg-9 col-12 form-group">
            <label className="w-100">Indexes </label>
            <Select
              className="select-antd" // Add a custom class for styling
              style={{
                width: "100%",
                border: "1px solid #ced4da",
                paddingLeft: "10px",
                outline: "none",
                background: "white",
              }}
              placeholder="Please select"
              onChange={handleChangeIndexes}
              options={(indexNames || []).map((d) => ({
                value: d,
                label: d,
              }))}
            />
          </div>
        </div>

        <div className="mb-3 p-0 p-lg-3  col-12 col-lg-6 text-left bg-light pt-2">
          <div class=" d-flex col-lg-9 col-12 form-group">
            <label className="w-100">Sectors </label>
            <Select
              mode="multiple"
              className="select-antd" // Add a custom class for styling
              style={{
                width: "100%",
                border: "1px solid #ced4da",
                outline: "none",
              }}
              placeholder="Please select"
              onChange={handleSectorChange}
              options={(sectors || []).map((d) => ({
                value: d,
                label: d,
              }))}
            />
          </div>
          <div class=" d-flex col-lg-9 col-12 form-group">
            <label className="w-100">Industries </label>
            <Select
              mode="multiple"
              className="select-antd" // Add a custom class for styling
              style={{
                width: "100%",
                border: "1px solid #ced4da",
                outline: "none",
              }}
              placeholder="Please select"
              value={selectedIndustries}
              onChange={handleChange}
              options={(industries || []).map((d) => ({
                value: d,
                label: d,
              }))}
              disabled={isSelectIndustriesDisabled}
            />
          </div>
        </div>
        {distinctCompaniesCount && selectedIndustries.length > 0 ? (
          <label style={{ margin: "0", fontSize: "14px" }}>
            Distinct companies matched on selected industries :{" "}
            {distinctCompaniesCount}
          </label>
        ) : (
          ""
        )}
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

export default BasedOnIndex;

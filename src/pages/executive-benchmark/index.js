import React, { useEffect, useState } from "react";

import AxiosInstance from "../../components/axios";
import { Select } from "antd";
import NavBar from "../../components/nav-bar";
import { useNavigate } from "react-router-dom";
import HandSelectedPeers from "../../components/hand-selected-peers";

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

export const BasedOnIndex = ({ industries }) => {
  const navigate = useNavigate();
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");

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
        navigate("/role-information");
      })
      .catch((err) => console.log(err));
  };

  const handleChangeIndexes = (value) => {
    setSelectedIndex(value);
  };

  const handleChange = (value) => {
    setSelectedIndustries(value);
  };
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
              className="border"
              style={{
                width: "100%",
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

        <div className="mb-3 p-0 p-lg-3 d-lg-flex col-12 col-lg-6 text-left bg-light pt-2">
          <div class=" d-flex col-lg-9 col-12 form-group">
            <label className="w-100">Industries </label>
            <Select
              mode="multiple"
              allowClear
              className="border"
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              onChange={handleChange}
              options={(industries || []).map((d) => ({
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

function ExecutiveBenchmark() {
  const [selectedOption, setSelectedOption] = useState("HandSelectedPeers");
  const [industries, setIndustries] = useState(null);

  useEffect(() => {
    AxiosInstance.get("/api/benchmark/industries")
      .then(async (res) => {
        const response = await res.data;

        const industryGroupValues = response.map(
          (item) => Object.values(item)[0]
        );

        // Create a new Set to store unique values
        const uniqueSet = new Set(industryGroupValues);

        // Convert the Set back to an array
        const uniqueArray = Array.from(uniqueSet);
        uniqueArray.sort();
        setIndustries(uniqueArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <NavBar />
      <div className="container-fluid " style={{ marginTop: "80px" }}>
        {/* <h2 className="fs-2 mt-3">Peer group creation</h2> */}
        <h3 className="mt-5">Choose any of the options</h3>
        <div style={{ display: "grid", placeItems: "center" }}>
          <div className="w-100 mt-3 d-flex justify-content-around col-lg-6">
            <div>
              <input
                type="radio"
                value="HandSelectedPeers"
                checked={selectedOption === "HandSelectedPeers"}
                onChange={handleRadioChange}
                style={{ marginRight: "8px" }}
              />
              <label>Hand selected peers</label>
            </div>
            <div>
              <input
                type="radio"
                value="BasedOnIndex"
                checked={selectedOption === "BasedOnIndex"}
                onChange={handleRadioChange}
                style={{ marginRight: "8px" }}
              />
              <label>Based on index</label>
            </div>
          </div>
        </div>

        {selectedOption === "HandSelectedPeers" ? (
          <HandSelectedPeers industries={industries} />
        ) : (
          <BasedOnIndex industries={industries} />
        )}
      </div>
    </>
  );
}

export default ExecutiveBenchmark;

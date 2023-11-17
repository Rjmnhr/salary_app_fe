import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../axios";
import MatchCountComponentIndex from "../../match-counts-index";

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
  // const [industries, setIndustries] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  // const [isSelectIndustriesDisabled, setIsSelectIndustriesDisabled] =
  //   useState(true);
  const [distinctCompaniesCount, setDistinctCompaniesCount] = useState(null);
  const [distinctCompaniesCountIndices, setDistinctCompaniesCountIndices] =
    useState(null);
  const [distinctCompaniesCountTogether, setDistinctCompaniesCountTogether] =
    useState(0);

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

        // Create a new Set to store unique values
        const uniqueSet = new Set(response);

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
    console.log("entered");
    setSelectedIndex(value);
    getCompaniesCountIndices(value);
  };

  // const handleChange = (value) => {
  //   setSelectedIndustries(value);

  // };

  useEffect(() => {
    if (selectedSectors.length === 0) {
      setSelectedIndustries([]);
    }
  }, [selectedSectors]);
  const getCompaniesCount = (data) => {
    const formData = new FormData();

    formData.append("industries", data?.join(","));
    AxiosInstance.post("api/benchmark/companies-count-index", formData, {
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
  useEffect(() => {
    if (
      selectedSectors.length > 0 &&
      selectedIndex &&
      selectedIndustries.length > 0
    ) {
      getCompaniesCountByTogether();
    } else {
      setDistinctCompaniesCountTogether(0);
    }
    //eslint-disable-next-line
  }, [selectedIndex, selectedSectors, selectedIndustries]);
  const getCompaniesCountIndices = (data) => {
    const formData = new FormData();

    formData.append("index", formatColumnName(data));

    AxiosInstance.post("api/benchmark/companies-count-indices", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;
        setDistinctCompaniesCountIndices(response[0].distinct_company_count);
      })
      .catch((err) => console.log(err));
  };

  const getCompaniesCountByTogether = () => {
    const formData = new FormData();

    formData.append("industries", selectedIndustries?.join(","));
    formData.append("index", formatColumnName(selectedIndex));

    AxiosInstance.post("/api/benchmark/companies-index/count", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;

        setDistinctCompaniesCountTogether(response[0].distinct_company_count);
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
    AxiosInstance.post("api/benchmark/industries-index", formData, {
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
        // setIndustries(uniqueArray);
        setSelectedIndustries(uniqueArray);
        if (data.length > 0) {
          getCompaniesCount(uniqueArray);
        } else {
          setDistinctCompaniesCount(0);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (selectedSectors.length === 0) {
      setSelectedIndustries([]);
      setDistinctCompaniesCount(0);
    }
  }, [selectedSectors]);
  // useEffect(() => {
  //   if (selectedSectors.length > 0) {
  //     setIsSelectIndustriesDisabled(false);
  //   } else {
  //     setIsSelectIndustriesDisabled(true);
  //     setSelectedIndustries([]);
  //   }
  // }, [selectedSectors]);
  return (
    <div className="container-fluid p-0 p-lg-3">
      <div
        className="w-100 mt-3"
        style={{ display: "grid", placeItems: "center" }}
      >
        <div className="mb-3 p-0 p-lg-3 d-lg-flex col-12 col-lg-6 text-left bg-light pt-2">
          <div class=" d-flex col-lg-9 col-12 form-group">
            <label className="w-100">Indices </label>
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
          {/* <div class=" d-flex col-lg-9 col-12 form-group">
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
          </div> */}
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
      <div
        style={{
          height: "80vh",
          position: "absolute",
          right: "0",
          top: "0",
          marginTop: "80px",
          display: "grid",
          justifyItems: "center",
          alignContent: "center",
          width: "25%",
        }}
      >
        <MatchCountComponentIndex
          selectedIndustries={selectedIndustries}
          selectedSectors={selectedSectors}
          selectedIndex={selectedIndex}
          together={distinctCompaniesCountTogether}
          indices={distinctCompaniesCountIndices}
          industries={distinctCompaniesCount}
        />
      </div>
    </div>
  );
};

export default BasedOnIndex;

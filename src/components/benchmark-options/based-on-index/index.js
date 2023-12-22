import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../axios";
import MatchCountComponentIndex from "../../match-counts-index";
import { ArrowForward } from "@mui/icons-material";

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
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  // const [industries, setIndustries] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  // const [isSelectIndustriesDisabled, setIsSelectIndustriesDisabled] =
  //   useState(true);
  const [distinctCompaniesCount, setDistinctCompaniesCount] = useState(0);
  const [distinctCompaniesCountIndices, setDistinctCompaniesCountIndices] =
    useState(0);
  const [distinctCompaniesCountTogether, setDistinctCompaniesCountTogether] =
    useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = () => {
    let threshold;

    // Check the conditions and set the threshold accordingly
    if (distinctCompaniesCount > 0 && distinctCompaniesCountIndices > 0) {
      // Case 1: distinctCompaniesCount and distinctCompaniesCountMetrics are above zero
      threshold = distinctCompaniesCountTogether;
    } else if (
      distinctCompaniesCount > 0 &&
      distinctCompaniesCountIndices === 0
    ) {
      // Case 2: distinctCompaniesCount is above zero and others are zero
      threshold = distinctCompaniesCount;
    } else if (
      distinctCompaniesCountIndices > 0 &&
      distinctCompaniesCount === 0
    ) {
      // Case 3: distinctCompaniesCountMetrics is above zero and others are zero
      threshold = distinctCompaniesCountIndices;
    } else {
      // Handle other cases if needed
      threshold = 0;
    }

    // Check if the threshold is above 10 before making the API call
    if (threshold < 10) {
      showModal();
      return;
    }

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
  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px) to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add an event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div style={{ color: "white" }} className="container-fluid p-0 p-lg-3">
      <div
        className="w-100 mt-3"
        style={{ display: "grid", placeItems: "center" }}
      >
        <div
          style={{
            transition: "all 0.5s ease",
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 3px 0px",
          }}
          className="mb-3 p-0 p-lg-3 d-lg-flex col-12 col-lg-6 text-left border pt-2"
        >
          <div class=" d-flex col-lg-9 col-12 form-group">
            <label className="w-100" style={{ fontWeight: "bold" }}>
              Indices{" "}
            </label>
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

        <div
          style={{
            transition: "all 0.5s ease",
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 3px 0px",
          }}
          className="mb-3 p-0 p-lg-3  col-12 col-lg-6 text-left border pt-2"
        >
          <div class=" d-flex col-lg-9 col-12 form-group">
            <label className="w-100" style={{ fontWeight: "bold" }}>
              Sectors{" "}
            </label>
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
            <label className="w-100" style={{fontWeight:"bold"}}>Industries </label>
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
      <div className="mb-3 d-flex justify-content-center">
         
              <button
          style={{ marginBottom: `${isMobile ? "80px" : ""}` ,width: `${isMobile ? "100%" : "25%"}` }}
          onClick={handleSubmit}
          type="submit"
          className="btn btn-lg bg-light mt-3 d-flex align-items-center justify-content-between"
        >
          Next  <ArrowForward/>
        </button>
        </div>
      {isMobile ? (
        selectedSectors.length > 0 || selectedIndex ? (
          <div
            style={{
              position: "absolute",
              left: "0",
              bottom: "0",
              background: "black",
              display: "flex",
              justifyContent: "space-between", // Corrected property name
              alignItems: "center",
              width: "100%",
            }}
          >
            {distinctCompaniesCountIndices && selectedIndex ? (
              <div class="col-lg-12 col-md-6 mt-lg-5  mt-md-0">
                <div
                  style={{
                    boxShadow: " 0px 3px 3px 0px rgba(0, 0, 0, 0.08)",
                    padding: "8px",
                    color: "white",
                  }}
                >
                  <span
                    style={{ fontWeight: "bolder", fontSize: "35px" }}
                    data-toggle="counter-up"
                  >
                    {distinctCompaniesCountIndices}
                  </span>
                  <p style={{ fontSize: "10px", margin: "0" }}>
                    {" "}
                    Companies match on indices
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}

            {selectedSectors.length > 0 && selectedIndex ? (
              <div class="col-lg-12 col-md-6 mt-lg-3 mt-md-0">
                <div
                  style={{
                    boxShadow: " 0px 3px 3px 0px rgba(0, 0, 0, 0.08)",
                    padding: "8px",
                    color: "white",
                  }}
                >
                  <span
                    style={{ fontWeight: "bolder", fontSize: "35px" }}
                    className="text-primary"
                    data-toggle="counter-up"
                  >
                    {distinctCompaniesCountTogether}
                  </span>
                  <p
                    style={{
                      fontSize: "10px",
                      margin: "0",
                      color: "#e8edea",
                    }}
                  >
                    Companies match on both indices and sectors
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
            {distinctCompaniesCount && selectedSectors.length > 0 ? (
              <div class="col-lg-12 col-md-6 mt-lg-3 mt-md-0">
                <div
                  style={{
                    boxShadow: " 0px 3px 3px 0px rgba(0, 0, 0, 0.08)",
                    padding: "8px",
                    color: "white",
                  }}
                >
                  <span
                    style={{ fontWeight: "bolder", fontSize: "35px" }}
                    data-toggle="counter-up"
                  >
                    {distinctCompaniesCount}
                  </span>
                  <p style={{ fontSize: "10px", margin: "0" }}>
                    {" "}
                    Companies match on selected sectors{" "}
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )
      ) : (
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
      )}

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // To remove footer buttons
        centered
      >
        <h5>
          Please make sure at least 10 companies have matched for
          meaningful analysis
        </h5>
      </Modal>
    </div>
  );
};

export default BasedOnIndex;

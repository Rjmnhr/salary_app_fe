import React, { useEffect, useState } from "react";
import Fraction from "fraction.js";
import { Divider, Modal, Select } from "antd";
import CurrencyInput from "react-currency-input-field";
import { useNavigate } from "react-router-dom";
import MatchCountComponent from "../../match-counts";
import { HandSelectedPeersStyled } from "../hand-selected-peers/style";
import { ArrowForward } from "@mui/icons-material";
import AxiosInstance from "../../../../config/axios";
import { useApplicationContext } from "../../../../context/app-context";

const HandSelectedPeersUK = () => {
  const [marketCap, setMarketCap] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);

  const [assetsRange, setAssetsRange] = useState("1/2 - 2");

  const [marketRange, setMarketRange] = useState("1/2 - 2");
  // const [industries, setIndustries] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  // const [isSelectIndustriesDisabled, setIsSelectIndustriesDisabled] =
  //   useState(true);
  const [minAssets, setMinAssets] = useState(null);

  const [minMarketCap, setMinMarketCap] = useState(null);

  const [maxMarketCap, setMaxMarketCap] = useState(null);
  const [maxAssets, setMaxAssets] = useState(null);

  const [distinctCompaniesCount, setDistinctCompaniesCount] = useState(0);
  const [distinctCompaniesCountMetrics, setDistinctCompaniesCountMetrics] =
    useState(0);
  const [distinctCompaniesCountTogether, setDistinctCompaniesCountTogether] =
    useState(0);
  const { isMobile } = useApplicationContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get("/api/benchmark/sectors-uk")
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
        setSectors(uniqueArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleMarketCapChange = (data) => {
    const newValue = data?.replace(/[$,]/g, "");

    const value = parseFloat(newValue);
    setMarketCap(value);
    const returnObject = calculateRange(value, marketRange);
    setMinMarketCap(returnObject.min);
    setMaxMarketCap(returnObject.max);
  };

  const handleAssetsChange = (data) => {
    const newValue = data?.replace(/[$,]/g, "");

    const value = parseFloat(newValue);
    setTotalAssets(value);
    const returnObject = calculateRange(value, assetsRange);
    setMinAssets(returnObject.min);
    setMaxAssets(returnObject.max);
  };

  const handleMarketRangeChange = (event) => {
    const selected = event.target.value;
    setMarketRange(selected);
    const returnObject = calculateRange(marketCap, selected);
    setMinMarketCap(returnObject.min);
    setMaxMarketCap(returnObject.max);
  };

  const handleAssetsRangeChange = (event) => {
    const selected = event.target.value;
    setAssetsRange(selected);
    const returnObject = calculateRange(totalAssets, selected);
    setMinAssets(returnObject.min);
    setMaxAssets(returnObject.max);
  };

  const calculateRange = (value, range) => {
    const [minFactor, maxFactor] = range.split(" - ");
    const fractionValue = new Fraction(minFactor).valueOf();

    const min = value * fractionValue;
    const max = value * maxFactor;
    return { min: Math.round(min), max: Math.round(max) };
  };

  const handleSubmit = () => {
    let threshold;

    // Check the conditions and set the threshold accordingly
    if (distinctCompaniesCount > 0 && distinctCompaniesCountMetrics > 0) {
      // Case 1: distinctCompaniesCount and distinctCompaniesCountMetrics are above zero
      threshold = distinctCompaniesCountTogether;
    } else if (
      distinctCompaniesCount > 0 &&
      distinctCompaniesCountMetrics === 0
    ) {
      // Case 2: distinctCompaniesCount is above zero and others are zero
      threshold = distinctCompaniesCount;
    } else if (
      distinctCompaniesCountMetrics > 0 &&
      distinctCompaniesCount === 0
    ) {
      // Case 3: distinctCompaniesCountMetrics is above zero and others are zero
      threshold = distinctCompaniesCountMetrics;
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

    formData.append("industries", selectedSectors?.join(","));

    formData.append("minMarketCap", minMarketCap);
    formData.append("maxMarketCap", maxMarketCap);

    formData.append("minAssets", minAssets);
    formData.append("maxAssets", maxAssets);

    AxiosInstance.post("/api/benchmark/companies-hand-uk", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;

        // const companiesList = response.map((item) => Object.values(item)[0]);

        // Create a new Set to store unique values
        const uniqueSet = new Set(response);

        // Convert the Set back to an array, sort it, and remove "unclassified" if present
        const uniqueArray = Array.from(uniqueSet).sort();

        sessionStorage.setItem("companies", JSON.stringify(uniqueArray));
        sessionStorage.setItem("option", "size");
        sessionStorage.setItem("market-cap", { minMarketCap, maxMarketCap });
        sessionStorage.setItem("assets", { minAssets, maxAssets });

        navigate("/companies-filtered");
      })
      .catch((err) => console.log(err));
  };

  // const handleChange = (value) => {
  //   setSelectedIndustries(value);

  // };

  useEffect(() => {
    if (selectedIndustries.length === 0) {
      setDistinctCompaniesCount(0);
    }
  }, [selectedIndustries]);

  useEffect(() => {
    if (selectedSectors.length === 0) {
      setSelectedIndustries([]);
    }
  }, [selectedSectors]);

  const handleSectorChange = (value) => {
    setSelectedSectors(value);
    getIndustries(value);
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
        // setIndustries(uniqueArray);

        setSelectedIndustries(uniqueArray);
        if (data.length > 0) {
          getCompaniesCount(uniqueArray);
        }
      })
      .catch((err) => console.log(err));
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
    }).format(value);
  };

  useEffect(() => {
    if (maxMarketCap || maxAssets) {
      getCompaniesCountByMetrics();
    } else {
      setDistinctCompaniesCountMetrics(0);
    }
    //eslint-disable-next-line
  }, [maxMarketCap, maxAssets]);

  const getCompaniesCountByMetrics = () => {
    const formData = new FormData();
    formData.append("minMarketCap", minMarketCap);
    formData.append("maxMarketCap", maxMarketCap);

    formData.append("minAssets", minAssets);
    formData.append("maxAssets", maxAssets);

    AxiosInstance.post("api/benchmark/companies-count-metrics", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;

        setDistinctCompaniesCountMetrics(response[0].distinct_company_count);
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   if (selectedSectors.length > 0) {
  //     setIsSelectIndustriesDisabled(false);
  //   } else {
  //     setIsSelectIndustriesDisabled(true);
  //     setSelectedIndustries([]);
  //   }
  // }, [selectedSectors]);

  useEffect(() => {
    if (selectedIndustries.length > 0 && (maxMarketCap || maxAssets)) {
      getCompaniesCountByTogether();
    } else {
      setDistinctCompaniesCountTogether(0);
    }
    //eslint-disable-next-line
  }, [maxMarketCap, maxAssets, selectedIndustries]);

  const getCompaniesCountByTogether = () => {
    const formData = new FormData();
    formData.append("industries", selectedIndustries?.join(","));

    formData.append("minMarketCap", minMarketCap);
    formData.append("maxMarketCap", maxMarketCap);

    formData.append("minAssets", minAssets);
    formData.append("maxAssets", maxAssets);

    AxiosInstance.post("api/benchmark/companies-hand/count", formData, {
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

  const dividerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(0, 0, 0, 0.45)",
    fontWeight: "bold",
  };

  return (
    <>
      <HandSelectedPeersStyled>
        <div style={{ color: "white" }} className="container-fluid p-0 p-lg-3">
          <div
            className="scrollable-container"
            style={{ height: "70vh", overflowY: "scroll" }}
          >
            <div
              className="w-100 mt-3"
              style={{ display: "grid", placeItems: "center" }}
            >
              <p className="text-dark">Select desired range for each entry</p>
              <div
                style={{
                  transition: "all 0.5s ease",
                  boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 3px 0px",
                }}
                className=" p-0 p-lg-3  col-12 col-lg-6 text-left border pt-2"
              >
                <div className="d-lg-flex">
                  <div class=" d-flex col-lg-9 col-12 form-group">
                    <label className="w-100" style={{ fontWeight: "bold" }}>
                      Market Capitalization
                    </label>
                    <CurrencyInput
                      className="currency-input"
                      class="form-control"
                      placeholder="Enter"
                      style={{
                        width: "100%",
                        paddingLeft: "10px",
                        border: "1px solid #ced4da",
                        borderRadius: "0.25rem",
                        outline: "none",
                      }}
                      // prefix="₹"
                      onValueChange={handleMarketCapChange}
                      decimalsLimit={0}
                    />{" "}
                  </div>
                  <div class=" d-flex col-lg-3 col-12 form-group">
                    <label className="w-100 d-block d-lg-none">Range </label>

                    <select
                      required
                      type="number"
                      name="market-range"
                      class="form-control"
                      id="market-range"
                      placeholder="Enter"
                      value={marketRange}
                      onChange={handleMarketRangeChange}
                      style={{ outline: "none" }}
                    >
                      <option value="1/2 - 2">1/2 - 2</option>
                      <option value="1/3 - 3">1/3 - 3</option>
                      <option value="1/4 - 4">1/4 - 4</option>
                    </select>
                  </div>
                </div>

                <div
                  className={`text-right col-12 pb-2 pb-lg-0  form-group mb-0 ${
                    minMarketCap === 0 || !minMarketCap ? "d-none" : "d-block"
                  }`}
                >
                  <label style={{ margin: "0", fontSize: "14px" }}>
                    Value range : {formatCurrency(minMarketCap)} -{" "}
                    {formatCurrency(maxMarketCap)}
                  </label>
                </div>
              </div>
              <div style={dividerStyle}>
                <Divider />
                <span style={{ padding: "0 8px" }}>OR</span>
                <Divider />
              </div>

              <div
                style={{
                  transition: "all 0.5s ease",
                  boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 3px 0px",
                }}
                className=" p-0 p-lg-3  col-12 col-lg-6 text-left border pt-2"
              >
                <div className="d-lg-flex">
                  <div class=" d-flex col-lg-9 col-12 form-group">
                    <label className="w-100" style={{ fontWeight: "bold" }}>
                      Total Revenue{" "}
                    </label>
                    <CurrencyInput
                      className="currency-input"
                      class="form-control"
                      placeholder="Enter"
                      style={{
                        width: "100%",
                        paddingLeft: "10px",
                        border: "1px solid #ced4da",
                        borderRadius: "0.25rem",
                        outline: "none",
                      }}
                      // prefix="₹"
                      onValueChange={handleAssetsChange}
                      decimalsLimit={0}
                    />{" "}
                  </div>

                  <div class=" d-flex col-lg-3 col-12 form-group">
                    <label className="w-100 d-block d-lg-none">Range </label>
                    <select
                      required
                      type="number"
                      name="market-range"
                      class="form-control"
                      id="market-range"
                      placeholder="Enter"
                      value={assetsRange}
                      onChange={handleAssetsRangeChange}
                    >
                      <option value="1/2 - 2">1/2 - 2</option>
                      <option value="1/3 - 3">1/3 - 3</option>
                      <option value="1/4 - 4">1/4 - 4</option>
                    </select>
                  </div>
                </div>
                <div
                  className={`text-right col-12 pb-2 pb-lg-0 form-group mb-0 ${
                    minAssets === 0 || !minAssets ? "d-none" : "d-block"
                  }`}
                >
                  <label style={{ margin: "0", fontSize: "14px" }}>
                    Value range : {formatCurrency(minAssets)} -{" "}
                    {formatCurrency(maxAssets)}
                  </label>
                </div>
              </div>
              <div style={dividerStyle}>
                <Divider />
                <span style={{ padding: "0 8px" }}>OR</span>
                <Divider />
              </div>

              <div style={dividerStyle}>
                <Divider />

                <Divider />
              </div>

              <div
                style={{
                  transition: "all 0.5s ease",
                  boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 3px 0px",
                }}
                className="mb-3 p-0 p-lg-3  col-12 col-lg-6 text-left border pt-2"
              >
                <div class=" d-flex col-lg-12 col-12 form-group">
                  <label style={{ width: `${isMobile ? "100%" : "55%"}` }}>
                    Sectors{" "}
                  </label>
                  <Select
                    mode="multiple"
                    className="select-antd" // Add a custom class for styling
                    style={{
                      width: "100%",
                      border: "1px solid #ced4da",
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
                style={{
                  marginBottom: `${isMobile ? "200px" : ""}`,
                  width: `${isMobile ? "100%" : "25%"}`,
                }}
                onClick={handleSubmit}
                type="submit"
                className="btn btn-lg bg-light mt-3 d-flex align-items-center justify-content-between"
              >
                Next <ArrowForward />
              </button>
            </div>
          </div>
          {isMobile ? (
            selectedSectors.length > 0 || maxMarketCap || maxAssets ? (
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  bottom: "0",
                  background: "black",
                  display: "flex",
                  justifyContents: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {distinctCompaniesCountMetrics &&
                (maxMarketCap || maxAssets) ? (
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
                        {distinctCompaniesCountMetrics}
                      </span>
                      <p style={{ fontSize: "10px", margin: "0" }}>
                        {" "}
                        Companies match on Financial metrics
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {selectedSectors.length > 0 && (maxMarketCap || maxAssets) ? (
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
                        Companies match on both metrics and sectors
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
              <MatchCountComponent
                marketCap={marketCap}
                totalAssets={totalAssets}
                selectedIndustries={selectedIndustries}
                together={distinctCompaniesCountTogether}
                financial={distinctCompaniesCountMetrics}
                industries={distinctCompaniesCount}
                isMobile={isMobile}
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
      </HandSelectedPeersStyled>
    </>
  );
};
export default HandSelectedPeersUK;

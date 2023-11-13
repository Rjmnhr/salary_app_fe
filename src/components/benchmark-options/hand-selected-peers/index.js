import React, { useEffect, useState } from "react";
import Fraction from "fraction.js";

import { Select } from "antd";
import CurrencyInput from "react-currency-input-field";
import "./style.css";

import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../axios";

const HandSelectedPeers = ({ sectors }) => {
  const [marketCap, setMarketCap] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [sales, setSales] = useState(0);
  const [pat, setPat] = useState(0);
  const [assetsRange, setAssetsRange] = useState("1/2 - 2");
  const [salesRange, setSalesRange] = useState("1/2 - 2");
  const [patRange, setPatRange] = useState("1/2 - 2");
  const [marketRange, setMarketRange] = useState("1/2 - 2");
  const [industries, setIndustries] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [isSelectIndustriesDisabled, setIsSelectIndustriesDisabled] =
    useState(true);
  const [minAssets, setMinAssets] = useState(0);
  const [minSales, setMinSales] = useState(0);
  const [minPAT, setMinPAT] = useState(0);
  const [minMarketCap, setMinMarketCap] = useState(0);

  const [maxMarketCap, setMaxMarketCap] = useState(0);
  const [maxAssets, setMaxAssets] = useState(0);
  const [maxSales, setMaxSales] = useState(0);
  const [maxPAT, setMaxPAT] = useState(0);
  const [distinctCompaniesCount, setDistinctCompaniesCount] = useState(null);
  const [distinctCompaniesCountMetrics, setDistinctCompaniesCountMetrics] =
    useState(null);

  const navigate = useNavigate();

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

  const handleSalesChange = (data) => {
    const newValue = data?.replace(/[$,]/g, "");

    const value = parseFloat(newValue);
    setSales(value);
    const returnObject = calculateRange(value, salesRange);
    setMinSales(returnObject.min);
    setMaxSales(returnObject.max);
  };

  const handlePATChange = (data) => {
    const newValue = data?.replace(/[$,]/g, "");

    const value = parseFloat(newValue);
    setPat(value);
    const returnObject = calculateRange(value, patRange);
    setMinPAT(returnObject.min);
    setMaxPAT(returnObject.max);
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

  const handleSalesRangeChange = (event) => {
    const selected = event.target.value;
    setSalesRange(selected);
    const returnObject = calculateRange(sales, selected);
    setMinSales(returnObject.min);
    setMaxSales(returnObject.max);
  };

  const handlePATRangeChange = (event) => {
    const selected = event.target.value;
    setPatRange(selected);
    const returnObject = calculateRange(pat, selected);
    setMinPAT(returnObject.min);
    setMaxPAT(returnObject.max);
  };

  const calculateRange = (value, range) => {
    const [minFactor, maxFactor] = range.split(" - ");
    const fractionValue = new Fraction(minFactor).valueOf();

    const min = value * fractionValue;
    const max = value * maxFactor;
    return { min: Math.round(min), max: Math.round(max) };
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("industries", selectedIndustries?.join(","));

    formData.append("minMarketCap", minMarketCap);
    formData.append("maxMarketCap", maxMarketCap);

    formData.append("minAssets", minAssets);
    formData.append("maxAssets", maxAssets);

    formData.append("minSales", minSales);
    formData.append("maxSales", maxSales);

    formData.append("minPAT", minPAT);
    formData.append("maxPAT", maxPAT);

    AxiosInstance.post("/api/benchmark/companies-hand", formData, {
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
        sessionStorage.setItem("option", "hand");
        sessionStorage.setItem("market-cap", { minMarketCap, maxMarketCap });
        sessionStorage.setItem("assets", { minAssets, maxAssets });

        sessionStorage.setItem("sale", { minSales, maxSales });
        sessionStorage.setItem("pat", { minPAT, maxPAT });
        navigate("/companies-filtered");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (value) => {
    setSelectedIndustries(value);
    getCompaniesCount(value);
  };
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
        setIndustries(uniqueArray);
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
    if (marketCap || totalAssets || sales || pat) {
      getCompaniesCountByMetrics();
    }
    //eslint-disable-next-line
  }, [marketCap, totalAssets, sales, pat]);

  const getCompaniesCountByMetrics = () => {
    const formData = new FormData();
    formData.append("minMarketCap", minMarketCap);
    formData.append("maxMarketCap", maxMarketCap);

    formData.append("minAssets", minAssets);
    formData.append("maxAssets", maxAssets);

    formData.append("minSales", minSales);
    formData.append("maxSales", maxSales);

    formData.append("minPAT", minPAT);
    formData.append("maxPAT", maxPAT);

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
        <p className="text-primary">Select desired range for each entry</p>
        <div
          style={{ transition: "all 0.5s ease" }}
          className="mb-3 p-0 p-lg-3  col-12 col-lg-6 text-left bg-light pt-2"
        >
          <div className="d-lg-flex">
            <div class=" d-flex col-lg-9 col-12 form-group">
              <label className="w-100">Market Capitalization</label>
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
        <div className="mb-3 p-0 p-lg-3  col-12 col-lg-6 text-left bg-light pt-2">
          <div className="d-lg-flex">
            <div class=" d-flex col-lg-9 col-12 form-group">
              <label className="w-100">Total Assets </label>
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
        <div className="mb-3 p-0 p-lg-3  col-12 col-lg-6 text-left bg-light pt-2">
          <div className="d-lg-flex">
            <div class=" d-flex col-lg-9 col-12 form-group">
              <label className="w-100">Sales </label>
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
                onValueChange={handleSalesChange}
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
                value={salesRange}
                onChange={handleSalesRangeChange}
              >
                <option value="1/2 - 2">1/2 - 2</option>
                <option value="1/3 - 3">1/3 - 3</option>
                <option value="1/4 - 4">1/4 - 4</option>
              </select>
            </div>
          </div>
          <div
            className={`text-right col-12 pb-2 pb-lg-0  form-group mb-0 ${
              minSales === 0 || !minSales ? "d-none" : "d-block"
            }`}
          >
            <label style={{ margin: "0", fontSize: "14px" }}>
              Value range : {formatCurrency(minSales)} -{" "}
              {formatCurrency(maxSales)}
            </label>
          </div>
        </div>
        <div className="mb-3 p-0 p-lg-3  col-12 col-lg-6 text-left bg-light pt-2">
          <div className="d-lg-flex">
            <div class=" d-flex col-lg-9 col-12 form-group">
              <label className="w-100">Profit After Tax </label>
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
                onValueChange={handlePATChange}
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
                value={patRange}
                onChange={handlePATRangeChange}
              >
                <option value="1/2 - 2">1/2 - 2</option>
                <option value="1/3 - 3">1/3 - 3</option>
                <option value="1/4 - 4">1/4 - 4</option>
              </select>
            </div>
          </div>
          <div
            className={`text-right col-12 pb-2 pb-lg-0  form-group mb-0 ${
              minPAT === 0 || !minPAT ? "d-none" : "d-block"
            }`}
          >
            <label style={{ margin: "0", fontSize: "14px" }}>
              Value range : {formatCurrency(minPAT)} - {formatCurrency(maxPAT)}
            </label>
          </div>
        </div>
        {distinctCompaniesCountMetrics &&
        (marketCap || totalAssets || sales || pat) ? (
          <label style={{ margin: "0", fontSize: "14px" }}>
            Distinct companies matched on Financial metrics :{" "}
            {distinctCompaniesCountMetrics}
          </label>
        ) : (
          ""
        )}
        <div className="mb-3 p-0 p-lg-3  col-12 col-lg-6 text-left bg-light pt-2">
          <div class=" d-flex col-lg-9 col-12 form-group">
            <label className="w-100">Sectors </label>
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
          <div class=" d-flex col-lg-9 col-12 form-group">
            <label className="w-100">Industries </label>
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
export default HandSelectedPeers;

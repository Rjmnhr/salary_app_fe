import React, { useState } from "react";
import Fraction from "fraction.js";
import AxiosInstance from "../../components/axios";
import { Select } from "antd";

import { useNavigate } from "react-router-dom";

const HandSelectedPeers = ({ industries }) => {
  const [marketCap, setMarketCap] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [sales, setSales] = useState(0);
  const [pat, setPat] = useState(0);
  const [assetsRange, setAssetsRange] = useState("1/2 - 2");
  const [salesRange, setSalesRange] = useState("1/2 - 2");
  const [patRange, setPatRange] = useState("1/2 - 2");
  const [marketRange, setMarketRange] = useState("1/2 - 2");

  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [minAssets, setMinAssets] = useState(0);
  const [minSales, setMinSales] = useState(0);
  const [minPAT, setMinPAT] = useState(0);
  const [minMarketCap, setMinMarketCap] = useState(0);

  const [maxMarketCap, setMaxMarketCap] = useState(0);
  const [maxAssets, setMaxAssets] = useState(0);
  const [maxSales, setMaxSales] = useState(0);
  const [maxPAT, setMaxPAT] = useState(0);
  const navigate = useNavigate();

  const handleMarketCapChange = (event) => {
    const value = parseFloat(event.target.value);
    setMarketCap(value);
    const returnObject = calculateRange(value, marketRange);
    setMinMarketCap(returnObject.min);
    setMaxMarketCap(returnObject.max);
  };

  const handleAssetsChange = (event) => {
    const value = parseFloat(event.target.value);
    setTotalAssets(value);
    const returnObject = calculateRange(value, assetsRange);
    setMinAssets(returnObject.min);
    setMaxAssets(returnObject.max);
  };

  const handleSalesChange = (event) => {
    const value = parseFloat(event.target.value);
    setSales(value);
    const returnObject = calculateRange(value, salesRange);
    setMinSales(returnObject.min);
    setMaxSales(returnObject.max);
  };

  const handlePATChange = (event) => {
    const value = parseFloat(event.target.value);
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
        navigate("/role-information");
      })
      .catch((err) => console.log(err));
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
        <p className="text-primary">Select desired range for each entry</p>
        <div
          style={{ transition: "all 0.5s ease" }}
          className="mb-3 p-0 p-lg-3  col-12 col-lg-6 text-left bg-light pt-2"
        >
          <div className="d-lg-flex">
            <div class=" d-flex col-lg-9 col-12 form-group">
              <label className="w-100">Market Capitalization</label>
              <input
                required
                type="number"
                name="market"
                class="form-control"
                id="market"
                placeholder="Enter"
                onChange={handleMarketCapChange}
              />
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
              Value range : {minMarketCap} - {maxMarketCap}
            </label>
          </div>
        </div>
        <div className="mb-3 p-0 p-lg-3  col-12 col-lg-6 text-left bg-light pt-2">
          <div className="d-lg-flex">
            <div class=" d-flex col-lg-9 col-12 form-group">
              <label className="w-100">Total Assets </label>
              <input
                required
                type="number"
                name="Assets"
                class="form-control"
                id="Assets"
                placeholder="Enter"
                onChange={handleAssetsChange}
              />
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
              Value range : {minAssets} - {maxAssets}
            </label>
          </div>
        </div>
        <div className="mb-3 p-0 p-lg-3  col-12 col-lg-6 text-left bg-light pt-2">
          <div className="d-lg-flex">
            <div class=" d-flex col-lg-9 col-12 form-group">
              <label className="w-100">Sales </label>
              <input
                required
                type="number"
                name="Sales"
                class="form-control"
                id="Sales"
                placeholder="Enter"
                onChange={handleSalesChange}
              />
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
              Value range : {minSales} - {maxSales}
            </label>
          </div>
        </div>
        <div className="mb-3 p-0 p-lg-3  col-12 col-lg-6 text-left bg-light pt-2">
          <div className="d-lg-flex">
            <div class=" d-flex col-lg-9 col-12 form-group">
              <label className="w-100">Profile After Tax </label>
              <input
                required
                type="number"
                name="Profile After Tax"
                class="form-control"
                id="Profile After Tax"
                placeholder="Enter"
                onChange={handlePATChange}
              />
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
              Value range : {minPAT} - {maxPAT}
            </label>
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
export default HandSelectedPeers;

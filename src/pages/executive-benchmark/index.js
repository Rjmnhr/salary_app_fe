import React, { useEffect, useState } from "react";
import Fraction from "fraction.js";
import AxiosInstance from "../../components/axios";
import { Select } from "antd";
import NavBar from "../../components/nav-bar";
import { useNavigate } from "react-router-dom";

const BasedOnIndex = () => {
  return (
    <div>
      <h3>This option will be available soon</h3>
    </div>
  );
};

const HandSelectedPeers = () => {
  const [marketCap, setMarketCap] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [sales, setSales] = useState(0);
  const [pat, setPat] = useState(0);
  const [assetsRange, setAssetsRange] = useState("1/2 - 2");
  const [salesRange, setSalesRange] = useState("1/2 - 2");
  const [patRange, setPatRange] = useState("1/2 - 2");
  const [marketRange, setMarketRange] = useState("1/2 - 2");
  const [industries, setIndustries] = useState(null);
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
    return { min, max };
  };

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

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("industries[]", selectedIndustries);

    formData.append("minMarketCap", minMarketCap);
    formData.append("maxMarketCap", maxMarketCap);

    formData.append("minAssets", minAssets);
    formData.append("maxAssets", maxAssets);

    formData.append("minSales", minSales);
    formData.append("maxSales", maxSales);

    formData.append("minPAT", minPAT);
    formData.append("maxPAT", maxPAT);

    AxiosInstance.post("/api/benchmark/companies", formData, {
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
        navigate("/role-information");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (value) => {
    setSelectedIndustries(value);
  };
  return (
    <div className="container-fluid">
      <div
        className="w-100 mt-5"
        style={{ display: "grid", placeItems: "center" }}
      >
        <div className="mb-3 d-flex col-12 col-lg-6 text-left">
          <div class=" d-flex col-9 form-group">
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

          <div class="col-3 form-group">
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
        <div className="mb-3 d-flex col-12 col-lg-6 text-left">
          <div class=" d-flex col-9 form-group">
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

          <div class="col-3 form-group">
            <select
              required
              type="number"
              name="market-range"
              class="form-control"
              id="market-range"
              placeholder="Enter"
              value={marketRange}
              onChange={handleAssetsRangeChange}
            >
              <option value="1/2 - 2">1/2 - 2</option>
              <option value="1/3 - 3">1/3 - 3</option>
              <option value="1/4 - 4">1/4 - 4</option>
            </select>
          </div>
        </div>
        <div className="mb-3 d-flex col-12 col-lg-6 text-left">
          <div class=" d-flex col-9 form-group">
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

          <div class="col-3 form-group">
            <select
              required
              type="number"
              name="market-range"
              class="form-control"
              id="market-range"
              placeholder="Enter"
              value={marketRange}
              onChange={handleSalesRangeChange}
            >
              <option value="1/2 - 2">1/2 - 2</option>
              <option value="1/3 - 3">1/3 - 3</option>
              <option value="1/4 - 4">1/4 - 4</option>
            </select>
          </div>
        </div>
        <div className="mb-3 d-flex col-12 col-lg-6 text-left">
          <div class=" d-flex col-9 form-group">
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

          <div class="col-3 form-group">
            <select
              required
              type="number"
              name="market-range"
              class="form-control"
              id="market-range"
              placeholder="Enter"
              value={marketRange}
              onChange={handlePATRangeChange}
            >
              <option value="1/2 - 2">1/2 - 2</option>
              <option value="1/3 - 3">1/3 - 3</option>
              <option value="1/4 - 4">1/4 - 4</option>
            </select>
          </div>
        </div>
        <div className="mb-3 d-flex col-12 col-lg-6 text-left">
          <div class=" d-flex col form-group">
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
          <HandSelectedPeers />
        ) : (
          <BasedOnIndex />
        )}
      </div>
    </>
  );
}

export default ExecutiveBenchmark;

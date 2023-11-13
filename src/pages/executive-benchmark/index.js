import React, { useEffect, useState } from "react";

import AxiosInstance from "../../components/axios";

import NavBar from "../../components/nav-bar";

import HandSelectedPeers from "../../components/benchmark-options/hand-selected-peers";
import BasedOnIndex from "../../components/benchmark-options/based-on-index";
import HandSelectedCompanies from "../../components/benchmark-options/hand-selected-companies";

const DefaultComponent = () => {
  return (
    <div className="container-fluid p-0 p-lg-3">
      <div
        className="w-100 mt-3"
        style={{ display: "grid", placeItems: "center" }}
      >
        <h3>No options are chose </h3>
        <h>Please select one</h>
      </div>
    </div>
  );
};

function ExecutiveBenchmark() {
  const [selectedOption, setSelectedOption] = useState("HandSelectedPeers");
  const [sectors, setSectors] = useState(null);

  useEffect(() => {
    AxiosInstance.get("/api/benchmark/sectors")
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
            <div>
              <input
                type="radio"
                value="HandSelectedCompanies"
                checked={selectedOption === "HandSelectedCompanies"}
                onChange={handleRadioChange}
                style={{ marginRight: "8px" }}
              />
              <label>Hand selected Companies</label>
            </div>
          </div>
        </div>

        {selectedOption === "HandSelectedPeers" ? (
          <HandSelectedPeers sectors={sectors} />
        ) : selectedOption === "BasedOnIndex" ? (
          <BasedOnIndex sectors={sectors} />
        ) : selectedOption === "HandSelectedCompanies" ? (
          <HandSelectedCompanies sectors={sectors} />
        ) : (
          // Default case, you can render a default component or handle it as needed
          <DefaultComponent />
        )}
      </div>
    </>
  );
}

export default ExecutiveBenchmark;

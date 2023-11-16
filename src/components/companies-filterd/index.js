import { Table } from "antd";

import React, { useEffect, useState } from "react";
import { CompaniesFilteredStyled } from "./style";
import NavBar from "../nav-bar";
import HandSelectedPeers from "../benchmark-options/hand-selected-peers";
import AxiosInstance from "../axios";
import BasedOnIndex from "../benchmark-options/based-on-index";
import { useNavigate } from "react-router-dom";
const TableComponent = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const storeOption = sessionStorage.getItem("option");

  const navigate = useNavigate();

  const data = JSON.parse(sessionStorage.getItem("companies"));

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

  useEffect(() => {
    // Initially, select all rows and store them in the selectedCompanies state
    const initialSelectedRowKeys = data.map((_, index) => index);
    setSelectedRowKeys(initialSelectedRowKeys);
    setSelectedCompanies(data);
    //eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Companies",
      dataIndex: "companies",
    },
  ];

  const formattedData = data.map((element, index) => {
    return { key: index, companies: element.company_name };
  });

  const onSelectChange = (newSelectedRowKeys) => {
    const updatedSelectedCompanies = newSelectedRowKeys.map(
      (index) => data[index]
    );
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedCompanies(updatedSelectedCompanies);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleContinue = () => {
    sessionStorage.setItem(
      "companies-selected",
      JSON.stringify(selectedCompanies)
    );
    navigate("/role-information");
  };

  return (
    <>
      <NavBar />
      <div style={{ marginTop: "80px" }}>
        <CompaniesFilteredStyled>
          {data?.length > 0 ? (
            <div
              className="p-3 "
              style={{ display: "grid", justifyItems: "center" }}
            >
              <h3>List of companies based on your selection </h3>
              <p>
                You have the option to deselect any company that you do not wish
                to include in the analysis.
              </p>
              <div className="col-lg-10 col-12 " style={{ minHeight: "40vh" }}>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={formattedData}
                />
              </div>

              <button
                onClick={handleContinue}
                className="btn w-25 btn-primary mt-3"
              >
                Continue
              </button>
            </div>
          ) : (
            <>
              <div
                className="p-3 "
                style={{ display: "grid", justifyItems: "center" }}
              >
                <h3>No companies has selected based on your selection </h3>
                <p>Try giving different inputs</p>
                {storeOption === "index" ? (
                  <BasedOnIndex sectors={sectors} />
                ) : (
                  <HandSelectedPeers sectors={sectors} />
                )}
              </div>
            </>
          )}
        </CompaniesFilteredStyled>
      </div>
    </>
  );
};

export default TableComponent;

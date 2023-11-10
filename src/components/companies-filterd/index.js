import { Table } from "antd";

import React, { useEffect, useState } from "react";
import { CompaniesFilteredStyled } from "./style";
import { BasedOnIndex } from "../../pages/executive-benchmark";
import HandSelectedPeers from "../hand-selected-peers";
import AxiosInstance from "../axios";
const TableComponent = ({ showModal }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const storeOption = sessionStorage.getItem("option");

  const data = JSON.parse(sessionStorage.getItem("companies"));

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
    return { key: index, companies: element };
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
    showModal();
  };

  return (
    <div>
      <CompaniesFilteredStyled>
        {data?.length > 0 ? (
          <div
            className="p-3 "
            style={{ display: "grid", justifyItems: "center" }}
          >
            <h3>List of companies based on your selection </h3>
            <p>
              You have the option to deselect any company that you do not wish
              to include in the analysis. Your thoughtful consideration is
              appreciated
            </p>
            <div className="col-lg-10 col-12 " style={{ minHeight: "40vh" }}>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={formattedData}
              />
            </div>

            <button onClick={handleContinue} className="btn btn-primary mt-3">
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
                <BasedOnIndex industries={industries} />
              ) : (
                <HandSelectedPeers industries={industries} />
              )}
            </div>
          </>
        )}
      </CompaniesFilteredStyled>
    </div>
  );
};

export default TableComponent;

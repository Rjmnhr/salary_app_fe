import { Table } from "antd";

import React, { useEffect, useState } from "react";
import { CompaniesFilteredStyled } from "./style";
const TableComponent = ({ showModal }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const data = JSON.parse(sessionStorage.getItem("companies"));

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
          ""
        )}
      </CompaniesFilteredStyled>
    </div>
  );
};

export default TableComponent;

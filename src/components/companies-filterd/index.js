import { Table } from "antd";

import React, { useEffect, useState } from "react";
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
    sessionStorage.setItem("companies", JSON.stringify(selectedCompanies));
    showModal();
  };

  return (
    <div>
      {data?.length > 0 ? (
        <div
          className="p-3 "
          style={{ display: "grid", justifyItems: "center" }}
        >
          <h3>List of companies based on your selection </h3>
          <div className="col-10 vh-80">
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
    </div>
  );
};

export default TableComponent;

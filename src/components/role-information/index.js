import React, { useState } from "react";
import AxiosInstance from "../axios";
import { Select } from "antd";

import NavBar from "../../components/nav-bar";
import { useNavigate } from "react-router-dom";

export const availableRoles = [
  "CMD - Chairperson & Managing Director",
  "Managing Director",
  "Other Director",
  "CFO - Chief Financial Officer",
  "Company Secretary",
  "Chairperson",
  "Nominee Director",
  "CEO - Chief Executive Officer",
];

const RoleInformation = () => {
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const companiesStored = JSON.parse(
    sessionStorage.getItem("companies-selected")
  );

  const filteredCompanyList = companiesStored.map((data) => data.company_name);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("role", role);
    formData.append("companies", filteredCompanyList?.join(","));
    AxiosInstance.post("api/benchmark/data", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;
        get2021Data();
        get2022Data();
        sessionStorage.setItem("result-data", JSON.stringify(response));
        sessionStorage.setItem("role", role);
        navigate("/output");
      })
      .catch((err) => console.log(err));
  };

  const get2021Data = () => {
    const filteredSymbolList = companiesStored.map((data) => data.nse_symbol);
    const formData = new FormData();

    formData.append("role", role);
    formData.append("symbols", filteredSymbolList?.join(","));
    formData.append("companies", filteredCompanyList?.join(","));
    AxiosInstance.post("api/benchmark/data/2021", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;
        console.log("🚀 ~ file: index.js:70 ~ .then ~ response:", response);
        sessionStorage.setItem("result-data_2021", JSON.stringify(response));
      })
      .catch((err) => console.log(err));
  };
  const get2022Data = () => {
    const filteredSymbolList = companiesStored.map((data) => data.nse_symbol);
    const formData = new FormData();

    formData.append("role", role);
    formData.append("symbols", filteredSymbolList?.join(","));
    formData.append("companies", filteredCompanyList?.join(","));
    AxiosInstance.post("api/benchmark/data/2022", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;
        console.log("🚀 ~ file: index.js:70 ~ .then ~ response:", response);
        sessionStorage.setItem("result-data_2022", JSON.stringify(response));
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (value) => {
    setRole(value);
  };

  return (
    <>
      <NavBar />
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "50vh",
          marginTop: "100px",
        }}
      >
        <div
          class="container text-left p-5 mt-lg-5 mt-2"
          style={{ display: "grid", justifyItems: "center" }}
        >
          <h4 className="mb-3 col-12 col-lg-6 pl-0 text-left">
            Choose any job role to continue
          </h4>
          <form
            onSubmit={handleSubmit}
            class="php-email-form col-12 col-lg-6 p-0"
          >
            <Select
              placeholder="Select"
              className="select-antd" // Add a custom class for styling
              style={{
                width: "100%",
                border: "1px solid #ced4da",
                paddingLeft: "10px",
                outline: "none",
                background: "white",
              }}
              onChange={handleChange}
              options={(availableRoles || []).map((d) => ({
                value: d,
                label: d,
              }))}
            />
            <br />
            <button type="submit" className="btn w-50 mt-3 btn-primary">
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RoleInformation;

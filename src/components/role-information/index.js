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
  "Others",
  "Chairperson Emeritus / Mentor",
  "COO - Chief Operating Officer",
  "Finance",
  "Compliance Officer",
];

const RoleInformation = () => {
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const companiesStored = JSON.parse(
      sessionStorage.getItem("companies-selected")
    );
    formData.append("role", role);
    formData.append("companies", companiesStored?.join(","));
    AxiosInstance.post("api/benchmark/data", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;
        sessionStorage.setItem("result-data", JSON.stringify(response));
        sessionStorage.setItem("role", role);
        navigate("/output");
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
        <div class="container  text-left p-5 mt-lg-5 mt-2">
          <h4 className="mb-3">Choose any job role to continue</h4>
          <form
            onSubmit={handleSubmit}
            class="php-email-form col-12 col-lg-6 p-0"
          >
            <Select
              placeholder="Select"
              className="border"
              style={{
                width: "100%",
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

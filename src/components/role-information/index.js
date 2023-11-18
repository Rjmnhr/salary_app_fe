import React, { useState } from "react";

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
    sessionStorage.setItem("role", role);
    navigate("/output");
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
            {role ? (
              <button type="submit" className="btn w-50 mt-3 btn-primary">
                Next
              </button>
            ) : (
              <button
                disabled
                type="submit"
                className="btn w-50 mt-3 btn-primary"
              >
                Next
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default RoleInformation;

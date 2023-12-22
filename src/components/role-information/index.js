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
];

const roleTypeMap = {
  "CMD - Chairperson & Managing Director": "Executive",
  "Managing Director": "Executive",
  "Other Director": "Non-executive",
  "CFO - Chief Financial Officer": "Executive",
  "Company Secretary": "Executive",
  Chairperson: "Non-executive",
  "Nominee Director": "Non-executive",
  "CEO - Chief Executive Officer": "Executive",
};

const RoleInformation = () => {
  const [role, setRole] = useState("");
  const [roleType, setRoleType] = useState(""); // New state for role type

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("roleType", roleType); // Store the role type in session storage
    navigate("/output");
  };

  const handleChange = (value) => {
    setRole(value);
    // Set the corresponding role type based on the selected role
    setRoleType(roleTypeMap[value]);
  };

  return (
    <>
      <NavBar />
      <div style={{ marginTop: "100px",
          background:"#5783db",
          color:"white",
          height: "90vh",}}>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "50vh",
         
        }}
      >
        <div
          className="container text-left p-5 mt-lg-5 mt-2"
          style={{ display: "grid", justifyItems: "center" }}
        >
          <h4 className="mb-3 col-12 col-lg-6 pl-0 text-left">
            Choose any job role to continue
          </h4>
          <form
            onSubmit={handleSubmit}
            className="php-email-form col-12 col-lg-6 p-0"
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
                height:"50px"
              }}
              onChange={handleChange}
              options={(availableRoles || []).map((d) => ({
                value: d,
                label: d,
              }))}
            />
            <br />
            {role ? (
              <button style={{background:"white"}} type="submit" className="btn w-50 mt-3 btn-lg ">
                Next
              </button>
            ) : (
              <button
              style={{background:"white"}}
                disabled
                type="submit"
                className="btn w-50 mt-3 btn-lg"
              >
                Next
              </button>
            )}
          </form>
        </div>
      </div>
      </div>
   
    </>
  );
};

export default RoleInformation;

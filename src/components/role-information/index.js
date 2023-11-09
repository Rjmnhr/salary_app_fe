import React, { useState } from "react";
import AxiosInstance from "../axios";
import { Modal, Select } from "antd";
import TableComponent from "../companies-filterd";
import NavBar from "../../components/nav-bar";
import { useNavigate } from "react-router-dom";

const RoleInformation = () => {
  const [role, setRole] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
  const availableRoles = [
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
  return (
    <>
      <NavBar />
      <div style={{ marginTop: "80px" }}>
        <Modal
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null} // To remove footer buttons
          centered
        >
          <form onSubmit={handleSubmit}>
            <h4 className="mb-3">Choose job role</h4>
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
            <button type="submit" className="btn mt-3 btn-primary">
              Next
            </button>
          </form>
        </Modal>

        <TableComponent showModal={showModal} />
      </div>
    </>
  );
};

export default RoleInformation;

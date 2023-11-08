import React, { useState } from "react";
import AxiosInstance from "../axios";
import { Modal } from "antd";
import TableComponent from "../companies-filterd";
import NavBar from "../../components/nav-bar";

const RoleInformation = () => {
  const [role, setRole] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const companiesStored = JSON.parse(sessionStorage.getItem("companies"));
    formData.append("role", role);
    formData.append("companies[]", companiesStored);
    AxiosInstance.post("api/benchmark/data", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;
        console.log(
          "🚀 ~ file: index.js:15 ~ AxiosInstance.post ~ response:",
          response
        );
      })
      .catch((err) => console.log(err));
  };
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
            <h3>Choose the job role</h3>
            <select onChange={(e) => setRole(e.target.value)}>
              <option value="CMD - Chairperson & Managing Director">
                CMD - Chairperson & Managing Director
              </option>
              <option value="Managing Director">Managing Director</option>
              <option value="Other Director">Other Director</option>
              <option value="CFO - Chief Financial Officer">
                CFO - Chief Financial Officer
              </option>
              <option value="Company Secretary">Company Secretary</option>
              <option value="Chairperson">Chairperson</option>
              <option value="Nominee Director">Nominee Director</option>
              <option value="CEO - Chief Executive Officer">
                CEO - Chief Executive Officer
              </option>
              <option value="Others">Others</option>
              <option value="Chairperson Emeritus / Mentor">
                Chairperson Emeritus / Mentor
              </option>
              <option value="COO - Chief Operating Officer">
                COO - Chief Operating Officer
              </option>
              <option value="Finance">Finance</option>
              <option value="Compliance Officer">Compliance Officer</option>
            </select>
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

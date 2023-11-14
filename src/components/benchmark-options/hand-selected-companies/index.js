import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../axios";
import { availableRoles } from "../../role-information";

const HandSelectedCompanies = ({ sectors }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const [selectedCompaniesList, setSelectedCompaniesList] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleRowClick = (selectedCompany) => {
    // Remove selected company from companies array
    const updatedCompanies = companies.filter(
      (company) => company !== selectedCompany
    );
    setCompanies(updatedCompanies);

    // Add selected company to selectedCompaniesList
    setSelectedCompaniesList((prevSelected) => [
      ...prevSelected,
      selectedCompany,
    ]);
  };

  useEffect(() => {
    AxiosInstance.get("api/benchmark/distinct-companies")
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
        setCompanies(uniqueArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (value) => {
    setRole(value);
  };

  const handleCompaniesChange = (value) => {
    setSelectedCompanies(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCompanies.length < 10) {
      showModal();
      return;
    }

    const formData = new FormData();

    formData.append("role", role);
    formData.append("companies", selectedCompanies?.join(","));
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

  return (
    <div className="container-fluid p-0 p-lg-3">
      <div
        className="w-100 mt-3"
        style={{ display: "grid", placeItems: "center" }}
      >
        <div className="mb-3 p-0 p-lg-3 d-lg-flex col-12 col-lg-6 text-left bg-light pt-2">
          <div class=" d-flex col-lg-9 col-12 form-group">
            <label className="w-100">Companies </label>
            <Select
              mode="multiple"
              className="select-antd" // Add a custom class for styling
              style={{
                width: "100%",
                border: "1px solid #ced4da",
                outline: "none",
              }}
              placeholder="Please select"
              onChange={handleCompaniesChange}
              options={(companies || []).map((d) => ({
                value: d,
                label: d,
              }))}
            />
          </div>
        </div>

        <div className="mb-3 p-0 p-lg-3  col-12 col-lg-6 text-left bg-light pt-2">
          <div class=" d-flex col-lg-9 col-12 form-group">
            <label className="w-100">Role </label>
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
          </div>
        </div>
      </div>
      <div className="mb-3">
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary mt-3 w-25"
        >
          Next
        </button>
      </div>

      <div className="row">
        <div className="col-6">
          <table
            className="table text-left scrollable-container"
            style={{ height: "80vh", overflowY: "scroll" }}
          >
            <thead>
              <tr>
                <th>List of companies</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((item, index) => (
                <tr key={index} onClick={() => handleRowClick(item)}>
                  <td style={{ padding: "0", cursor: "pointer" }}>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="col-6 scrollable-container"
          style={{ height: "80vh", overflowY: "scroll" }}
        >
          <table className="table text-left ">
            <thead>
              <tr>
                <th>Selected Companies</th>
              </tr>
            </thead>
            <tbody>
              {selectedCompaniesList.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: "0", cursor: "pointer" }}>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null} // To remove footer buttons
          centered
        >
          <h5>Please select at least 10 companies for meaningful analysis</h5>
        </Modal>
      </div>
    </div>
  );
};

export default HandSelectedCompanies;

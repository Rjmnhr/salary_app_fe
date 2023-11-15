import React, { useEffect, useState } from "react";
import { Input, Modal, Select } from "antd";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../axios";
import { availableRoles } from "../../role-information";

const HandSelectedCompanies = ({ sectors }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [companies, setCompanies] = useState([]);

  const [initialCompaniesOrder, setInitialCompaniesOrder] = useState([]);

  const [selectedCompaniesList, setSelectedCompaniesList] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterText, setFilterText] = useState("");

  const filteredCompanies = companies.filter((company) =>
    company.toLowerCase().includes(filterText.toLowerCase())
  );

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

  const handleRemoveCompany = (removedCompany) => {
    // Remove the company from the selectedCompaniesList
    const updatedSelectedCompaniesList = selectedCompaniesList.filter(
      (company) => company !== removedCompany
    );
    setSelectedCompaniesList(updatedSelectedCompaniesList);

    // Add the removed company back to the companies array maintaining the initial order
    setCompanies((prevCompanies) => {
      const updatedCompanies = [...prevCompanies, removedCompany];
      updatedCompanies.sort(
        (a, b) =>
          initialCompaniesOrder.indexOf(a) - initialCompaniesOrder.indexOf(b)
      );
      return updatedCompanies;
    });
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
        // Store the initial order of companies
        setInitialCompaniesOrder(uniqueArray);

        // Set the companies state for display
        setCompanies(uniqueArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (value) => {
    setRole(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCompaniesList.length < 10) {
      showModal();
      return;
    }

    const formData = new FormData();

    formData.append("role", role);
    formData.append("companies", selectedCompaniesList?.join(","));
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
      <div className="row mt-3">
        <div
          className="col-6"
          style={{
            height: "50vh", // Adjust the height as needed
            overflowY: "scroll",
          }}
        >
          <table className="table text-left scrollable-container">
            <thead style={{ position: "sticky", top: 0, background: "white" }}>
              <tr>
                <th className="d-md-flex flex-wrap justify-content-between align-items-center ">
                  List of companies
                  <Input
                    type="text"
                    style={{ width: "25%", border: "1px solid #ced4da" }}
                    className="mr-2"
                    placeholder="Search companies"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((item, index) => (
                <tr
                  style={{ width: "100%" }}
                  key={index}
                  onClick={() => handleRowClick(item)}
                >
                  <td
                    style={{ padding: "0", cursor: "pointer", width: "100%" }}
                  >
                    {item}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="col-6 scrollable-container"
          style={{ height: "50vh", overflowY: "scroll" }}
        >
          <table className="table text-left ">
            <thead>
              <tr>
                <th>
                  Selected Companies (
                  <span className="text-primary">
                    {selectedCompaniesList.length}
                  </span>
                  )
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedCompaniesList.length > 0 ? (
                selectedCompaniesList.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: "0", cursor: "pointer" }}>
                      {item}
                      {/* Add a remove button or cross button */}
                      <button
                        className="btn btn-link btn-sm"
                        onClick={() => handleRemoveCompany(item)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <div
                  style={{
                    display: "grid",
                    height: "30vh",
                    placeItems: "center",
                  }}
                >
                  <p>No companies selected</p>
                </div>
              )}
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
      <div className="w-100 " style={{ display: "grid", placeItems: "center" }}>
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
        {selectedCompaniesList.length > 0 && role ? (
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary mt-3 w-25"
          >
            Next
          </button>
        ) : (
          <button
            disabled
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary mt-3 w-25"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default HandSelectedCompanies;

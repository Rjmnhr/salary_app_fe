import React, { useEffect, useState } from "react";
import { Input, Modal, Select, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import { ArrowForward } from "@mui/icons-material";
import emptyBox from "../../../../icons/empty-box.png";
import AxiosInstance from "../../../../config/axios";
import { availableRoles, roleTypeMap } from "../../role-info";
const HandSelectedCompanies = ({ sectors }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [companies, setCompanies] = useState([]);
  const [roleType, setRoleType] = useState(""); // New state for role type
  const [initialCompaniesOrder, setInitialCompaniesOrder] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCompaniesList, setSelectedCompaniesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (value) => {
    setRole(value);
    setRoleType(roleTypeMap[value]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedCompaniesList.length < 10) {
      showModal();
      return;
    }

    const modifiedCompanyList = selectedCompaniesList.map((company) => ({
      company_name: company,
    }));
  
    sessionStorage.setItem(
      "companies-selected",
      JSON.stringify(modifiedCompanyList)
    );

    sessionStorage.setItem("option", "hand");
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("roleType", roleType); // Store the role type in session storage
    navigate("/output");
  };
  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px) to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add an event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="container p-0 p-lg-3" style={{ color: "white" }}>
      <div className="d-lg-flex mt-3">
        <div
          className="col-12 col-lg-6 border p-0 mx-lg-2 mb-3 mb-lg-0"
          style={{
            height: "50vh", // Adjust the height as needed
            overflowY: "scroll",
          }}
        >
          <table className="table  text-left scrollable-container   p-0">
            <thead
              style={{
                position: "sticky",
                top: 0,
                background: "white",
                color: "black",
              }}
            >
              <tr>
                <th className="d-md-flex flex-wrap justify-content-between align-items-center ">
                  List of companies
                  <Input
                    type="text"
                    style={{
                      border: "1px solid #ced4da",
                      width: `${isMobile ? "100%" : "50%"}`,
                    }}
                    className="mr-2  mt-1 mt-lg-0 !important"
                    placeholder="Search companies"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div
                  style={{
                    display: "grid",
                    height: "30vh",
                    justifyItems: "center",
                    alignContent: "center",
                  }}
                >
                  <Spin size="large" />

                  <p>Loadiing...</p>
                </div>
              ) : (
                filteredCompanies.map((item, index) => (
                  <tr
                    style={{ width: "100%" }}
                    key={index}
                    onClick={() => handleRowClick(item)}
                  >
                    <td
                      style={{
                        padding: "5px 10px",
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      {item}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div
          className="col-12 col-lg-6 scrollable-container  border p-0"
          style={{ height: "50vh", overflowY: "scroll" }}
        >
          <table className="table  text-left scrollable-container ">
            <thead
              style={{
                position: "sticky",
                top: 0,
                background: "white",
                color: "black",
              }}
            >
              <tr>
                <th className="p-3">
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
                    <td
                      style={{
                        padding: "5px 10px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {item}
                      {/* Add a remove button or cross button */}
                      <button
                        style={{ color: "black" }}
                        className="btn btn-link btn-sm"
                        onClick={() => handleRemoveCompany(item)}
                      >
                        {isMobile ? "x" : "Remove"}
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
                  <img src={emptyBox} alt="" height={100} width={100} />
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
      <div
        className="w-100 mt-3 d-lg-flex pl-lg-2"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <div className="mb-3 p-0 p-lg-3 mt-3  col-12 col-lg-6 text-left border pt-2 mr-lg-5">
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
        <div className="mb-3 ">
          {selectedCompaniesList.length > 0 && role ? (
            <button
              style={{
                marginBottom: `${isMobile ? "80px" : ""}`,
                width: `${isMobile ? "100%" : "520px"}`,
                height: `${isMobile ? "100%" : "80px"}`,
              }}
              onClick={handleSubmit}
              type="submit"
              className="btn btn-lg bg-light mt-3 d-flex align-items-center justify-content-between"
            >
              Next <ArrowForward />
            </button>
          ) : (
            <button
              style={{
                marginBottom: `${isMobile ? "80px" : ""}`,
                width: `${isMobile ? "100%" : "520px"}`,
                height: `${isMobile ? "100%" : "80px"}`,
              }}
              onClick={handleSubmit}
              type="submit"
              className="btn btn-lg bg-light mt-3 d-flex align-items-center justify-content-between"
              disabled
            >
              Next <ArrowForward />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandSelectedCompanies;

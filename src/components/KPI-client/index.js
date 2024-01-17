import { Select } from "antd";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../axios";
import { useNavigate } from "react-router-dom";

const KPIClientComponent = () => {
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    AxiosInstance.get("/api/kpi/sectors")
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
        setSectors(uniqueArray);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    AxiosInstance.get("/api/kpi/roles")
      .then(async (res) => {
        const response = await res.data;

        const roleGroupValues = response.map((item) => Object.values(item)[0]);

        // Filter out null and blank values
        const filteredValues = roleGroupValues.filter(
          (value) => value !== null && value.trim() !== ""
        );
        // Create a new Set to store unique values
        const uniqueSet = new Set(filteredValues);
        console.log("🚀 ~ .then ~ uniqueSet:", uniqueSet);

        // Convert the Set back to an array
        const uniqueArray = Array.from(uniqueSet);
        uniqueArray.sort();
        setAvailableRoles(uniqueArray);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSectorChange = (value) => {
    setSelectedSectors(value);
  };

  const handleRoleChange = (value) => {
    setRole(value);
    // Set the corresponding role type based on the selected role
  };

  const handleSubmit = () => {
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("sectors-selected", JSON.stringify(selectedSectors));
    navigate("/kpi-client-report");
  };
  return (
    <div className="">
      <div>
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
              Choose any job role and sector to continue
            </h4>
            <form
              onSubmit={handleSubmit}
              className="php-email-form col-12 col-lg-6 p-0"
            >
              <div className="my-3">
                <label>Role</label>

                <Select
                  placeholder="Select"
                  className="select-antd" // Add a custom class for styling
                  style={{
                    width: "100%",
                    border: "1px solid #ced4da",
                    paddingLeft: "10px",
                    outline: "none",
                    background: "white",
                    height: "50px",
                  }}
                  onChange={handleRoleChange}
                  options={(availableRoles || []).map((d) => ({
                    value: d,
                    label: d,
                  }))}
                />
              </div>

              <div className="my-3">
                <label>Sector</label>
                <Select
                  mode="multiple"
                  className="select-antd" // Add a custom class for styling
                  style={{
                    width: "100%",
                    border: "1px solid #ced4da",
                    outline: "none",
                    minHeight: "50px",
                    padding:"10px"
                  }}
                  placeholder="Select"
                  onChange={handleSectorChange}
                  options={(sectors || []).map((d) => ({
                    value: d,
                    label: d,
                  }))}
                />
              </div>

              {role && selectedSectors.length > 0 ? (
                <button
                  type="submit"
                  className="btn w-50 btn-primary mt-3 btn-lg "
                >
                  Next
                </button>
              ) : (
                <button
                  disabled
                  type="submit"
                  className="btn w-50  btn-primary mt-3 btn-lg"
                >
                  Next
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIClientComponent;

import React from "react";
import { Tabs } from "antd";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import NavBar from "../../components/nav-bar/index";
import "./style.css";

const ReportsPage = () => {
  const salaryData = JSON.parse(sessionStorage.getItem("salary_data"));
  console.log("🚀 ~ file: index.js:9 ~ ReportsPage ~ salaryData:", salaryData);
  const selectedSalary = sessionStorage.getItem("salary");
  const selectedJob = sessionStorage.getItem("job_title");
  const selectedLocation = sessionStorage.getItem("location");

  const filteredData = salaryData.filter(
    (data) =>
      data.mapped_job_title
        ?.toLowerCase()
        .includes(selectedJob.toLocaleLowerCase()) &&
      data.salary === selectedSalary
  );
  console.log(
    "🚀 ~ file: index.js:21 ~ ReportsPage ~ filteredData:",
    filteredData
  );

  const trimFilteredData = filteredData[0];

  // Use a regular expression to extract the numeric values
  const salaryValues = trimFilteredData.salary.match(/\d+/g);

  let minSalary = 0;
  let maxSalary = 0;

  // Ensure that we have at least two values (min and max)
  if (salaryValues && salaryValues.length >= 2) {
    minSalary = parseFloat(salaryValues[0]);
    maxSalary = parseFloat(salaryValues[1]);
  }

  // Split the locationString by commas and trim whitespace from each part
  const locations = trimFilteredData.location
    .split(",")
    .map((location) => location.trim());

  let displayLocation;

  if (locations.includes(selectedLocation)) {
    displayLocation = selectedLocation;
  } else {
    displayLocation = locations[0];
  }

  // Split the string into words
  const words = trimFilteredData.mapped_job_title.split(" ");

  // Capitalize the first letter of each word and make the rest lowercase
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // Join the words back together with spaces
  const capitalizedString = capitalizedWords.join(" ");
  return (
    <>
      <NavBar />

      <div
        className="container-fluid  d-lg-flex justify-content-center align-items-start"
        style={{ padding: "0" }}
      >
        <div
          className="container col-12 col-lg-2  side-bar border vh-5 vh-lg-100 "
          style={{ padding: "0" }}
        >
          <div className="container-fluid p-0 text-center">
            <Tabs
              style={{ width: "100%", textAlign: "center" }}
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Business",
                },
                {
                  key: "2",
                  label: "Personal",
                },
              ]}
            />
          </div>
          <div className="container-fluid d-none d-lg-block  p-0">
            <ul style={{ listStyle: "none", padding: "0" }}>
              <li className="p-3 border" style={{ background: "powderblue" }}>
                Reports
              </li>
            </ul>
          </div>
        </div>
        <div className="container-fluid p-3 col-12 col-lg-3  reports-list">
          <input className="form-control mb-3" placeholder="search" />
          <button className="btn btn-primary mb-3 w-100">
            Get More Reports
          </button>
          <div>
            <div className="card p-2 px-3 text-start">
              <p className="fw-b text-primary">{capitalizedString}</p>
              <div className="d-flex justify-content-start align-items-center">
                <p
                  className=" border-right px-2"
                  style={{ borderRight: "1px solid" }}
                >
                  <CalendarOutlined /> 1 year
                </p>
                <p className=" border-right px-2">
                  {" "}
                  <EnvironmentOutlined /> Bangalore
                </p>
              </div>
              <p
                style={{ fontSize: "10px", color: "gray", fontWeight: "bold" }}
              >
                BENCHMARKED JOB
              </p>
            </div>
          </div>
        </div>
        <div
          className="container-fluid col-12 col-lg-7  d-grid "
          style={{
            background: "rgba(0, 0, 0, 0.02)",
            height: "100vh",
            justifyItems: "center",
          }}
        >
          <div
            className="container col-11 m-3 p-3 text-start"
            style={{ background: "white", height: "100vh" }}
          >
            <h3>{capitalizedString} Report</h3>
            <div className="d-flex justify-content-start align-items-center">
              <p
                className=" border-right px-2"
                style={{ borderRight: "1px solid" }}
              >
                <CalendarOutlined /> Average Experience -{" "}
                {trimFilteredData["avg experience"]}
              </p>

              <p className=" border-right px-2">
                {" "}
                <EnvironmentOutlined /> {displayLocation}
              </p>
            </div>
            <div>
              <h5 className="mb-5">{trimFilteredData.comp_industry}</h5>
            </div>
            <div>
              <h5>Average Salary </h5>
              <p className="fs-3">
                ₹ {trimFilteredData.mapped_average_sal} Lakhs Per Annum
              </p>
              <div className="d-flex mb-3">
                <div style={{ height: "100px", width: "10%" }}>
                  <svg height="30" width="100%">
                    <defs>
                      <linearGradient
                        id="default-bar"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop style={{ stopColor: "#fff" }} />
                        <stop offset="100%" style={{ stopColor: "#e9e9ec" }} />
                      </linearGradient>
                    </defs>
                    <rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="url('#default-bar')"
                    ></rect>
                    Sorry, your browser does not support inline SVG.
                  </svg>
                </div>
                <div style={{ height: "100px", width: "15%" }}>
                  <div
                    style={{
                      height: "30px",
                      width: "100%",
                      background: "#f8a66e",
                    }}
                  ></div>
                  <div className="w-100 text-start mt-2">
                    <p
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      10%
                    </p>
                    <p style={{ fontWeight: "bold", color: "gray" }}>
                      {minSalary} LPA
                    </p>
                  </div>
                </div>
                ​{" "}
                <div style={{ height: "100px", width: "50%" }}>
                  <svg height="30" width="100%">
                    <defs>
                      <linearGradient
                        id="default-middleBar"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "#18969b", stopOpacity: 1 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: "#2d67b9", stopOpacity: 1 }}
                        />
                      </linearGradient>
                    </defs>
                    <rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="url('#default-middleBar')"
                    />
                    {/* Vertical dotted line in the middle */}
                    <line
                      x1="50%"
                      y1="0"
                      x2="50%"
                      y2="100%"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    Sorry, your browser does not support inline SVG.
                  </svg>
                  <div className="w-100 text-center mt-2">
                    <p
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      MEDIAN
                    </p>
                    <p style={{ fontWeight: "bold", color: "gray" }}>
                      {trimFilteredData.mapped_average_sal} LPA
                    </p>
                  </div>
                </div>
                <div style={{ height: "100px", width: "15%" }}>
                  <div
                    style={{
                      height: "30px",
                      width: "100%",
                      background: "#00aaa4",
                    }}
                  ></div>
                  <div className="w-100 text-end mt-2">
                    <p
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      90%
                    </p>
                    <p style={{ fontWeight: "bold", color: "gray" }}>
                      {maxSalary} LPA
                    </p>
                  </div>
                </div>
                <svg
                  height="30"
                  width="10%"
                  style={{ transform: "rotate(180deg)" }}
                >
                  <defs>
                    <linearGradient
                      id="default-bar"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop style={{ stopColor: "#fff" }} />
                      <stop offset="100%" style={{ stopColor: "#e9e9ec" }} />
                    </linearGradient>
                  </defs>
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url('#default-bar')"
                  ></rect>
                  Sorry, your browser does not support inline SVG.
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsPage;

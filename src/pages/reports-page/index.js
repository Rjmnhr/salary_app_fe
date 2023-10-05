import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import NavBar from "../../components/nav-bar/index";
import "./style.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  LineChart,
  Line,
} from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Helper function to calculate average salary
function calculateAverageSalary(data) {
  const salaries = data.map((job) => job.mapped_average_sal);
  const totalSalary = salaries.reduce((acc, val) => acc + val, 0);
  return totalSalary / salaries.length;
}

const GeneratedReport = ({ jobsData }) => {
  // Group job data by experience levels
  const experienceGroups = {
    Junior: jobsData.filter((job) => job["avg experience"] <= 2),
    MidLevel: jobsData.filter(
      (job) => job["avg experience"] > 2 && job["avg experience"] <= 5
    ),
    Senior: jobsData.filter((job) => job["avg experience"] > 5),
  };

  // Calculate average salary for each experience level
  const averageSalaries = {
    Junior: calculateAverageSalary(experienceGroups.Junior),
    MidLevel: calculateAverageSalary(experienceGroups.MidLevel),
    Senior: calculateAverageSalary(experienceGroups.Senior),
  };

  // Create data for the grouped bar chart
  const groupedBarChartData = Object.keys(averageSalaries).map(
    (experienceLevel) => ({
      experienceLevel,
      averageSalary: averageSalaries[experienceLevel],
    })
  );

  // Calculate average salary
  const salaries = jobsData.map((job) => job.mapped_average_sal);
  const totalSalary = salaries.reduce((acc, val) => acc + val, 0);
  const averageSalary = totalSalary / salaries.length;

  // Calculate median salary
  const sortedSalaries = [...salaries].sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedSalaries.length / 2);
  const medianSalary =
    sortedSalaries.length % 2 === 0
      ? (sortedSalaries[middleIndex - 1] + sortedSalaries[middleIndex]) / 2
      : sortedSalaries[middleIndex];

  // Calculate minimum and maximum salary
  const minSalary = Math.min(...salaries);
  const maxSalary = Math.max(...salaries);

  // Calculate average experience
  const experiences = jobsData.map((job) => job["avg experience"]);
  const totalExperience = experiences.reduce((acc, val) => acc + val, 0);
  const averageExperience = totalExperience / experiences.length;

  // Create data for the salary increment chart
  // const salaryIncrementData = jobsData.map((job, index) => ({
  //   job: job.mapped_job_title,
  //   increment: job.mapped_average_sal - averageSalary,
  // }));

  // Create data for the line chart (salary vs. experience)
  const lineChartData = jobsData.map((job) => ({
    experience: job["avg experience"],
    salary: job.mapped_average_sal,
  }));

  return (
    <>
      <div
        className="container col-11 m-3 p-3 text-left scrollable-container"
        style={{
          background: "white",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        <h3>Software Development Report</h3>
        <div className="d-flex justify-content-start align-items-center">
          <p
            className=" border-right px-2"
            style={{ borderRight: "1px solid" }}
          >
            <CalendarOutlined /> Average Experience - {averageExperience}
          </p>

          <p className=" border-right px-2">
            {" "}
            <EnvironmentOutlined /> Bangalore
          </p>
        </div>
        <div>{/* <h5 className="mb-5">{jobsData[0].comp_industry}</h5> */}</div>
        <div className="mt-3">
          <h5>Average Salary </h5>
          <p className="fs-3">₹ {averageSalary} Lakhs Per Annum</p>
          <div className="d-flex mb-3 mt-3">
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
                <p style={{ fontWeight: "bold", margin: "0", color: "gray" }}>
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
                <p style={{ fontWeight: "bold", margin: "0", color: "gray" }}>
                  MEDIAN
                </p>
                <p style={{ fontWeight: "bold", color: "gray" }}>
                  {medianSalary} LPA
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
                <p style={{ fontWeight: "bold", margin: "0", color: "gray" }}>
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

          <div className="text-center mt-3">
            <h4>Salary Chart</h4>
            <BarChart width={600} height={300} data={jobsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mapped_job_title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="mapped_average_sal" fill="#8884d8" />
              {/* Add reference lines for minimum, median, and maximum salaries */}
              <ReferenceLine
                y={averageSalary}
                stroke="green"
                strokeDasharray="3 3"
                label="Average"
              />
              <ReferenceLine
                y={medianSalary}
                stroke="blue"
                strokeDasharray="3 3"
                label="Median"
              />
              <ReferenceLine
                y={minSalary}
                stroke="red"
                strokeDasharray="3 3"
                label="Minimum"
              />
              <ReferenceLine
                y={maxSalary}
                stroke="orange"
                strokeDasharray="3 3"
                label="Maximum"
              />
            </BarChart>
            {/* Render other report components */}
          </div>
          <div className="text-center mt-3">
            <h4>Line Chart (Salary vs. Experience)</h4>
            <LineChart width={600} height={300} data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="experience"
                type="number"
                label="Experience (Years)"
              />
              <YAxis dataKey="salary" type="number" label="Salary ($)" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="salary"
                stroke="#8884d8"
                name="Salary"
              />
            </LineChart>
          </div>

          <div className="text-center mt-3">
            <h4>Grouped Bar Chart (Salary vs. Experience Level)</h4>
            <BarChart width={600} height={300} data={groupedBarChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="experienceLevel" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageSalary" fill="#8884d8" />
            </BarChart>
          </div>
          <div className="text-center mt-3">
            <h4>Grouped Line Chart (Salary vs. Experience Level)</h4>
            <LineChart width={600} height={300} data={groupedBarChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="experienceLevel" />
              <YAxis
                dataKey="averageSalary"
                type="number"
                label="averageSalary  "
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="averageSalary"
                stroke="#8884d8"
                name="averageSalary"
              />
            </LineChart>
          </div>
        </div>
      </div>
    </>
  );
};

const ReportsPage = () => {
  const navigate = useNavigate();
  const [salaryData, setSalaryData] = useState([]); // Store API responses here

  useEffect(() => {
    // Retrieve selected job titles and location from session storage
    const storedJobTitles = JSON.parse(
      sessionStorage.getItem("selectedJobTitles")
    );
    const storedLocation = sessionStorage.getItem("location");

    if (storedJobTitles && storedJobTitles.length > 0) {
      const fetchResponses = async () => {
        const jobTitleResponses = [];

        for (const jobTitle of storedJobTitles) {
          axios
            .post(
              "http://localhost:8003/api/salary/data",
              { location: storedLocation, job_title: jobTitle },
              {
                headers: {
                  "content-type": "application/json",
                },
              }
            )
            .then(async (response) => {
              const data = await response.data;
              jobTitleResponses.push(data);
              console.log(data);
            });
        }

        setSalaryData(jobTitleResponses);
      };

      fetchResponses();
    }

    //eslint-disable-next-line
  }, []);

  return (
    <>
      <NavBar />

      <div
        className="container-fluid  d-lg-flex justify-content-center align-items-start 
         "
        style={{ padding: "0", marginTop: "90px" }}
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
          <div className="container-fluid d-none d-lg-block vh-100  p-0">
            <ul style={{ listStyle: "none", padding: "0" }}>
              <li className="p-3 border" style={{ background: "powderblue" }}>
                Reports
              </li>
            </ul>
          </div>
        </div>
        <div className="container-fluid p-3 col-12 col-lg-3  reports-list">
          <input className="form-control mb-3" placeholder="search" />
          <button
            onClick={() => navigate("/price-a-job")}
            className="btn btn-primary mb-3 w-100"
          >
            Get More Reports
          </button>
          <div>
            <div className="card p-2 px-3 text-left">
              <p className="fw-b text-primary">Software Development</p>
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
          <GeneratedReport jobsData={salaryData} />
        </div>
      </div>
    </>
  );
};

export default ReportsPage;

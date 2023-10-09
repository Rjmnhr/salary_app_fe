import React, { useState, useEffect } from "react";
// import { Tabs } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
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

import AxiosInstance from "../../components/axios";
// import { format } from "date-fns"; // Import date-fns for date formatting

const CapitalizeFirstLetter = (data) => {
  // Split the string into words
  const words = data?.split(" ");
  // Capitalize the first letter of each word and make the rest lowercase
  const capitalizedWords = words?.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // Join the words back together with spaces
  return capitalizedWords?.join(" ");
};

// Helper function to calculate average salary
function calculateAverageSalary(data) {
  const salaries = data.map((job) => job.mapped_average_sal);
  const totalSalary = salaries.reduce((acc, val) => acc + val, 0);
  return totalSalary / salaries.length;
}

const GeneratedReport = ({ jobsData }) => {
  const storedLocation = sessionStorage.getItem("location");
  // Group job data by experience levels
  const experienceGroups = {
    Junior: jobsData?.filter((job) => job.avg_experience <= 2),
    MidLevel: jobsData?.filter(
      (job) => job.avg_experience > 2 && job.avg_experience <= 5
    ),
    Senior: jobsData?.filter((job) => job.avg_experience > 5),
  };

  const [chartWidth, setChartWidth] = useState(600);
  const [chartHeight, setChartHeight] = useState(300);

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
  const experiences = jobsData.map((job) => job.avg_experience);
  const totalExperience = experiences.reduce((acc, val) => acc + val, 0);
  const averageExperience = totalExperience / experiences.length;

  // Create data for the salary increment chart
  // const salaryIncrementData = jobsData.map((job, index) => ({
  //   job: job.mapped_job_title,
  //   increment: job.mapped_average_sal - averageSalary,
  // }));

  // Create data for the line chart (salary vs. experience)
  const lineChartData = jobsData.map((job) => ({
    experience: job.avg_experience,
    salary: job.mapped_average_sal,
  }));

  useEffect(() => {
    const updateChartSize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 912) {
        setChartWidth(300);
        setChartHeight(200);
      }
      if (screenWidth < 600) {
        setChartWidth(300);
        setChartHeight(150);
      } else {
        setChartWidth(600);
        setChartHeight(300);
      }
    };

    // Call the function to set initial size
    updateChartSize();

    // Add an event listener to check for window size changes
    window.addEventListener("resize", updateChartSize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", updateChartSize);
    };
  }, []);
  // // Group data by 'date' and calculate average salary
  // const groupedDataByDate = jobsData?.reduce((groups, item) => {
  //   const date = item.current_date;
  //   const salary = parseFloat(item.mapped_average_sal);

  //   if (!groups[date]) {
  //     groups[date] = [];
  //   }

  //   groups[date].push(salary);
  //   return groups;
  // }, {});

  // // Calculate average salary for each date
  // const trendDataByDate = Object.keys(groupedDataByDate).map(
  //   (formattedDate) => {
  //     const salaries = groupedDataByDate[formattedDate];
  //     const averageSalary =
  //       salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length;

  //     return {
  //       formattedDate: format(new Date(formattedDate), "MM/dd/yyyy"), // Format the date here
  //       averageSalary,
  //     };
  //   }
  // );

  return (
    <>
      {jobsData.length > 1 ? (
        <div
          className="container  col-lg-11 col-12 m-lg-3 m-2 p-lg-3 p-1 text-left scrollable-container"
          style={{
            background: "white",
            height: "100vh",
            overflowY: "scroll",
          }}
        >
          <h3>{CapitalizeFirstLetter(jobsData[0]?.mapped_job_title)} Report</h3>
          <div className="d-lg-flex justify-content-start align-items-center">
            <p
              className=" border-right px-2"
              style={{
                borderRight: "1px solid",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <CalendarOutlined /> Average Experience :{" "}
              {Math.round(averageExperience)} years
            </p>

            <p
              className=" border-right px-2"
              style={{ display: "flex", alignItems: "center", gap: "3px" }}
            >
              {" "}
              <EnvironmentOutlined /> {storedLocation}
            </p>
          </div>
          <div>
            {/* <h5 className="mb-5">{jobsData[0].comp_industry}</h5> */}
          </div>
          <div className="mt-3">
            <h5>Average Salary </h5>
            <p className="fs-3">₹ {averageSalary.toFixed(2)} Lakhs Per Annum</p>
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
                <div className="w-100 text-right mt-2">
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

            <div
              className="text-center mt-3"
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
              }}
            >
              <h5 className="">Salary Chart</h5>
              <BarChart width={chartWidth} height={chartHeight} data={jobsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis tick={null} dataKey="mapped_job_title_1" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="mapped_average_sal"
                  label="Average Salary"
                  fill="#8884d8"
                  name="Average Salary"
                />
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
            <div
              className="text-center mt-3"
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
              }}
            >
              <h4>Line Chart (Salary vs. Experience)</h4>
              <LineChart
                width={chartWidth}
                height={chartHeight}
                data={lineChartData}
              >
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
              {/* <LineChart
                width={600}
                height={300}
                data={trendDataByDate}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="formattedDate" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="averageSalary"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart> */}
            </div>

            <div
              className="text-center mt-3"
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
              }}
            >
              <h4>Grouped Bar Chart (Salary vs. Experience Level)</h4>
              <BarChart
                width={chartWidth}
                height={chartHeight}
                data={groupedBarChartData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="experienceLevel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="averageSalary"
                  name="Average Salary"
                  fill="#8884d8"
                />
              </BarChart>
            </div>
            <div
              className="text-center mt-3"
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
              }}
            >
              <h4>Grouped Line Chart (Salary vs. Experience Level)</h4>
              <LineChart
                width={chartWidth}
                height={chartHeight}
                data={groupedBarChartData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="experienceLevel" />
                <YAxis
                  dataKey="averageSalary"
                  type="number"
                  label="Average Salary  "
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="averageSalary"
                  stroke="#8884d8"
                  name="Average Salary"
                />
              </LineChart>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            justifyItems: "start",
            textAlign: "start",
          }}
          className="mt-1 mt-lg-3"
        >
          <div
            className="d-lg-flex justify-content-lg-start justify-content-center align-items-center p-3 text-lg-left text-center"
            style={{ background: "#fff" }}
          >
            <div>
              <h2>Your report was unsuccessful</h2>
              <p>
                Sorry! We haven't collected enough data yet to generate this
                report. Check back soon
              </p>
            </div>

            <img
              src="https://www.payscale.com/content/market-worth-promo@2x.png"
              alt=""
              height={200}
              width={300}
            />
          </div>
        </div>
      )}
    </>
  );
};

const ReportsPage = () => {
  const navigate = useNavigate();
  const [salaryData, setSalaryData] = useState([]); // Store API responses here
  const storedLocation = sessionStorage.getItem("location");
  const storedJobTitles = JSON.parse(
    sessionStorage.getItem("selectedJobTitles")
  );
  const storedExperience = sessionStorage.getItem("experience");
  const storedSkills = JSON.parse(sessionStorage.getItem("selected_skills"));
  const storedSupervise = sessionStorage.getItem("isSupervise");
  const storedManage = sessionStorage.getItem("isManage");

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Retrieve selected job titles and location from session storage
    const storedJobTitles = JSON.parse(
      sessionStorage.getItem("selectedJobTitles")
    );
    const storedLocation = sessionStorage.getItem("location");
    const storedSkills = JSON.parse(sessionStorage.getItem("selected_skills"));

    if (storedJobTitles && storedJobTitles.length > 0) {
      const fetchResponses = async () => {
        const jobTitleResponses = await Promise.all(
          storedJobTitles.map(async (jobTitle) => {
            const response = await AxiosInstance.post(
              "/api/salary/data",
              {
                location: storedLocation,
                job_title: jobTitle,
                skills: storedSkills,
                experience: storedExperience,
              },
              {
                headers: {
                  "content-type": "application/json",
                },
              }
            );
            return response.data;
          })
        );

        setSalaryData(jobTitleResponses);
      };

      fetchResponses();
    } else {
      navigate("/price-a-job");
    }

    //eslint-disable-next-line
  }, []);

  function SkillsList({ skills }) {
    return (
      <div>
        <p>
          <span>Skills :</span>{" "}
          <span style={{ fontSize: "14px" }}>
            {" "}
            {CapitalizeFirstLetter(skills.join(", "))}
          </span>
        </p>
      </div>
    );
  }

  const CapitalizeFirstLetter = (data) => {
    // Split the string into words
    const words = data?.split(" ");
    // Capitalize the first letter of each word and make the rest lowercase
    const capitalizedWords = words?.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

    // Join the words back together with spaces
    return capitalizedWords?.join(" ");
  };
  return (
    <>
      <NavBar />

      <div
        className="container-fluid  d-lg-flex justify-content-center align-items-start 
         "
        style={{ padding: "0", marginTop: "90px" }}
      >
        {/* <div
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
        </div> */}
        <div
          className="container-fluid p-3 col-12 col-lg-3 vh-lg-80 reports-list scrollable-container"
          style={{ overflowY: "scroll" }}
        >
          {/* <input className="form-control mb-3" placeholder="search" />
          <button
            onClick={() => navigate("/price-a-job")}
            className="btn btn-primary mb-3 w-100"
          >
            Get More Reports
          </button> */}

          <div>
            {storedJobTitles &&
              storedJobTitles.map((data, index) => {
                return (
                  <div
                    className={`card selectable-tab p-2 px-3 text-left mb-3 ${
                      activeIndex === index ? "selected-tab" : ""
                    }`}
                    key={data}
                    onClick={() => setActiveIndex(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <p
                      style={{ fontWeight: "500" }}
                      className="fw-b text-primary"
                    >
                      {data}
                    </p>
                    <div className="d-flex justify-content-start align-items-center">
                      <p
                        className=" border-right px-2"
                        style={{
                          borderRight: "1px solid",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <CalendarOutlined /> {storedExperience} years
                      </p>
                      <p
                        className=" border-right px-2"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        {" "}
                        <EnvironmentOutlined /> {storedLocation}
                      </p>
                    </div>
                    <div>
                      <SkillsList skills={storedSkills} />
                    </div>
                    <div>
                      <p>
                        Supervise employees :{" "}
                        <span style={{ fontSize: "14px" }}>
                          {storedSupervise}
                        </span>{" "}
                      </p>
                      <p>
                        Manage projects :{" "}
                        <span style={{ fontSize: "14px" }}>{storedManage}</span>{" "}
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: "10px",
                        color: "gray",
                        fontWeight: "bold",
                      }}
                    >
                      BENCHMARKED JOB
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        <div
          className="container-fluid col-12 col-lg-9  d-grid "
          style={{
            background: "rgba(0, 0, 0, 0.02)",
            height: "100vh",
            justifyItems: "center",
          }}
        >
          {salaryData.length > 0 ? (
            <GeneratedReport jobsData={salaryData[activeIndex]} />
          ) : (
            <div
              style={{ height: "80vh", display: "grid", placeItems: "center" }}
            >
              <h3>
                Your report is getting ready... <LoadingOutlined />{" "}
              </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReportsPage;

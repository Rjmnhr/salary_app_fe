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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
// import { RadialChart } from "react-vis";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";

import IconButton from "@mui/material/IconButton";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import AxiosInstance from "../../components/axios";
import JsPDF from "jspdf";
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

// // Helper function to calculate average salary
function calculateAverageSalary(data) {
  const salaries = data.map((job) => job.mapped_average_sal);
  const totalSalary = salaries.reduce((acc, val) => acc + val, 0);
  return (totalSalary / salaries.length).toFixed(2);
}

// // Helper function to calculate quartiles
// function calculateQuartile(data, percentile) {
//   const sortedData = [...data].sort((a, b) => a - b);
//   const index = Math.floor((sortedData.length - 1) * percentile);
//   const diff = (sortedData.length - 1) * percentile - index;
//   return sortedData[index] + diff * (sortedData[index + 1] - sortedData[index]);
// }

// // Helper function to categorize experience levels based on quartiles
// function categorizeExperienceLevels(data, firstQuartile, thirdQuartile) {
//   return data.map((job) => {
//     if (job.avg_experience <= firstQuartile) {
//       return { ...job, experienceLevel: "Junior" };
//     } else if (job.avg_experience <= thirdQuartile) {
//       return { ...job, experienceLevel: "MidLevel" };
//     } else {
//       return { ...job, experienceLevel: "Senior" };
//     }
//   });
// }

const generatePDF = () => {
  const report = new JsPDF("portrait", "pt", "a4");
  report.html(document.querySelector("#report")).then(() => {
    report.save("report.pdf");
  });
};
const GeneratedReport = ({
  jobsData,
  location,
  experience,
  jobsDataByRole,
}) => {
  console.log("🚀 ~ file: index.js:82 ~ jobsDataByRole:", jobsDataByRole);
  const [chartWidth, setChartWidth] = useState(600);
  const [chartHeight, setChartHeight] = useState(300);

  // Define a function to calculate statistics for a given dataset
  function calculateStatistics(data) {
    // Calculate average salary
    const salaries = data.map((job) => job.mapped_average_sal);
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

    // Calculate 10th and 90th percentile values
    const percentile25 =
      sortedSalaries[Math.floor(0.25 * sortedSalaries.length)];
    const percentile75 =
      sortedSalaries[Math.floor(0.75 * sortedSalaries.length)];

    return {
      averageSalary,
      medianSalary,
      minSalary,
      maxSalary,
      percentile25,
      percentile75,
    };
  }

  // Calculate statistics for jobsData
  const statisticsForJobsData = calculateStatistics(jobsData);

  // Calculate statistics for jobsDataByRole
  const statisticsForJobsDataByRole = calculateStatistics(jobsDataByRole);

  // // Calculate average experience
  // const experiences = jobsData.map((job) => job.avg_experience);

  // // Calculate quartiles to categorize experience levels
  // const firstQuartile = calculateQuartile(experiences, 0.25);
  // const thirdQuartile = calculateQuartile(experiences, 0.75);

  // // Categorize jobs based on quartiles
  // const experienceGroups = categorizeExperienceLevels(
  //   jobsData,
  //   firstQuartile,
  //   thirdQuartile
  // );

  const experienceGroupsAlter = {
    Junior: jobsDataByRole?.filter((job) => job.avg_experience <= 2),
    MidLevel: jobsDataByRole?.filter(
      (job) => job.avg_experience > 2 && job.avg_experience <= 5
    ),
    Senior: jobsDataByRole?.filter((job) => job.avg_experience > 5),
  };

  // Calculate average salary for each experience level
  const averageSalaries = {
    Junior: calculateAverageSalary(experienceGroupsAlter.Junior),
    MidLevel: calculateAverageSalary(experienceGroupsAlter.MidLevel),
    Senior: calculateAverageSalary(experienceGroupsAlter.Senior),
  };

  const groupedBarChartData = Object.keys(averageSalaries).map(
    (experienceLevel) => ({
      experienceLevel,
      averageSalary: averageSalaries[experienceLevel],
    })
  );
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

  // Step 1: Extract and count skills
  // Step 1: Extract and count skills
  const skillCounts = {};

  jobsData.forEach((item) => {
    const skills = item.combined_skills.split(",");
    skills.forEach((skill) => {
      skill = skill.trim(); // Remove leading/trailing spaces
      if (skillCounts[skill]) {
        skillCounts[skill]++;
      } else {
        skillCounts[skill] = 1;
      }
    });
  });

  // Step 2: Sort skills by count in descending order
  const sortedSkills = Object.keys(skillCounts).sort(
    (a, b) => skillCounts[b] - skillCounts[a]
  );

  // Step 3: Select the top 5 skills
  const topSkills = sortedSkills.slice(0, 5);

  const chartData = topSkills.map((skill) => ({
    name: skill,
    value: skillCounts[skill],
  }));

  const colors = ["#FF5733", "#33FFC3", "#3356FF", "#FF33E2", "#A133FF"]; // Specify colors for each segment

  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p>{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const PieChartComponent = () => {
    return (
      <div
        className="text-center mt-3"
        style={{
          display: "grid",
          justifyItems: "center",
          alignContent: "center",
        }}
      >
        <h4>Most Five Common Skills </h4>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            startAngle={90}
            endAngle={450}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            align="center"
            verticalAlign="bottom"
            height={36}
            iconSize={24}
            iconType="circle"
          />
        </PieChart>
      </div>
    );
  };
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
          id="report"
        >
          <div className="w-100 text-right">
            <button onClick={generatePDF} type="button">
              Export PDF
            </button>
          </div>

          <h3>
            {CapitalizeFirstLetter(jobsData[0]?.mapped_job_title)} Salary Report
          </h3>
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
              <CalendarOutlined /> Experience : {experience}
              years
            </p>

            <p
              className=" border-right px-2"
              style={{ display: "flex", alignItems: "center", gap: "3px" }}
            >
              {" "}
              <EnvironmentOutlined /> {location}
            </p>
          </div>
          <div>
            {/* <h5 className="mb-5">{jobsData[0].comp_industry}</h5> */}
          </div>
          <p
            style={{
              fontSize: "14px",
              textAlign: "center",
              display: "grid",
              placeItems: "center",
            }}
            className="text-primary"
          >
            The charts below only show data for roles in {location} with{" "}
            {experience} of experience. It doesn't show data for the skill(s)
            you have selected.
          </p>
          <div className="mt-3">
            <h5>Average Salary </h5>
            <p className="fs-3">
              ₹ {statisticsForJobsData.averageSalary.toFixed(2)} Lakhs Per Annum
              (LPA)
            </p>

            <p className="text-primary ">In {location}</p>
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
                <div className="w-100 text-start mt-2">
                  <p style={{ fontWeight: "bold", margin: "0", color: "gray" }}>
                    Min
                  </p>
                  <p style={{ fontWeight: "bold", color: "gray" }}>
                    {statisticsForJobsData.minSalary} LPA
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
                <div className="w-100 d-flex justify-content-between">
                  <div className="w-100 text-start mt-2">
                    <p
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      25 Percentile
                    </p>
                    <p style={{ fontWeight: "bold", color: "gray" }}>
                      {statisticsForJobsData.percentile25} LPA
                    </p>
                  </div>
                  <div className="w-100 text-center mt-2">
                    <p
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      MEDIAN
                    </p>
                    <p style={{ fontWeight: "bold", color: "gray" }}>
                      {statisticsForJobsData.medianSalary} LPA
                    </p>
                  </div>
                  <div className="w-100 text-right mt-2">
                    <p
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      75 Percentile
                    </p>
                    <p style={{ fontWeight: "bold", color: "gray" }}>
                      {statisticsForJobsData.percentile75} LPA
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ height: "100px", width: "15%" }}>
                <div
                  style={{
                    height: "30px",
                    width: "100%",
                    background: "#3b7dd8",
                  }}
                ></div>
              </div>
              <div style={{ height: "100px", width: "10%" }}>
                <svg
                  height="30"
                  width="100%"
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
                <div className="w-100 text-right mt-2">
                  <p style={{ fontWeight: "bold", margin: "0", color: "gray" }}>
                    Max
                  </p>
                  <p style={{ fontWeight: "bold", color: "gray" }}>
                    {statisticsForJobsData.maxSalary} LPA
                  </p>
                </div>
              </div>
            </div>
            <p className="text-primary ">Across India</p>
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
                <div className="w-100 text-start mt-2">
                  <p style={{ fontWeight: "bold", margin: "0", color: "gray" }}>
                    Min
                  </p>
                  <p style={{ fontWeight: "bold", color: "gray" }}>
                    {statisticsForJobsDataByRole.minSalary} LPA
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
                <div className="w-100 d-flex justify-content-between">
                  <div className="w-100 text-start mt-2">
                    <p
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      25 Percentile
                    </p>
                    <p style={{ fontWeight: "bold", color: "gray" }}>
                      {statisticsForJobsDataByRole.percentile25} LPA
                    </p>
                  </div>
                  <div className="w-100 text-center mt-2">
                    <p
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      MEDIAN
                    </p>
                    <p style={{ fontWeight: "bold", color: "gray" }}>
                      {statisticsForJobsDataByRole.medianSalary} LPA
                    </p>
                  </div>
                  <div className="w-100 text-right mt-2">
                    <p
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      75 Percentile
                    </p>
                    <p style={{ fontWeight: "bold", color: "gray" }}>
                      {statisticsForJobsDataByRole.percentile75} LPA
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ height: "100px", width: "15%" }}>
                <div
                  style={{
                    height: "30px",
                    width: "100%",
                    background: "#3b7dd8",
                  }}
                ></div>
              </div>
              <div style={{ height: "100px", width: "10%" }}>
                <svg
                  height="30"
                  width="100%"
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
                <div className="w-100 text-right mt-2">
                  <p style={{ fontWeight: "bold", margin: "0", color: "gray" }}>
                    Max
                  </p>
                  <p style={{ fontWeight: "bold", color: "gray" }}>
                    {statisticsForJobsDataByRole.maxSalary} LPA
                  </p>
                </div>
              </div>
            </div>

            <div
              className="text-center mt-3"
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
              }}
            >
              <h5 className="">Average Salary Chart</h5>
              <BarChart width={chartWidth} height={chartHeight} data={jobsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis tick={null} dataKey="mapped_job_title_1" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="mapped_average_sal"
                  label="Average Salary"
                  fill="#8884d8"
                  name="Average Salary"
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
              <h4>Average Salary vs Experience Level</h4>
              <LineChart
                width={chartWidth}
                height={chartHeight}
                data={lineChartData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="experience" type="number" />
                <YAxis dataKey="salary" type="number" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="salary"
                  stroke="none"
                  name="Salary"
                  dot={{ stroke: "#8884d8", strokeWidth: 2, fill: "#fff" }}
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
              <h4> Average Salary vs Grouped Experience Level</h4>
              <BarChart
                width={chartWidth}
                height={chartHeight}
                data={groupedBarChartData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="experienceLevel" />
                <YAxis />
                <Tooltip />

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
            ></div>

            <PieChartComponent />
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ReportsPage = () => {
  const [salaryData, setSalaryData] = useState([]); // Store API responses here
  const [dataArray, setDataArray] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [salaryDataByRole, setSalaryDataByRole] = useState([]);
  const storedLocation = sessionStorage.getItem("location");
  const storedJobTitles = JSON.parse(
    sessionStorage.getItem("selectedJobTitles")
  );
  const storedExperience = sessionStorage.getItem("experience");
  const storedSkills = JSON.parse(sessionStorage.getItem("selected_skills"));
  const storedSupervise = sessionStorage.getItem("isSupervise");
  const storedManage = sessionStorage.getItem("isManage");
  const storedUserID = localStorage.getItem("user_id");

  let saveTheReport = sessionStorage.getItem("saveTheReport") || "true";
  const [activeIndex, setActiveIndex] = useState(0);

  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  // Create a new array by mapping the jobTitles array
  const CreateArr = () => {
    const newArr = storedJobTitles.map((jobTitle) => ({
      job_titles: jobTitle,
      location: storedLocation,
      experience: Number(storedExperience),
      skills: sessionStorage.getItem("selected_skills"),
      manage: storedManage,
      supervise: storedSupervise,
    }));

    return newArr;
  };

  useEffect(() => {
    const createdArray = CreateArr();

    AxiosInstance.post(
      "/api/report/get",
      { user_id: storedUserID },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        const data = await response.data;

        // Use Set to store distinct objects
        const uniqueObjects = new Set(
          [...createdArray, ...data].map(JSON.stringify)
        );

        // Convert Set back to an array of objects
        const distinctArray = [...uniqueObjects].map(JSON.parse);

        setDataArray(distinctArray);
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (saveTheReport === "true") {
      if (storedJobTitles && storedUserID) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        saveTheReport = "false";
        saveReport();
      }
    }
    //eslint-disable-next-line
  }, []);

  const saveReport = async () => {
    if (storedJobTitles && storedJobTitles.length > 0) {
      await Promise.all(
        storedJobTitles.map(async (jobTitle) => {
          const formData = new FormData();
          formData.append("user_id", storedUserID);
          formData.append("job_titles", jobTitle);
          formData.append("experience", storedExperience);
          formData.append("skills", JSON.stringify(storedSkills));
          formData.append("location ", storedLocation);
          formData.append("manage", storedManage);
          formData.append("supervise", storedSupervise);

          const response = await AxiosInstance.post(
            "/api/report/save",
            formData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response.data);
        })
      );

      sessionStorage.setItem("saveTheReport", "false"); // Mark report as saved in localStorage
    }
  };

  useEffect(() => {
    if (dataArray && dataArray.length > 0) {
      const fetchResponses = async () => {
        const jobTitleResponses = await Promise.all(
          dataArray.map(async (data) => {
            const response = await AxiosInstance.post(
              "/api/salary/data/role",
              {
                job_title: data.job_titles,
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

        setSalaryDataByRole(jobTitleResponses);
        console.log(
          "🚀 ~ file: index.js:788 ~ fetchResponses ~ jobTitleResponses:",
          jobTitleResponses
        );
      };

      fetchResponses();
    }

    //eslint-disable-next-line
  }, [dataArray]);

  console.log(
    "🚀 ~ file: index.js:799 ~ ReportsPage ~ salaryDataByRole:",
    salaryDataByRole
  );

  useEffect(() => {
    if (dataArray && dataArray.length > 0) {
      const fetchResponses = async () => {
        const jobTitleResponses = await Promise.all(
          dataArray.map(async (data) => {
            const response = await AxiosInstance.post(
              "/api/salary/data",
              {
                location: data.location,
                job_title: data.job_titles,
                skills: JSON.parse(data.skills),
                experience: data.experience,
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
    }

    //eslint-disable-next-line
  }, [dataArray]);

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
          className="container-fluid p-3 col-12 col-lg-3  reports-list scrollable-container"
          style={{ overflowY: "scroll", maxHeight: "100vh" }}
        >
          {/* <input className="form-control mb-3" placeholder="search" />
          <button
            onClick={() => navigate("/price-a-job")}
            className="btn btn-primary mb-3 w-100"
          >
            Get More Reports
          </button> */}

          <div>
            {dataArray &&
              dataArray.map((data, index) => {
                return (
                  <Card
                    className={`card selectable-tab p-2 px-3 text-left mb-3 ${
                      activeIndex === index ? "selected-tab" : ""
                    }`}
                    key={data.report_id}
                    onClick={() => setActiveIndex(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <p
                      style={{ fontWeight: "500" }}
                      className="fw-b text-primary"
                    >
                      {data.job_titles}
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
                        <CalendarOutlined /> {data.experience} years
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
                        <EnvironmentOutlined /> {data.location}
                      </p>
                    </div>

                    <CardActions disableSpacing>
                      <p>See More</p>
                      <ExpandMore
                        expand={expanded[index] || false}
                        onClick={() => handleExpandClick(index)}
                        aria-expanded={expanded[index] || false}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse
                      in={expanded[index] || false}
                      timeout="auto"
                      unmountOnExit
                    >
                      <div>
                        <SkillsList skills={JSON.parse(data.skills)} />
                      </div>
                      <div>
                        <p>
                          Supervise employees :{" "}
                          <span style={{ fontSize: "14px" }}>
                            {data.supervise}
                          </span>{" "}
                        </p>
                        <p>
                          Manage projects :{" "}
                          <span style={{ fontSize: "14px" }}>
                            {data.manage}
                          </span>{" "}
                        </p>
                      </div>
                    </Collapse>
                  </Card>
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
          {salaryData.length > 0 && salaryDataByRole.length > 0 ? (
            <GeneratedReport
              jobsData={salaryData[activeIndex]}
              location={dataArray[activeIndex].location}
              experience={dataArray[activeIndex].experience}
              jobsDataByRole={salaryDataByRole[activeIndex]}
            />
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

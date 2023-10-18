import React, { useState, useEffect, useRef } from "react";
// import { Tabs } from "antd";
import {
  CalendarOutlined,
  DownloadOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import html2pdf from "html2pdf.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Label,
  Legend,
} from "recharts";
// import { RadialChart } from "react-vis";
import { Button, notification } from "antd";
import "./style.css";

import MedianSalaryChartForSkills from "../median_salary_for_skills";

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
  return (totalSalary / salaries.length)?.toFixed(2);
}

const decimalFix = (number) => {
  const trimmed = Math.floor(number * 100) / 100;
  return trimmed;
};

const GeneratedReport = ({
  jobsData,
  location,
  experience,
  jobsDataByRole,
  jobsDataNoExp,
  selectedSkills,
  skillsBool,
}) => {
  const [chartWidth, setChartWidth] = useState(600);
  const [pieChartWidth, setPieChartWidth] = useState(400);
  const [chartHeight, setChartHeight] = useState(300);
  const elementRef = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const DownloadButtonComponent = () => {
    const downloadButton = (
      <p
        style={{
          fontSize: "15px",
          position: "absolute",
          top: "0",
          right: "0",
          marginTop: "10px",
          marginRight: "10px",
        }}
        className="btn border"
        onClick={() => {
          setIsLoading(true);
          openNotification("topRight");
          generatePDF();
        }}
      >
        {" "}
        Download {isLoading ? <LoadingOutlined /> : <DownloadOutlined />}
      </p>
    );

    const mobileButton = (
      <Button
        type="primary"
        shape="circle"
        icon={isLoading ? <LoadingOutlined /> : <DownloadOutlined />}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "9999",
        }}
        onClick={() => {
          setIsLoading(true);
          openNotification("topRight");
          generatePDF();
        }}
      />
    );

    return isMobile ? mobileButton : downloadButton;
  };

  const openNotification = (placement) => {
    api.info({
      message: `Your report is getting downloaded`,

      placement,
    });
  };

  const generatePDF = () => {
    const element = elementRef.current;

    if (element) {
      const pdfOptions = {
        margin: 5,
        filename: `Equipay_${jobsData[0]?.mapped_job_title})_Salary_Report`,
        image: { type: "jpeg", quality: 1 }, // Maximum quality
        html2canvas: { scale: 3 }, // Higher scale for better quality
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      // eslint-disable-next-line
      html2pdf().from(element).set(pdfOptions).save();
      setIsLoading(false);
    } else {
      console.error("Element not found.");

      setIsLoading(false);
    }
  };
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

  const experienceGroupsAlter = {
    Junior: jobsDataNoExp?.filter((job) => job.avg_experience <= 2),
    MidLevel: jobsDataNoExp?.filter(
      (job) => job.avg_experience > 2 && job.avg_experience <= 5
    ),
    Senior: jobsDataNoExp?.filter((job) => job.avg_experience > 5),
  };

  // Calculate average salary for each experience level
  const averageSalaries = {
    "Junior (0-2 years)": calculateAverageSalary(experienceGroupsAlter.Junior),
    "MidLevel (3-6 years)": calculateAverageSalary(
      experienceGroupsAlter.MidLevel
    ),
    "Senior (Above 6 years)": calculateAverageSalary(
      experienceGroupsAlter.Senior
    ),
  };

  const groupedBarChartData = Object.keys(averageSalaries).map(
    (experienceLevel) => ({
      experienceLevel,
      averageSalary: averageSalaries[experienceLevel],
    })
  );

  // Create data for the line chart (salary vs. experience)
  const lineChartData = jobsDataNoExp.map((job) => ({
    experience: job.avg_experience,
    salary: job.mapped_average_sal,
  }));

  useEffect(() => {
    const updateChartSize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 912) {
        setChartWidth(300);
        setChartHeight(200);
        setPieChartWidth(300);
      }
      if (screenWidth < 600) {
        setChartWidth(300);
        setChartHeight(150);
        setPieChartWidth(200);
      } else {
        setChartWidth(600);
        setChartHeight(300);
        setPieChartWidth(400);
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

  const COLORS = ["#e08963", "#38908f", "#b2ebe0", "#5e96ae", "#ffbfa3"];

  // Calculate the total count of all skills
  const totalCount = chartData.reduce((total, skill) => total + skill.value, 0);

  // Calculate the percentages
  const chartDataWithPercentages = chartData.map((skill) => ({
    name: CapitalizeFirstLetter(skill.name),
    value: skill.value,
    percentage: ((skill.value / totalCount) * 100)?.toFixed(2), // Calculate percentage
  }));

  // Update the SimplePieChart component
  const SimplePieChart = () => {
    return (
      <div
        className="text-center mt-3"
        style={{
          display: "grid",
          justifyItems: "center",
          alignContent: "center",
        }}
      >
        <h5 className="mb-2">
          Most five common skills for {jobsData[0]?.mapped_job_title}{" "}
        </h5>
        <PieChart width={pieChartWidth} height={pieChartWidth}>
          <Pie
            data={chartDataWithPercentages}
            dataKey="value"
            cx={pieChartWidth / 2}
            cy={pieChartWidth / 2}
            outerRadius={pieChartWidth * 0.2}
            fill="#8884d8"
            label={({ percentage }) => `${percentage}%`} // Display name and percentage
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    );
  };

  const sortedJobsData = [...jobsData].sort(
    (a, b) => a.mapped_average_sal - b.mapped_average_sal
  );

  const sortedJobsDataByRole = [...jobsDataByRole].sort(
    (a, b) => a.mapped_average_sal - b.mapped_average_sal
  );

  return (
    <>
      {contextHolder}
      {jobsData.length > 1 ? (
        <div
          className="container  col-lg-11 col-12 m-lg-3 m-2 p-1 text-left scrollable-container"
          style={{
            background: "white",
            height: "100vh",
            overflowY: "scroll",
          }}
        >
          <DownloadButtonComponent />

          <div className="p-lg-3 p-1" ref={elementRef}>
            <h3>
              {CapitalizeFirstLetter(jobsData[0]?.mapped_job_title)} Salary
              Report
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
                <CalendarOutlined /> Experience : {experience} years
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
              {/* <h5 className="mb-2" className="mb-5">{jobsData[0].comp_industry}</h5> */}
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
              The charts below show data for roles in {location} with{" "}
              {experience} year(s) of experience{" "}
              {skillsBool !== null
                ? skillsBool
                  ? " and selected skill(s)"
                  : ". It doesn't show data for the skill(s) you have selected."
                : ""}
            </p>
            <div className="mt-3">
              <h5 className="mb-2">Average Salary </h5>
              <p className="fs-3">
                ₹ {decimalFix(statisticsForJobsData.averageSalary)} Lakhs Per
                Annum (LPA)
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
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      Min
                    </p>
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", color: "gray" }}
                    >
                      {decimalFix(statisticsForJobsData.minSalary)} LPA
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
                        className="stripe-text"
                        style={{
                          fontWeight: "bold",
                          margin: "0",
                          color: "gray",
                        }}
                      >
                        25th Percentile
                      </p>
                      <p
                        className="stripe-text"
                        style={{ fontWeight: "bold", color: "gray" }}
                      >
                        {decimalFix(statisticsForJobsData.percentile25)} LPA
                      </p>
                    </div>
                    <div className="w-100 text-center mt-2">
                      <p
                        className="stripe-text"
                        style={{
                          fontWeight: "bold",
                          margin: "0",
                          color: "gray",
                        }}
                      >
                        MEDIAN
                      </p>
                      <p
                        className="stripe-text"
                        style={{ fontWeight: "bold", color: "gray" }}
                      >
                        {decimalFix(statisticsForJobsData.medianSalary)} LPA
                      </p>
                    </div>
                    <div className="w-100 text-right mt-2">
                      <p
                        className="stripe-text"
                        style={{
                          fontWeight: "bold",
                          margin: "0",
                          color: "gray",
                        }}
                      >
                        75th Percentile
                      </p>
                      <p
                        className="stripe-text"
                        style={{ fontWeight: "bold", color: "gray" }}
                      >
                        {decimalFix(statisticsForJobsData.percentile75)} LPA
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
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      Max
                    </p>
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", color: "gray" }}
                    >
                      {decimalFix(statisticsForJobsData.maxSalary)} LPA
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
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      Min
                    </p>
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", color: "gray" }}
                    >
                      {decimalFix(statisticsForJobsDataByRole.minSalary)} LPA
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
                        className="stripe-text"
                        style={{
                          fontWeight: "bold",
                          margin: "0",
                          color: "gray",
                        }}
                      >
                        25th Percentile
                      </p>
                      <p
                        className="stripe-text"
                        style={{ fontWeight: "bold", color: "gray" }}
                      >
                        {decimalFix(statisticsForJobsDataByRole.percentile25)}{" "}
                        LPA
                      </p>
                    </div>
                    <div className="w-100 text-center mt-2">
                      <p
                        className="stripe-text"
                        style={{
                          fontWeight: "bold",
                          margin: "0",
                          color: "gray",
                        }}
                      >
                        MEDIAN
                      </p>
                      <p
                        className="stripe-text"
                        style={{ fontWeight: "bold", color: "gray" }}
                      >
                        {decimalFix(statisticsForJobsDataByRole.medianSalary)}{" "}
                        LPA
                      </p>
                    </div>
                    <div className="w-100 text-right mt-2">
                      <p
                        className="stripe-text"
                        style={{
                          fontWeight: "bold",
                          margin: "0",
                          color: "gray",
                        }}
                      >
                        75th Percentile
                      </p>
                      <p
                        className="stripe-text"
                        style={{ fontWeight: "bold", color: "gray" }}
                      >
                        {decimalFix(statisticsForJobsDataByRole.percentile75)}{" "}
                        LPA
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
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      Max
                    </p>
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", color: "gray" }}
                    >
                      {decimalFix(statisticsForJobsDataByRole.maxSalary)} LPA
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
                <p>
                  Salary for all individual roles mapped to{" "}
                  {jobsData[0]?.mapped_job_title} with {experience} year(s) of
                  experience in{" "}
                  <span className="text-primary"> {location}</span>
                </p>

                <LineChart
                  width={chartWidth}
                  height={chartHeight}
                  data={sortedJobsData}
                  style={{ pageBreakInside: "avoid" }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis tick={false} dataKey="mapped_job_title_1">
                    <Label
                      value={`Different Job Roles in ${jobsData[0]?.mapped_job_title}`}
                      style={{
                        textAnchor: "middle",
                        fontSize: "14px",
                        fill: "blue",
                        fontFamily: "Arial, sans-serif", // Adjust the font family here
                      }}
                    />
                  </XAxis>
                  <YAxis>
                    <Label
                      value="Salary (LPA)"
                      angle={-90}
                      position="insideLeft"
                      style={{
                        textAnchor: "middle",
                        fontSize: "14px",
                        fill: "blue",
                        fontFamily: "Arial, sans-serif", // Adjust the font family here
                      }}
                    />
                  </YAxis>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${name} : ${value} LPA`,
                    ]}
                    labelFormatter={() => <p></p>}
                  />

                  <Line
                    type="monotone"
                    dataKey="mapped_average_sal"
                    name="Salary"
                    stroke="#8884d8"
                    dot={false} // Disable data points
                  />
                </LineChart>
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
                <p>
                  Salary for all individual roles mapped to{" "}
                  {jobsData[0]?.mapped_job_title} with {experience} year(s) of
                  experience in <span className="text-primary"> India</span>
                </p>

                <LineChart
                  width={chartWidth}
                  height={chartHeight}
                  data={sortedJobsDataByRole}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis tick={false} dataKey="mapped_job_title_1">
                    <Label
                      value={`Different Job Roles in ${jobsData[0]?.mapped_job_title}`}
                      style={{
                        textAnchor: "middle",
                        fontSize: "14px",
                        fill: "blue",
                        fontFamily: "Arial, sans-serif", // Adjust the font family here
                      }}
                    />
                  </XAxis>
                  <YAxis>
                    <Label
                      value="Salary (LPA)"
                      angle={-90}
                      position="insideLeft"
                      style={{
                        textAnchor: "middle",
                        fontSize: "14px",
                        fill: "blue",
                        fontFamily: "Arial, sans-serif", // Adjust the font family here
                      }}
                    />
                  </YAxis>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${name} : ${value} LPA`,
                    ]}
                    labelFormatter={() => <p></p>}
                  />

                  <Line
                    type="monotone"
                    dataKey="mapped_average_sal"
                    name="Salary"
                    stroke="#8884d8"
                    dot={false} // Disable data points
                  />
                </LineChart>
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
                <h5 className="mb-2">Average Salary vs Experience Level</h5>
                <LineChart
                  width={chartWidth}
                  height={chartHeight}
                  data={lineChartData}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="experience"
                    type="number"
                    name="Experience"
                  ></XAxis>
                  <YAxis dataKey="salary" type="number" height={40}>
                    <Label
                      value="Average Salary (LPA)"
                      angle={-90}
                      position="insideLeft"
                      style={{
                        textAnchor: "middle",
                        fontSize: "14px",
                        fill: "blue",
                        fontFamily: "Arial, sans-serif", // Adjust the font family here
                      }}
                    />
                  </YAxis>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `Average Salary : ${value} LPA`,
                    ]}
                  />

                  <Line
                    type="monotone"
                    dataKey="salary"
                    stroke="none"
                    dot={{ stroke: "#8884d8", strokeWidth: 2, fill: "#fff" }}
                  />
                </LineChart>
                <p
                  style={{
                    margin: "0",
                    padding: "0",
                    color: "blue",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "14px",
                  }}
                >
                  Experience (Years)
                </p>
              </div>

              <div
                className="text-center mt-3"
                style={{
                  display: "grid",
                  justifyItems: "center",
                  alignContent: "center",
                }}
              >
                <h5 className="mb-2">
                  {" "}
                  Average Salary vs Grouped Experience Level
                </h5>
                <BarChart
                  width={chartWidth}
                  height={chartHeight}
                  data={groupedBarChartData}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="experienceLevel" />

                  <YAxis>
                    {" "}
                    <Label
                      value="Average Salary (LPA)"
                      angle={-90}
                      position="insideLeft"
                      style={{
                        textAnchor: "middle",
                        fontSize: "14px",
                        fill: "blue",
                        fontFamily: "Arial, sans-serif", // Adjust the font family here
                      }}
                    />
                  </YAxis>

                  <Tooltip
                    formatter={(value, name, props) => [
                      `Average Salary : ${value} LPA`,
                    ]}
                  />

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
              {isMobile ? (
                ""
              ) : (
                <div className="mb-5">
                  <SimplePieChart />
                </div>
              )}

              <MedianSalaryChartForSkills
                data={jobsDataByRole}
                skills={JSON.parse(selectedSkills)}
              />
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

export default GeneratedReport;

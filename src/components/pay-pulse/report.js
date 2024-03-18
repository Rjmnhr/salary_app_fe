import React, { useState, useEffect, useRef } from "react";
// import { Tabs } from "antd";
import {
  CalendarOutlined,
  DownloadOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

// import { RadialChart } from "react-vis";
import { Button, notification } from "antd";
import "./custom-style.css";
import MedianSalaryChartForSkills from "./charts/median-salary-skills";
import { SimplePieChart } from "./charts/skills-pie-chart";
import {
  calculateAverageSalary,
  calculateStatistics,
  decimalFix,
} from "../../utils/price-a-job-helper-functions";
import LinearSalaryChart from "./charts/linear-salary-chart";
import SalaryVsGroupedExpBarChart from "./charts/salary-vs-grouped-bar-chart";
import ReportUnsuccessful from "../misc/report-unsuccessful";
import logoImagePath from "../../icons/logo192.png";
import SalaryVsExpLineChart from "./charts/salary-vs-exp-line-chart";
import { pay_pulse_profile_threshold } from "../../config/constant";
import SalaryTrendChart from "./charts/salary-trend-chart";

const PayPulseReportComponent = ({
  jobsData,
  location,
  experience,
  jobsDataByRole,
  jobsDataNoExp,
  selectedSkills,
  skillsBool,
}) => {
  const [chartWidth, setChartWidth] = useState(500);
  const [pieChartWidth, setPieChartWidth] = useState(400);
  const [chartHeight, setChartHeight] = useState(300);
  const printAreaRef = useRef(null);
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
    const originalContents = document.body.innerHTML;
    const printContent = printAreaRef.current;

    if (printContent) {
      const printContents = printContent.innerHTML;

      // Create a new div to hold both the print contents, the text watermarks, and the logo
      const wrapperDiv = document.createElement("div");
      wrapperDiv.style.position = "relative";
      wrapperDiv.innerHTML = printContents;

      // Define watermark positions for text (you can customize as needed)
      const textWatermarkPositions = [
        { top: "4%", left: "90%", rotation: "0deg" },

        { top: "30%", left: "90%", rotation: "0deg" },
        { top: "50%", left: "90%", rotation: "0deg" },
        { top: "70%", left: "90%", rotation: "0deg" },
        { top: "90%", left: "90%", rotation: "0deg" },
      ];

      // Define logo position
      const logoPosition = {
        top: "80%",
        left: "20%",
        width: "50px",
        height: "50px",
        margin: "-90px",
        marginLeft: "-30px",
      };
      // Replace with the actual path to your logo image

      // Create text watermarks and position them
      textWatermarkPositions.forEach((position) => {
        const textWatermarkDiv = document.createElement("div");
        textWatermarkDiv.style.position = "absolute";
        textWatermarkDiv.style.top = position.top;
        textWatermarkDiv.style.left = position.left;
        textWatermarkDiv.style.transform = `translate(-50%, -50%) rotate(${position.rotation})`;
        textWatermarkDiv.style.color = "rgba(0, 0, 0, 0.2)";
        textWatermarkDiv.style.fontSize = "24px";
        textWatermarkDiv.innerText = "Equipay Partners";

        const logoImage = document.createElement("img");
        logoImage.src = logoImagePath;
        logoImage.style.position = "absolute";
        logoImage.style.top = position.top;
        logoImage.style.left = position.left;
        logoImage.style.width = logoPosition.width;
        logoImage.style.height = logoPosition.height;
        logoImage.style.marginTop = logoPosition.margin;
        logoImage.style.marginLeft = logoPosition.marginLeft;

        wrapperDiv.appendChild(logoImage);
        // Append each text watermark to the wrapper
        wrapperDiv.appendChild(textWatermarkDiv);
        // Append the logo to the wrapper
      });

      // Apply styles for print media to avoid box-shadow effect
      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText =
        "@media print { .custom-shadow { box-shadow: none !important; } }";
      wrapperDiv.appendChild(styleSheet);

      // Replace the body content with the wrapper content
      document.body.innerHTML = wrapperDiv.outerHTML;

      // Replace the body content with the wrapper content
      document.body.innerHTML = wrapperDiv.outerHTML;

      // Print the page
      window.print();
      window.location.reload(); // Reload the page
      // Restore the original content after printing
      document.body.innerHTML = originalContents;
    } else {
      console.error("Element not found.");

      setIsLoading(false);
    }
  };

  //   const originalContents = document.body.innerHTML;
  //   const printContent = printAreaRef.current;

  //   if (printContent) {
  //     const printContents = printContent.innerHTML;

  //     document.body.innerHTML = printContents;
  //     window.print();
  //     // Restore the original content after printing
  //     document.body.innerHTML = originalContents;

  //   } else {
  //     console.error("Element not found.");

  //     setIsLoading(false);
  //   }
  // };

  // const generatePDF = async () => {
  //   // const originalContents = document.body.innerHTML;
  //   const printContent = printAreaRef.current;

  //   if (printContent) {
  //     const printContents = printContent.innerHTML;

  //     try {
  //       const response = await AxiosInstance.post(
  //         "/api/generate-watermark-pdf",
  //         {
  //           pdfContent: printContents,
  //         },
  //         {
  //           responseType: "blob", // Specify responseType as 'blob' to handle binary data
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         const url = URL.createObjectURL(new Blob([response.data]));

  //         // For example, you can open the PDF in a new window
  //         window.open(url, "_blank");
  //       } else {
  //         console.error("Failed to generate watermarked PDF.");
  //       }
  //     } catch (error) {
  //       console.error("Error generating watermarked PDF:", error);
  //     }
  //   } else {
  //     console.error("Element not found.");
  //   }
  // };

  // Define a function to calculate statistics for a given dataset

  // Calculate statistics for jobsData
  const statisticsForJobsData = calculateStatistics(jobsData);

  // Calculate statistics for jobsDataByRole
  const statisticsForJobsDataByRole = calculateStatistics(jobsDataByRole);

  const experienceGroupsAlterLineChart = {
    "0-2": jobsDataNoExp?.filter((job) => job.experience === "0-2"),
    "2-5": jobsDataNoExp?.filter((job) => job.experience === "2-5"),
    "5-8": jobsDataNoExp?.filter((job) => job.experience === "5-8"),
    "8-11": jobsDataNoExp?.filter((job) => job.experience === "8-11"),
    "11-14": jobsDataNoExp?.filter((job) => job.experience === "11-14"),
    "15+": jobsDataNoExp?.filter((job) => job.experience === "15+"),
  };

  // Calculate average salary for each experience level
  const averageSalariesLineChart = {
    "0-2": calculateAverageSalary(experienceGroupsAlterLineChart["0-2"]),
    "2-5": calculateAverageSalary(experienceGroupsAlterLineChart["2-5"]),
    "5-8": calculateAverageSalary(experienceGroupsAlterLineChart["5-8"]),
    "8-11": calculateAverageSalary(experienceGroupsAlterLineChart["8-11"]),
    "11-14": calculateAverageSalary(experienceGroupsAlterLineChart["11-14"]),
    "15+": calculateAverageSalary(experienceGroupsAlterLineChart["15+"]),
  };

  const experienceGroupsAlter = {
    "Junior Level": [
      ...jobsDataNoExp?.filter((job) => job.experience === "0-2"),
      ...jobsDataNoExp?.filter((job) => job.experience === "2-5"),
    ],
    "Middle Level": [
      ...jobsDataNoExp?.filter((job) => job.experience === "5-8"),
      ...jobsDataNoExp?.filter((job) => job.experience === "8-11"),
    ],
    "Senior Level": [
      ...jobsDataNoExp?.filter((job) => job.experience === "11-14"),
      ...jobsDataNoExp?.filter((job) => job.experience === "15+"),
    ],
  };

  // Calculate average salary for each experience level
  const averageSalaries = {
    "Junior Level": calculateAverageSalary(
      experienceGroupsAlter["Junior Level"]
    ),
    "Middle Level": calculateAverageSalary(
      experienceGroupsAlter["Middle Level"]
    ),
    "Senior Level": calculateAverageSalary(
      experienceGroupsAlter["Senior Level"]
    ),
  };

  const groupedBarChartData = Object.keys(averageSalaries).map(
    (experienceLevel) => ({
      experienceLevel,
      averageSalary: averageSalaries[experienceLevel],
    })
  );

  const groupedLineChartData = Object.keys(averageSalariesLineChart).map(
    (experienceLevel) => ({
      experienceLevel,
      averageSalary: averageSalariesLineChart[experienceLevel],
    })
  );

  // Create data for the line chart (salary vs. experience)
  // const lineChartData = jobsDataNoExp.map((job) => ({
  //   experience: job.experience,
  //   salary: job.salary,
  // }));

  useEffect(() => {
    const updateChartSize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 600) {
        setChartWidth(350);
        setChartHeight(300);
        setPieChartWidth(200);
      } else if (screenWidth < 912) {
        setChartWidth(550);
        setChartHeight(200);
        setPieChartWidth(300);
      } else {
        setChartWidth(700);
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

  // Calculate the total count of all skills
  const totalCount = chartData.reduce((total, skill) => total + skill.value, 0);

  // Calculate the percentages
  const chartDataWithPercentages = chartData.map((skill) => ({
    name: skill.name,
    value: skill.value,
    percentage: ((skill.value / totalCount) * 100)?.toFixed(2), // Calculate percentage
  }));

  // Update the SimplePieChart component

  // const sortedJobsData = [...jobsData].sort(
  //   (a, b) => a.salary - b.salary
  // );

  // const sortedJobsDataByRole = [...jobsDataByRole].sort(
  //   (a, b) => a.salary - b.salary
  // );

  // const sortedLineChartDataNoExp = [...lineChartData].sort(
  //   (a, b) => a.experience - b.experience
  // );

  return (
    <>
      {contextHolder}
      {jobsData.length >= pay_pulse_profile_threshold ? (
        <div
          className="container  col-lg-11 col-12 m-lg-3 m-2 p-1 text-left scrollable-container"
          style={{
            background: "white",
            height: "85vh",
            overflowY: "scroll",
          }}
        >
          <DownloadButtonComponent />

          <div className="p-lg-3 p-1" ref={printAreaRef}>
            <h3>{jobsData[0]?.title} Salary Report</h3>
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
              <LinearSalaryChart data={statisticsForJobsData} />
              <p className="text-primary ">Across India</p>

              <LinearSalaryChart data={statisticsForJobsDataByRole} />
              {/* <div
                className="text-center mt-3"
                style={{
                  display: "grid",
                  justifyItems: "center",
                  alignContent: "center",
                }}
              >
                <p>
                  Salary for all individual roles mapped to{" "}
                  {jobsData[0]?.title} with {experience} year(s) of
                  experience in{" "}
                  <span className="text-primary"> {location}</span>
                </p>

                <IndividualSalaryLineChart
                  title={jobsData[0]?.title}
                  width={chartWidth}
                  height={chartHeight}
                  data={sortedJobsData}
                />
              </div> */}
              {/* <div
                className="text-center mt-3"
                style={{
                  display: "grid",
                  justifyItems: "center",
                  alignContent: "center",
                }}
              >
                <p>
                  Salary for all individual roles mapped to{" "}
                  {jobsData[0]?.title} with {experience} year(s) of
                  experience in <span className="text-primary"> India</span>
                </p>
                <IndividualSalaryLineChart
                  title={jobsData[0]?.title}
                  width={chartWidth}
                  height={chartHeight}
                  data={sortedJobsDataByRole}
                />
              </div> */}

              <div
                className="mb-5 card custom-shadow mt-5 text-center"
                style={{
                  display: "grid",
                  justifyItems: "center",
                  alignContent: "center",
                  pageBreakBefore: "auto",
                  pageBreakInside: "avoid",
                }}
              >
                <div className="card-body">
                  <h5 className="mb-5">Average Salary Trend</h5>
                  <SalaryTrendChart
                    data={jobsData}
                    width={chartWidth}
                    height={chartHeight}
                  />
                </div>
              </div>
              <div
                className="text-center mt-5 card custom-shadow"
                style={{
                  display: "grid",
                  justifyItems: "center",
                  alignContent: "center",
                  pageBreakBefore: "auto",
                  pageBreakInside: "avoid",
                }}
              >
                <div className="card-body">
                  <h5 className="mb-5">Average Salary vs Experience Level</h5>

                  <SalaryVsExpLineChart
                    width={chartWidth}
                    height={chartHeight}
                    data={groupedLineChartData}
                  />
                </div>
              </div>

              <div
                className="text-center mt-5 card custom-shadow"
                style={{
                  display: "grid",
                  justifyItems: "center",
                  alignContent: "center",
                  pageBreakBefore: "auto",
                  pageBreakInside: "avoid",
                }}
              >
                <div className="card-body">
                  <h5 className="mb-5">
                    {" "}
                    Average Salary vs Grouped Experience Level
                  </h5>
                  <SalaryVsGroupedExpBarChart
                    width={chartWidth}
                    height={chartHeight}
                    data={groupedBarChartData}
                  />
                </div>
              </div>

              {isMobile ? (
                <div
                  className="mb-5 card custom-shadow mt-5"
                  style={{ pageBreakBefore: "auto", pageBreakInside: "avoid" }}
                >
                  <div className="card-body">
                    <SimplePieChart
                      title={jobsData[0]?.title}
                      width={pieChartWidth}
                      dataWithPercent={chartDataWithPercentages}
                      data={chartData}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="mb-5 card custom-shadow mt-5"
                  style={{ pageBreakBefore: "auto", pageBreakInside: "avoid" }}
                >
                  <div className="card-body">
                    <SimplePieChart
                      title={jobsData[0]?.title}
                      width={pieChartWidth}
                      dataWithPercent={chartDataWithPercentages}
                      data={chartData}
                    />
                  </div>
                </div>
              )}
              <MedianSalaryChartForSkills
                data={jobsDataByRole}
                skills={JSON.parse(selectedSkills)}
                width={chartWidth}
                height={chartHeight}
              />

              <p style={{ fontSize: "14px" }} className="my-3 text-center">
                End of the report
              </p>
            </div>
          </div>
        </div>
      ) : (
        <ReportUnsuccessful />
      )}
    </>
  );
};

export default PayPulseReportComponent;

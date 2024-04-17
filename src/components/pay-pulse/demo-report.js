import React, { useEffect, useRef, useState } from "react";
// import { Tabs } from "antd";
import {
  CalendarOutlined,
  DownloadOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

// import { RadialChart } from "react-vis";
import "./custom-style.css";
import { useApplicationContext } from "../../context/app-context";
import { decimalFix } from "../../utils/price-a-job-helper-functions";
import LinearSalaryChartDemo from "./charts/linear-salary-chart-demo";
import SalaryTrendChartDemo from "./charts/trend-chart-demo";
import SalaryVsExpLineChartDemo from "./charts/salary-vs-exp-chart-demo";
import { SimplePieChart } from "./charts/skills-pie-chart";
import MedianSalaryChartForSkillsDemo from "./charts/median-salary-skills-demo";
import { Button } from "antd";
import logoImagePath from "../../icons/logo192.png";
const PayPulseReportComponentDemo = ({
  demoData,
  skillsBool,
  demoDataNoLoc,
  demoDataNoExp,
}) => {
  const { isMobile } = useApplicationContext();
  const [chartWidth, setChartWidth] = useState(500);
  const [pieChartWidth, setPieChartWidth] = useState(400);
  const [chartHeight, setChartHeight] = useState(300);
  const storedUserInputs = JSON.parse(sessionStorage.getItem("user-inputs"));
  const [isLoading, setIsLoading] = useState(false);
  const printAreaRef = useRef(null);
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

          generatePDF();
        }}
      />
    );

    return isMobile ? mobileButton : downloadButton;
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
        { top: "2.3%", left: "90%", rotation: "0deg" },
      ];

      // Define logo position
      const logoPosition = {
        top: "80%",
        left: "20%",
        width: "50px",
        height: "50px",
        margin: "-90px",
        marginLeft: "-30px",
        padding: "10px",
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
        logoImage.style.padding = logoPosition.padding;

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
        setChartWidth(650);
        setChartHeight(400);
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

  const experienceChartData = [
    {
      experienceLevel: "0-2",
      averageSalary: (demoDataNoExp?.filter(
        (job) => job.Experience === "0-2"
      ))[0]?.averageSalary,
    },

    {
      experienceLevel: "2-5",
      averageSalary: (demoDataNoExp?.filter(
        (job) => job.Experience === "2-5"
      ))[0]?.averageSalary,
    },
    {
      experienceLevel: "5-8",
      averageSalary: (demoDataNoExp?.filter(
        (job) => job.Experience === "5-8"
      ))[0]?.averageSalary,
    },
    {
      experienceLevel: "8-11",
      averageSalary: (demoDataNoExp?.filter(
        (job) => job.Experience === "8-11"
      ))[0]?.averageSalary,
    },
    {
      experienceLevel: "11-14",
      averageSalary: (demoDataNoExp?.filter(
        (job) => job.Experience === "11-14"
      ))[0]?.averageSalary,
    },
  ];

  const skillsData = demoData[0]?.skills.slice(0, 5);

  const chartData = skillsData?.map((skill) => ({
    name: skill.skill,
    value: skill.value,
  }));

  const totalCount = chartData?.reduce(
    (total, skill) => total + skill.value,
    0
  );

  const chartDataWithPercentages = chartData?.map((skill) => ({
    name: skill.name,
    value: skill.value,
    percentage: ((skill.value / totalCount) * 100)?.toFixed(2), // Calculate percentage
  }));

  return (
    <>
      {demoData?.length > 0 && (
        <div
          className="container  col-lg-11 col-12 m-lg-3 m-2 p-1 text-left scrollable-container"
          style={{
            background: "white",
            height: "85vh",

            overflowY: isMobile ? "" : "scroll",
          }}
        >
          <DownloadButtonComponent />
          <div className="p-lg-3 p-1" ref={printAreaRef}>
            <h3>{demoData[0]?.Title} Salary Report</h3>
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
                <CalendarOutlined /> Experience : {demoData[0]?.Experience}{" "}
                years
              </p>

              <p
                className=" border-right px-2"
                style={{ display: "flex", alignItems: "center", gap: "3px" }}
              >
                {" "}
                <EnvironmentOutlined /> {demoData[0]?.location}
              </p>
            </div>
            <div></div>
            <p
              style={{
                fontSize: "14px",
                textAlign: "center",
                display: "grid",
                placeItems: "center",
              }}
              className="text-primary"
            >
              The charts below show data for roles in {demoData[0]?.location}{" "}
              with {demoData[0]?.Experience} year(s) of experience{" "}
              {skillsBool !== null
                ? skillsBool
                  ? " and selected skill(s)"
                  : ". It doesn't show data for the skill(s) you have selected."
                : ""}
            </p>
            <div className="mt-3">
              <h5 className="mb-2">Average Salary </h5>
              <p className="fs-3">
                ₹ {decimalFix(demoData[0]?.averageSalary)} Lakhs Per Annum (LPA)
              </p>

              <p className="text-primary ">In {demoData[0]?.location}</p>
              <LinearSalaryChartDemo data={demoData[0]} />
              <p className="text-primary ">Across India</p>

              <LinearSalaryChartDemo data={demoDataNoLoc[0]} />

              <div
                className="mb-5 card custom-shadow mt-5 text-center d-lg-flex"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  pageBreakBefore: "auto",
                  pageBreakInside: "avoid",
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <h5 className="mb-5 mt-3 w-75 ">Median Salary Trend </h5>
                  </div>
                  <SalaryTrendChartDemo
                    data={demoData[0]}
                    width={chartWidth}
                    height={chartHeight}
                  />
                </div>
              </div>
              {/* <div
                className="text-center mt-5 card custom-shadow d-lg-flex"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  pageBreakBefore: "auto",
                  pageBreakInside: "avoid",
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <h5 className="mb-5 mt-3 w-100 ">
                      Average salary for different experience levels in{" "}
                      {demoData[0]?.location}
                    </h5>
                  </div>

                  <SalaryVsExpLineChartDemo
                    width={chartWidth}
                    height={chartHeight}
                    data={experienceChartData}
                  />
                </div>
              </div> */}

              <div
                className="mb-5 card custom-shadow mt-5"
                style={{ pageBreakBefore: "auto", pageBreakInside: "avoid" }}
              >
                <div className="card-body">
                  <SimplePieChart
                    width={pieChartWidth}
                    dataWithPercent={chartDataWithPercentages}
                    data={chartData}
                  />
                </div>
              </div>

              <MedianSalaryChartForSkillsDemo
                data={demoData}
                skillNames={JSON.parse(storedUserInputs?.skills)}
                width={chartWidth}
                height={chartHeight}
              />

              <p style={{ fontSize: "14px" }} className="my-3 text-center">
                End of the report
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PayPulseReportComponentDemo;

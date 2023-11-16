import React, { useEffect, useRef, useState } from "react";

import SalaryTrendChart from "../../components/trend-graph";
import SalaryTrendGraph2 from "../../components/trend-graph/trend-graph-2";
import BenchmarkLineCharts from "../benchmark-line-charts";
import html2pdf from "html2pdf.js";
import { Button, notification } from "antd";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
const decimalFix = (number) => {
  const trimmed = Math.floor(number * 100) / 100;
  return trimmed;
};

export const calculateStatisticsSalary = (data) => {
  // Calculate average salary
  const salaries = data.map((result) => result.salary / 100000);

  // Remove zeros from the salaries array
  const nonZeroSalaries = salaries.filter(
    (salary) => salary !== 0 && salary !== null
  );

  // Check if all values are zero
  const allZeros = nonZeroSalaries.length === 0;

  const totalSalary = allZeros
    ? 0
    : nonZeroSalaries.reduce((acc, val) => acc + val, 0);
  const averageSalary = allZeros ? 0 : totalSalary / nonZeroSalaries.length;

  // Calculate median salary
  const sortedSalaries = [...nonZeroSalaries].sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedSalaries.length / 2);
  const medianSalary = allZeros
    ? 0
    : sortedSalaries.length % 2 === 0
    ? (sortedSalaries[middleIndex - 1] + sortedSalaries[middleIndex]) / 2
    : sortedSalaries[middleIndex];

  // Calculate minimum and maximum salary
  const minSalary = allZeros ? 0 : Math.max(0.01, Math.min(...nonZeroSalaries));
  const maxSalary = allZeros ? 0 : Math.max(...nonZeroSalaries);

  // Calculate 25th and 75th percentile values
  const percentile25 = allZeros
    ? 0
    : sortedSalaries[Math.floor(0.25 * sortedSalaries.length)];
  const percentile75 = allZeros
    ? 0
    : sortedSalaries[Math.floor(0.75 * sortedSalaries.length)];

  return {
    averageSalary,
    medianSalary,
    minSalary,
    maxSalary,
    percentile25,
    percentile75,
  };
};

function calculateStatisticsFees(data) {
  // Calculate average salary
  const salaries = data.map((result) => result.directors_sitting_fees / 100000);

  // Remove zeros from the salaries array
  const nonZeroSalaries = salaries.filter(
    (salary) => salary !== 0 && salary !== null
  );

  // Check if all values are zero
  const allZeros = nonZeroSalaries.length === 0;

  const totalSalary = allZeros
    ? 0
    : nonZeroSalaries.reduce((acc, val) => acc + val, 0);
  const averageSalary = allZeros ? 0 : totalSalary / nonZeroSalaries.length;

  // Calculate median salary
  const sortedSalaries = [...nonZeroSalaries].sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedSalaries.length / 2);
  const medianSalary = allZeros
    ? 0
    : sortedSalaries.length % 2 === 0
    ? (sortedSalaries[middleIndex - 1] + sortedSalaries[middleIndex]) / 2
    : sortedSalaries[middleIndex];

  // Calculate minimum and maximum salary
  const minSalary = allZeros ? 0 : Math.max(0.01, Math.min(...nonZeroSalaries));
  const maxSalary = allZeros ? 0 : Math.max(...nonZeroSalaries);

  // Calculate 25th and 75th percentile values
  const percentile25 = allZeros
    ? 0
    : sortedSalaries[Math.floor(0.25 * sortedSalaries.length)];
  const percentile75 = allZeros
    ? 0
    : sortedSalaries[Math.floor(0.75 * sortedSalaries.length)];

  return {
    averageSalary,
    medianSalary,
    minSalary,
    maxSalary,
    percentile25,
    percentile75,
  };
}
const GenerateBenchmarkReport = ({
  resultData,
  resultData2021,
  resultData2022,
  role,
}) => {
  const [chartWidth, setChartWidth] = useState(800);
  const [chartHeight, setChartHeight] = useState(400);
  const [chartWidthPdf, setChartWidthPdf] = useState(700);
  const [chartHeightPdf, setChartHeightPdf] = useState(3500);
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const elementRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const filteredResultData = resultData.filter(
    (data) => data.salary !== null && data.salary !== 0
  );

  // Convert salary values to lakhs
  const dataInLakhs = filteredResultData.map((item) => {
    return {
      ...item,
      salary: item.salary / 100000, // Convert salary to lakhs
    };
  });
  // Sort based on market_capitalisation_2023
  const sortedByMarketCapitalisation = [...dataInLakhs].sort(
    (a, b) => a.market_capitalisation_2023 - b.market_capitalisation_2023
  );

  // Sort based on total_assets_2023
  const sortedByTotalAssets = [...dataInLakhs].sort(
    (a, b) => a.total_assets_2023 - b.total_assets_2023
  );

  // Sort based on sales_2023
  const sortedBySales = [...dataInLakhs].sort(
    (a, b) => a.sales_2023 - b.sales_2023
  );

  // Sort based on PAT_2023
  const sortedByPAT = [...dataInLakhs].sort((a, b) => a.PAT_2023 - b.PAT_2023);
  // const sortedResult = [...dataInLakhs].sort((a, b) => a.salary - b.salary);

  // Calculate statistics for jobsData
  const statisticsForSalary = calculateStatisticsSalary(resultData);
  const statisticsForFees = calculateStatisticsFees(resultData);

  useEffect(() => {
    const updateChartSize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 912) {
        setChartWidth(300);
        setChartHeight(200);
        setChartWidthPdf(300);
        setChartHeightPdf(200);
      }
      if (screenWidth < 600) {
        setChartWidth(300);
        setChartHeight(150);
        setChartWidthPdf(300);
        setChartHeightPdf(150);
      } else {
        setChartWidth(800);
        setChartHeight(400);
        setChartWidthPdf(700);
        setChartHeightPdf(350);
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
  const openNotification = (placement) => {
    api.info({
      message: `Your report is getting downloaded`,

      placement,
    });
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

  const generatePDF = () => {
    const element = elementRef.current;

    if (element) {
      const pdfOptions = {
        margin: 5,
        filename: `Equipay_${role}_Benchmark_Report`,
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

  return (
    <>
      {contextHolder}
      {resultData.length > 1 ? (
        <div
          className="container  col-lg-11  col-12 m-lg-3 m-2 p-1 text-left scrollable-container"
          style={{
            background: "white",
            height: "100vh",
            overflowY: "scroll",
          }}
        >
          <DownloadButtonComponent />
          <div className="p-lg-3 p-1 ">
            <h3>{role} Benchmark Report</h3>
            <div className="mt-3 mb-3">
              <h5 className="mb-2">Average Salary </h5>
              <p className="fs-3">
                ₹ {decimalFix(statisticsForSalary.averageSalary)} Lakhs{" "}
              </p>
            </div>
            <div className="mt-3 mb-3">
              <h5 className="mb-2">Average Fees </h5>
              <p className="fs-3">
                ₹ {decimalFix(statisticsForFees.averageSalary)} Lakhs{" "}
              </p>
            </div>
            <h5 className="mb-3">Salary details</h5>
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
                    style={{
                      fontWeight: "bold",
                      margin: "0",
                      color: "gray",
                    }}
                  >
                    Min
                  </p>
                  <p
                    className="stripe-text"
                    style={{ fontWeight: "bold", color: "gray" }}
                  >
                    {decimalFix(statisticsForSalary.minSalary)} Lakhs
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
                      {decimalFix(statisticsForSalary.percentile25)} Lakhs
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
                      {decimalFix(statisticsForSalary.medianSalary)} Lakhs
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
                      {decimalFix(statisticsForSalary.percentile75)} Lakhs
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
                    style={{
                      fontWeight: "bold",
                      margin: "0",
                      color: "gray",
                    }}
                  >
                    Max
                  </p>
                  <p
                    className="stripe-text"
                    style={{ fontWeight: "bold", color: "gray" }}
                  >
                    {decimalFix(statisticsForSalary.maxSalary)} Lakhs
                  </p>
                </div>
              </div>
            </div>
            <h5 className="mb-3">Fees details</h5>
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
                    style={{
                      fontWeight: "bold",
                      margin: "0",
                      color: "gray",
                    }}
                  >
                    Min
                  </p>
                  <p
                    className="stripe-text"
                    style={{ fontWeight: "bold", color: "gray" }}
                  >
                    {decimalFix(statisticsForFees.minSalary)} Lakhs
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
                      {decimalFix(statisticsForFees.percentile25)} Lakhs
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
                      {decimalFix(statisticsForFees.medianSalary)} Lakhs
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
                      {decimalFix(statisticsForFees.percentile75)} Lakhs
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
                    style={{
                      fontWeight: "bold",
                      margin: "0",
                      color: "gray",
                    }}
                  >
                    Max
                  </p>
                  <p
                    className="stripe-text"
                    style={{ fontWeight: "bold", color: "gray" }}
                  >
                    {decimalFix(statisticsForFees.maxSalary)} Lakhs
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
              }}
              className="mb-3 text-center"
            >
              <h5 className="mb-3">Median Salary Trends </h5>
              <SalaryTrendChart
                resultData2023={resultData}
                resultData2021={resultData2021}
                resultData2022={resultData2022}
                chartWidth={chartWidth}
                chartHeight={chartHeight}
              />
            </div>
            <div
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
              }}
              className="mb-3 text-center"
            >
              <h5 className="mb-3">Salary Distribution Trends </h5>
              <SalaryTrendGraph2
                dataWithYear2023={resultData}
                dataWithYear2021={resultData2021}
                dataWithYear2022={resultData2022}
                chartWidth={chartWidth}
                chartHeight={chartHeight}
              />
            </div>
            <div
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
              }}
              className="mb-3 text-center"
            >
              <h5 className="mb-3"> Market Capitalization vs Salary</h5>
              <BenchmarkLineCharts
                data={sortedByMarketCapitalisation}
                xAxisDataKey={"market_capitalisation_2023"}
                xValue={`Market Capitalization`}
                chartWidth={chartWidth}
                chartHeight={chartHeight}
              />
            </div>
            <div
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
              }}
              className="mb-3 text-center"
            >
              <h5 className="mb-3">Total Assets vs Salary</h5>
              <BenchmarkLineCharts
                data={sortedByTotalAssets}
                xAxisDataKey={"total_assets_2023"}
                xValue={`Total Assets`}
                chartWidth={chartWidth}
                chartHeight={chartHeight}
              />
            </div>
            <div
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
              }}
              className="mb-3 text-center"
            >
              <h5 className="mb-3">Sales vs Salary</h5>
              <BenchmarkLineCharts
                data={sortedBySales}
                xAxisDataKey={"sales_2023"}
                xValue={`Sales`}
                chartWidth={chartWidth}
                chartHeight={chartHeight}
              />
            </div>
            <div
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
              }}
              className="mb-3 text-center"
            >
              <h5 className="mb-3">Profit After Tax vs Salary</h5>
              <BenchmarkLineCharts
                data={sortedByPAT}
                xAxisDataKey={"PAT_2023"}
                xValue={`Profit After Tax`}
                chartWidth={chartWidth}
                chartHeight={chartHeight}
              />
            </div>
          </div>
          {/* This container is only for Pdf download */}
          {/* This container is only for Pdf download */}
          {/* This container is only for Pdf download */}
          {/* This container is only for Pdf download */}
          <div className="d-none">
            <div className="p-lg-3 p-1" ref={elementRef}>
              <h3>{role} Benchmark Report</h3>
              <div className="mt-3 mb-3">
                <h5 className="mb-2">Average Salary </h5>
                <p className="fs-3">
                  ₹ {decimalFix(statisticsForSalary.averageSalary)} Lakhs{" "}
                </p>
              </div>
              <div className="mt-3 mb-3">
                <h5 className="mb-2">Average Fees </h5>
                <p className="fs-3">
                  ₹ {decimalFix(statisticsForFees.averageSalary)} Lakhs{" "}
                </p>
              </div>
              <h5 className="mb-3">Salary details</h5>
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
                      style={{
                        fontWeight: "bold",
                        margin: "0",
                        color: "gray",
                      }}
                    >
                      Min
                    </p>
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", color: "gray" }}
                    >
                      {decimalFix(statisticsForSalary.minSalary)} Lakhs
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
                        {decimalFix(statisticsForSalary.percentile25)} Lakhs
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
                        {decimalFix(statisticsForSalary.medianSalary)} Lakhs
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
                        {decimalFix(statisticsForSalary.percentile75)} Lakhs
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
                      style={{
                        fontWeight: "bold",
                        margin: "0",
                        color: "gray",
                      }}
                    >
                      Max
                    </p>
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", color: "gray" }}
                    >
                      {decimalFix(statisticsForSalary.maxSalary)} Lakhs
                    </p>
                  </div>
                </div>
              </div>
              <h5 className="mb-3">Fees details</h5>
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
                      style={{
                        fontWeight: "bold",
                        margin: "0",
                        color: "gray",
                      }}
                    >
                      Min
                    </p>
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", color: "gray" }}
                    >
                      {decimalFix(statisticsForFees.minSalary)} Lakhs
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
                        {decimalFix(statisticsForFees.percentile25)} Lakhs
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
                        {decimalFix(statisticsForFees.medianSalary)} Lakhs
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
                        {decimalFix(statisticsForFees.percentile75)} Lakhs
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
                      style={{
                        fontWeight: "bold",
                        margin: "0",
                        color: "gray",
                      }}
                    >
                      Max
                    </p>
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", color: "gray" }}
                    >
                      {decimalFix(statisticsForFees.maxSalary)} Lakhs
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-3 text-center">
                <h5 className="mb-3">Median Salary Trends </h5>
                <SalaryTrendChart
                  resultData2023={resultData}
                  resultData2021={resultData2021}
                  resultData2022={resultData2022}
                  chartWidth={chartWidthPdf}
                  chartHeight={chartHeightPdf}
                />
              </div>
              <div className="mb-3 text-center">
                <h5 style={{ marginTop: "170px" }} className="mb-3">
                  Salary Distribution Trends{" "}
                </h5>
                <SalaryTrendGraph2
                  dataWithYear2023={resultData}
                  dataWithYear2021={resultData2021}
                  dataWithYear2022={resultData2022}
                  chartWidth={chartWidthPdf}
                  chartHeight={chartHeightPdf}
                />
              </div>
              <div className="mb-3 text-center">
                <h5 style={{ marginTop: "50px" }} className="mb-3">
                  {" "}
                  Market Capitalization vs Salary
                </h5>
                <BenchmarkLineCharts
                  data={sortedByMarketCapitalisation}
                  xAxisDataKey={"market_capitalisation_2023"}
                  xValue={`Market Capitalization`}
                  chartWidth={chartWidthPdf}
                  chartHeight={chartHeightPdf}
                />
              </div>
              <div className="mb-3 text-center">
                <h5 style={{ marginTop: "300px" }} className="mb-3">
                  Total Assets vs Salary
                </h5>
                <BenchmarkLineCharts
                  data={sortedByTotalAssets}
                  xAxisDataKey={"total_assets_2023"}
                  xValue={`Total Assets`}
                  chartWidth={chartWidthPdf}
                  chartHeight={chartHeightPdf}
                />
              </div>
              <div className="mb-3 text-center">
                <h5 style={{ marginTop: "50px" }} className="mb-3">
                  Sales vs Salary
                </h5>
                <BenchmarkLineCharts
                  data={sortedBySales}
                  xAxisDataKey={"sales_2023"}
                  xValue={`Sales`}
                  chartWidth={chartWidthPdf}
                  chartHeight={chartHeightPdf}
                />
              </div>
              <div className="mb-3 text-center">
                <h5 style={{ marginTop: "300px" }} className="mb-3">
                  Profit After Tax vs Salary
                </h5>
                <BenchmarkLineCharts
                  data={sortedByPAT}
                  xAxisDataKey={"PAT_2023"}
                  xValue={`Profit After Tax`}
                  chartWidth={chartWidthPdf}
                  chartHeight={chartHeightPdf}
                />
              </div>
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

export default GenerateBenchmarkReport;

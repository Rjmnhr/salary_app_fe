import React from "react";
import Chart from "react-apexcharts";
import { axisColor, borderColor, colorConfig } from "../../../config/constant";
import { useApplicationContext } from "../../../context/app-context";

// Function to calculate the median of an array
export const calculateMedian = (arr) => {
  const sortedArr = arr.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedArr.length / 2);
  if (sortedArr.length % 2 === 0) {
    return (sortedArr[middle - 1] + sortedArr[middle]) / 2;
  } else {
    return sortedArr[middle];
  }
};

export const findMaxValue = (arr) => {
  return Math.max(...arr);
};

const calculateAverage = (arr) => {
  const sum = arr.reduce((acc, value) => acc + value, 0);
  return (sum / arr.length).toFixed(2);
};
const MedianSalaryChartForSkills = ({ data, skills, height, width }) => {
  // Initialize an empty array to store the median salary data for each skill

  const { isMobile } = useApplicationContext();

  const skillMedians = [];

  // Calculate the median salary for each skill
  skills.forEach((skill) => {
    const filteredData = data.filter((item) =>
      item.combined_skills?.toLowerCase().includes(skill?.toLowerCase())
    );

    const median = calculateAverage(filteredData.map((item) => item.salary));

    // Check if the median is valid (not NaN or null) before adding it to the array
    if (!isNaN(median) && median !== null) {
      skillMedians.push({
        skill: skill,
        median: median,
      });
    }
  });

  const options = {
    chart: {
      height: 215,
      parentHeightOffset: 0,
      parentWidthOffset: 0,
      toolbar: {
        show: false,
      },
      // offsetY: 10, // Adjust the offset to create space for Y-axis labels
      // offsetX: 20, // Adjust the offset to create space for Y-axis labels
      type: "area",
    },
    plotOptions: {
      bar: {
        // columnWidth: "50%", // Adjust the columnWidth to control the width of the bars
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    legend: {
      show: false,
    },
    markers: {
      size: 6,
      colors: "transparent",
      strokeColors: "transparent",
      strokeWidth: 4,
      discrete: [
        {
          fillColor: colorConfig.colors.white,
          seriesIndex: 0,
          dataPointIndex: 7,
          strokeColor: colorConfig.colors.primary,
          strokeWidth: 2,
          size: 6,
          radius: 8,
        },
      ],
      hover: {
        size: 7,
      },
    },
    colors: [colorConfig.colors.primary],
    fill: {
      type: "solid",
    },
    grid: {
      borderColor: borderColor,
      strokeDashArray: 3,
      padding: {
        top: -10,
        bottom: 20,
        left: 50,
        right: 50,
      },
    },
    xaxis: {
      title: {
        text: "",
        offsetY: 20,
        offsetX: -10,
        style: {
          fontSize: isMobile ? "11px" : "16px",
          fontWeight: "normal",
        },
      },
      categories: skillMedians.map((d) => d.skill),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        offsetY: 3,
        style: {
          fontSize: "11px",
          colors: "black",
        },
      },
    },
    yaxis: {
      title: {
        text: isMobile ? "" : "Average Salary (LPA)",
        offsetX: -20,
        style: {
          fontSize: isMobile ? "11px" : "16px",
          fontWeight: "normal",
        },
      },
      labels: {
        show: true,
        offsetX: 20,
        formatter: function (value) {
          return value?.toFixed(2);
        },
        style: {
          fontSize: isMobile ? "11px" : "16px",
          colors: axisColor,
        },
      },
      offsetY: 10, // This offset controls the gap between the Y-axis border and labels
      min: 0, // Adjust the min value based on your data
      max: Math.max(...skillMedians.map((d) => d.median)), // Adjust the max value based on your data
      tickAmount: 4,
      axisBorder: {
        show: false, // Show the Y-axis border
        color: "#a1acb8", // Color of the Y-axis border
        offsetX: -20, // Adjust the offset to position the Y-axis border
      },
    },
  };

  const series = [
    {
      name: "Average Salary (LPA) ",
      data: skillMedians.map((d) => d.median),
    },
  ];

  return (
    <>
      {skills && skills?.length > 0 && skillMedians.length > 0 ? (
        <div
          className="card mt-5 custom-shadow"
          style={{ pageBreakBefore: "auto", pageBreakInside: "avoid" }}
        >
          <div className="card-body">
            <div
              className="text-center mt-3"
              style={{
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
              }}
            >
              <div className="d-flex justify-content-center">
                <h5 className={`mb-5 mt-3  ${isMobile ? "w-75" : "w-100"} `}>
                  {" "}
                  Average salary for skill(s) you have selected across{" "}
                  <span className="tex-primary">India</span>
                </h5>
              </div>

              <Chart
                options={options}
                series={series}
                type="bar"
                width={width}
                height={height}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MedianSalaryChartForSkills;

/* <BarChart width={chartWidth} height={chartHeight} data={skillMedians}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill" tick={false}>
              <Label
                value={`Skills`}
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
                value="Median Salary (LPA)"
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
                `Median Salary : ${value} LPA`,
              ]}
            />

            <Bar dataKey="median" fill="#8884d8" />
          </BarChart> */

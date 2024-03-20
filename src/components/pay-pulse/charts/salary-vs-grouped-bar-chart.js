import React from "react";
import Chart from "react-apexcharts";
import { axisColor, colorConfig } from "../../../config/constant";
import { useApplicationContext } from "../../../context/app-context";

const SalaryVsGroupedExpBarChart = ({ data, width, height }) => {
  const { isMobile } = useApplicationContext();

  const filteredData = data.filter(
    (d) =>
      d.averageSalary !== "NaN" &&
      d.averageSalary !== null &&
      d.averageSalary !== undefined
  );
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
      width: 2,
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
      borderColor: "#b3b4b5",
      strokeDashArray: 3,
      padding: {
        top: -10,
        bottom: 8,
        left: 50,
        right: 50,
      },
    },
    xaxis: {
      title: {
        text: "Experience (years)",
        offsetY: -10,
        style: {
          fontSize: isMobile ? "11px" : "16px",
          fontWeight: "normal",
        },
      },
      categories: filteredData.map((d) => d.experienceLevel),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          fontSize: isMobile ? "11px" : "16px",
          colors: axisColor,
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
          colors: "#a1acb8",
        },
      },
      offsetY: 10, // This offset controls the gap between the Y-axis border and labels
      min: 0, // Adjust the min value based on your data
      max: Math.max(...filteredData.map((d) => d.averageSalary)), // Adjust the max value based on your data
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
      data: filteredData.map((d) => d.averageSalary),
    },
  ];
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="bar"
        width={width}
        height={height}
      />
    </div>
  );
};

export default SalaryVsGroupedExpBarChart;

/* <BarChart width={width} height={height} data={data}>
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
          formatter={(value, name, props) => [`Average Salary : ${value} LPA`]}
        />

        <Bar dataKey="averageSalary" name="Average Salary" fill="#8884d8" />
      </BarChart> */

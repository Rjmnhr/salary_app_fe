import React from "react";
import Chart from "react-apexcharts";
import {
  axisColor,
  borderColor,
  colorConfig,
  shadeColor,
} from "../../../config/constant";

const SalaryVsGroupedExpBarChart = ({ data, width, height }) => {
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
      type: "gradient",
      gradient: {
        shade: shadeColor,
        shadeIntensity: 0.1,
        opacityFrom: 0.7,
        opacityTo: 0.8,
        stops: [0, 95, 100],
      },
    },
    grid: {
      borderColor: borderColor,
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
          fontSize: "13px",
          colors: axisColor,
        },
      },
    },
    yaxis: {
      title: {
        text: "Average Salary (LPA)",
        offsetX: -20,
      },
      labels: {
        show: true,
        offsetX: 20,
        formatter: function (value) {
          return value + "  ";
        },
        style: {
          fontSize: "13px",
          colors: "#a1acb8",
        },
      },
      offsetY: 10, // This offset controls the gap between the Y-axis border and labels
      min: 1, // Adjust the min value based on your data
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

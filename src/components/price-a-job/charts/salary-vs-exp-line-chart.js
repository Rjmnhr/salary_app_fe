import React from "react";

import Chart from "react-apexcharts";
import { axisColor, borderColor, colorConfig, shadeColor } from "../../../config/constant";



const SalaryVsExpLineChart = ({ title, width, height, data }) => {
  const options = {
    chart: {
      height: 215,
      parentHeightOffset: 0,
      parentWidthOffset: 0,
      type: "area",
      toolbar: {
        show: false,
      },
      // offsetY: 10, // Adjust the offset to create space for Y-axis labels
      // offsetX: 20, // Adjust the offset to create space for Y-axis labels
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
      gradient: {
        shade: shadeColor,
        shadeIntensity: 0.1,
        opacityFrom: 0.5,
        opacityTo: 0.25,
        stops: [0, 95, 100],
      },
    },
    grid: {
      borderColor: borderColor,
      strokeDashArray: 3,
      padding: {
        top: -20,
        bottom: -8,
        left: -10,
        right: 8,
      },
    },
    xaxis: {
      title: {
        offsetY: -10,
      },
      categories: data.map((d) => d.experienceLevel),
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
        offsetX: -10,
      },
      labels: {
        show: true,
        offsetX: -10,
        formatter: function (value) {
          return value + "  ";
        },
        style: {
          fontSize: "13px",
          colors: "#a1acb8",
        },
      },
      offsetY: 10, // This offset controls the gap between the Y-axis border and labels
      min: 0, // Adjust the min value based on your data
      max: Math.max(...data.map((d) => d.averageSalary)), // Adjust the max value based on your data
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
      data: data.map((d) => d.averageSalary),
    },
  ];
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="line"
        width={width}
        height={height}
      />
    </div>
  );
};

export default SalaryVsExpLineChart;

/* <LineChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="experience" t name="Experience"></XAxis>
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
          formatter={(value, name, props) => [`Average Salary : ${value} LPA`]}
        />

        <Line
          type="monotone"
          dataKey="salary"
          stroke="none"
          dot={{ stroke: "#8884d8", strokeWidth: 2, fill: "#fff" }}
        />
      </LineChart> */

import React from "react";
import Chart from "react-apexcharts";
import {
  axisColor,
  borderColor,
  colorConfig,
  shadeColor,
} from "../../../config/constant";

const SalaryTrendChart = ({ data, width, height }) => {
  // Categorize data based on year and month
  // Categorize data based on year and month
  const categorizedData = {
    "Last 30 Days": { salaries: [] },
    "Last 3 Months": { salaries: [] },
    "Last 6 Months": { salaries: [] },
  };

  const currentDate = new Date();
  const currentMonthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const previousMonthStart = new Date(currentMonthStart);
  previousMonthStart.setMonth(currentMonthStart.getMonth() - 1);

  const last3MonthsDate = new Date(currentDate);
  last3MonthsDate.setMonth(currentDate.getMonth() - 3);

  const last6MonthsDate = new Date(currentDate);
  last6MonthsDate.setMonth(currentDate.getMonth() - 6);

  // Filter data based on time categories
  data.forEach((item) => {
    const itemDate = new Date(item.posted_date);
    const salary = item.salary;

    if (itemDate >= currentMonthStart || itemDate >= previousMonthStart) {
      categorizedData["Last 30 Days"].salaries.push(salary);
    }

    if (itemDate >= last3MonthsDate) {
      categorizedData["Last 3 Months"].salaries.push(salary);
    }

    if (itemDate >= last6MonthsDate) {
      categorizedData["Last 6 Months"].salaries.push(salary);
    }
  });

  // Calculate median for each category
  const chartData = Object.entries(categorizedData)
    .reverse()
    .map(([category, values]) => {
      const sortedSalaries = values.salaries.sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedSalaries.length / 2);
      let median =
        sortedSalaries.length % 2 === 0
          ? (sortedSalaries[middleIndex - 1] + sortedSalaries[middleIndex]) / 2
          : sortedSalaries[middleIndex];

      median = median ? median : 0;
      return {
        x: category,
        y: median.toFixed(2),
      };
    });

  // Calculate average for each category
  // const chartData = Object.entries(categorizedData)
  //   .reverse()
  //   .map(([category, values]) => {
  //     const average =
  //       values.salaries.length > 0
  //         ? values.salaries.reduce((acc, val) => acc + val, 0) /
  //           values.salaries.length
  //         : 0;
  //     return {
  //       x: category,
  //       y: average.toFixed(2),
  //     };
  //   });

  const minYValue = Math.round(
    Math.min(...chartData.map((point) => point.y)) - 1
  );
  // const maxYValue = Math.max(...chartData.map((point) => point.y)) + 1;

  const options = {
    chart: {
      id: "salary-trend-chart",
      animations: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
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
    },
    markers: {
      size: 6,
      colors: colorConfig.colors.primary,
      strokeColors: "#d4d6d5",
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
      labels: {
        style: {
          colors: axisColor,
          fontSize: "16px",
        },
      },
      offsetY: 10,
    },
    yaxis: {
      title: {
        text: "Median Salary (LPA)",
        offsetX: -20,
        style: {
          fontSize: "16px",
          fontWeight: "normal",
        },
      },
      labels: {
        show: true,
        offsetX: 20,
        trim: false,
        showDuplicates: false,
        hideOverlappingLabels: true,
        rotateAlways: true,
        style: {
          fontSize: "16px",
          colors: "#a1acb8",
        },
      },
      min: minYValue,
    },
    axisBorder: {
      show: false, // Show the Y-axis border
      color: "#a1acb8", // Color of the Y-axis border
      offsetX: -20, // Adjust the offset to position the Y-axis border
    },
  };

  return (
    <Chart
      options={options}
      series={[{ name: "Median Salary (LPA)", data: chartData }]}
      type="line"
      width={width}
      height={height}
    />
  );
};

export default SalaryTrendChart;

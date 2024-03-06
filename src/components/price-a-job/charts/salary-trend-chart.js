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
  const categorizedData = data.reduce((acc, item) => {
    const yearMonth = new Date(item.test).toISOString().slice(0, 7); // Extracting year and month
    if (!acc[yearMonth]) {
      acc[yearMonth] = { count: 0, totalSalary: 0 };
    }
    acc[yearMonth].count += 1;
    acc[yearMonth].totalSalary += item.mapped_average_sal;
    return acc;
  }, {});

  // Calculate average for each category
  const chartData = Object.entries(categorizedData).map(
    ([yearMonth, values]) => ({
      x: new Date(yearMonth + "-01").getTime(),
      y: (values.totalSalary / values.count).toFixed(2),
    })
  );

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
      width: 2,
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
      type: "datetime",
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM yyyy",
          day: "dd MMM",
        },

        style: {
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
        trim: false,
        showDuplicates: false,
        hideOverlappingLabels: true,
        rotateAlways: true,
        style: {
          fontSize: "13px",
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
      series={[{ name: "Average Salary (LPA)", data: chartData }]}
      type="line"
      width={width}
      height={height}
    />
  );
};

export default SalaryTrendChart;

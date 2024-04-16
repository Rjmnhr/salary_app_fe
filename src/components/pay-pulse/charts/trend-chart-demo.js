import React from "react";
import Chart from "react-apexcharts";
import {
  axisColor,
  borderColor,
  colorConfig,
  shadeColor,
} from "../../../config/constant";
import { useApplicationContext } from "../../../context/app-context";

const SalaryTrendChartDemo = ({ data, width, height }) => {
  const { isMobile } = useApplicationContext();

  const categorizedData = {
    "Last 6 Months": data?.growth_last_90days,
    "Last 3 Months": data?.growth_last_60days,
    "Last 30 Days": data?.growth_last_30days,
  };

  const categories = Object.keys(categorizedData);
  const growthData = Object.values(categorizedData);
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
      size: 0,
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
      categories: categories,
      labels: {
        style: {
          colors: axisColor,
          fontSize: isMobile ? "11px" : "16px",
        },
      },
      offsetY: 10,
    },
    yaxis: {
      title: {
        text: isMobile ? "" : "Median Salary (LPA)",
        offsetX: -20,
        style: {
          fontSize: isMobile ? "11px" : "16px",
          fontWeight: "normal",
        },
      },
      tickAmount: 4,
      labels: {
        formatter: function (value) {
          return value.toFixed(2);
        },
        show: !isMobile, // Show labels only if not mobile
        offsetX: 20,
        trim: false,
        showDuplicates: false,
        hideOverlappingLabels: true,
        rotateAlways: true,
        style: {
          fontSize: isMobile ? "11px" : "16px",
          colors: "#a1acb8",
        },
      },
      // min: data?.growth_last_30days - 0.2,
      // max: data?.growth_last_90days + 0.2,
    },

    axisBorder: {
      show: false,
      color: "#a1acb8",
      offsetX: isMobile ? 0 : -20, // Adjust the offset based on mobile or desktop
    },
  };

  return (
    <Chart
      options={options}
      series={[{ name: "Median Salary (LPA)", data: growthData }]}
      type="line"
      width={width}
      height={height}
    />
  );
};

export default SalaryTrendChartDemo;

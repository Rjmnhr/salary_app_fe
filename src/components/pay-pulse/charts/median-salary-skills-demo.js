import React from "react";
import Chart from "react-apexcharts";
import { axisColor, borderColor, colorConfig } from "../../../config/constant";
import { useApplicationContext } from "../../../context/app-context";

const MedianSalaryChartForSkillsDemo = ({
  data,
  skillNames,
  height,
  width,
}) => {
  // Initialize an empty array to store the median salary data for each skill

  const { isMobile } = useApplicationContext();

  const filteredSkills = data.flatMap((item) => {
    // Filter skills array to include only skills present in skillNames
    const filteredSkills = item.skills.filter((skill) =>
      skillNames?.includes(skill.skill)
    );

    // Map filtered skills to only include skill names and values
    const filteredSkillNamesValues = filteredSkills.map((skill) => ({
      skill: skill.skill,
      median: skill.value,
    }));

    return filteredSkillNamesValues;
  });

  const skillMedians = filteredSkills;

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
      {skillNames && skillNames?.length > 0 && skillMedians.length > 0 ? (
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
                  Average salary for the skill(s) you have selected
                </h5>
              </div>

              <Chart
                options={options}
                series={series}
                type="bar"
                width={width}
                height={height}
              />
              <p>Skill</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MedianSalaryChartForSkillsDemo;

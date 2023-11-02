import React, { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";

// Function to calculate the median of an array
const calculateMedian = (arr) => {
  const sortedArr = arr.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedArr.length / 2);
  if (sortedArr.length % 2 === 0) {
    return (sortedArr[middle - 1] + sortedArr[middle]) / 2;
  } else {
    return sortedArr[middle];
  }
};

const MedianSalaryChartForSkills = ({ data, skills }) => {
  // Initialize an empty array to store the median salary data for each skill
  const [chartWidth, setChartWidth] = useState(600);
  const [chartHeight, setChartHeight] = useState(300);

  useEffect(() => {
    const updateChartSize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 912) {
        setChartWidth(300);
        setChartHeight(200);
      }
      if (screenWidth < 600) {
        setChartWidth(300);
        setChartHeight(150);
      } else {
        setChartWidth(600);
        setChartHeight(300);
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
  const skillMedians = [];

  // Calculate the median salary for each skill
  skills.forEach((skill) => {
    const filteredData = data.filter((item) =>
      item.combined_skills?.toLowerCase().includes(skill?.toLowerCase())
    );
    const median = calculateMedian(
      filteredData.map((item) => item.mapped_average_sal)
    );

    // Check if the median is valid (not NaN or null) before adding it to the array
    if (!isNaN(median) && median !== null) {
      skillMedians.push({
        skill: skill,
        median: median,
      });
    }
  });

  return (
    <>
      {skills && skills?.length > 0 && skillMedians.length > 0 ? (
        <div
          className="text-center mt-3"
          style={{
            display: "grid",
            justifyItems: "center",
            alignContent: "center",
          }}
        >
          <h5>
            {" "}
            Median salary for skill(s) you have selected across{" "}
            <span className="tex-primary">India</span>
          </h5>
          <BarChart width={chartWidth} height={chartHeight} data={skillMedians}>
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
          </BarChart>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MedianSalaryChartForSkills;

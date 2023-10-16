import React from "react";

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

const CapitalizeFirstLetter = (data) => {
  // Split the string into words
  const words = data?.split(" ");
  // Capitalize the first letter of each word and make the rest lowercase
  const capitalizedWords = words?.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // Join the words back together with spaces
  return capitalizedWords?.join(" ");
};
const MedianSalaryChartForSkills = ({ data, skills }) => {
  // Initialize an empty array to store the median salary data for each skill
  const skillMedians = [];

  // Calculate the median salary for each skill
  skills.forEach((skill) => {
    const filteredData = data.filter((item) =>
      item.combined_skills.includes(skill)
    );
    const median = calculateMedian(
      filteredData.map((item) => item.mapped_average_sal)
    );
    skillMedians.push({ skill: CapitalizeFirstLetter(skill), median: median });
  });

  return (
    <>
      {skills && skills?.length > 0 ? (
        <div
          className="text-center mt-3"
          style={{
            display: "grid",
            justifyItems: "center",
            alignContent: "center",
          }}
        >
          <h5> Median salary for skills selected across india</h5>
          <BarChart width={600} height={400} data={skillMedians}>
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
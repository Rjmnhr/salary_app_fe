import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  BarChart,
  Bar,
} from "recharts";

export const BenchmarkLineCharts = ({
  data,
  xAxisDataKey,
  xValue,
  chartWidth,
  chartHeight,
}) => {
  const roleType = sessionStorage.getItem("roleType");
  return (
    <div>
      <LineChart
        width={chartWidth}
        height={chartHeight}
        data={data}
        style={{ pageBreakInside: "avoid" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis tick={null} dataKey={xAxisDataKey}>
          <Label
            value={xValue}
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
            value={` ${
              roleType === "Non-executive" ? "Fees" : "Salary"
            } (Lakhs)`}
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
            `${
              roleType === "Non-executive" ? "Fees" : "Salary"
            } : ${value} Lakhs`,
          ]}
        />

        <Line
          dataKey={`${
            roleType === "Non-executive" ? "directors_sitting_fees" : "salary"
          }`}
          type="monotone"
          name={`${roleType === "Non-executive" ? "Fees" : "Salary"}`}
          stroke="none"
          dot={{ stroke: "#8884d8", strokeWidth: 2, fill: "#fff" }}
        />
      </LineChart>
    </div>
  );
};


const calculateStatisticsSalary = (data) => {
  const roleType = sessionStorage.getItem("roleType");
  const valueType =
    roleType === "Non-executive" ? "directors_sitting_fees" : "salary";
  const salaries = data?.map((result) => result[valueType] / 100000);
  const nonZeroSalaries = salaries?.filter((salary) => salary !== 0);
  const allZeros = nonZeroSalaries?.length === 0;

  const sortedSalaries = [...nonZeroSalaries].sort((a, b) => a - b);

  return {
    percentile25: allZeros
      ? 0
      : sortedSalaries[Math.floor(0.25 * sortedSalaries.length)],
    median: allZeros
      ? 0
      : sortedSalaries[Math.floor(0.5 * sortedSalaries.length)],
    percentile75: allZeros
      ? 0
      : sortedSalaries[Math.floor(0.75 * sortedSalaries.length)],
  };
};

export const SalaryTrendGraph2 = ({
  dataWithYear2021,
  dataWithYear2022,
  dataWithYear2023,
  chartHeight,
  chartWidth,
}) => {
  const roleType = sessionStorage.getItem("roleType");

  const statisticalData2021 = calculateStatisticsSalary(dataWithYear2021);
  const statisticalData2022 = calculateStatisticsSalary(dataWithYear2022);
  const statisticalData2023 = calculateStatisticsSalary(dataWithYear2023);

  const statisticalData = [
    {
      year: 2021,
      percentile25: statisticalData2021.percentile25,
      median: statisticalData2021.median,
      percentile75: statisticalData2021.percentile75,
    },
    {
      year: 2022,
      percentile25: statisticalData2022.percentile25,
      median: statisticalData2022.median,
      percentile75: statisticalData2022.percentile75,
    },
    {
      year: 2023,
      percentile25: statisticalData2023.percentile25,
      median: statisticalData2023.median,
      percentile75: statisticalData2023.percentile75,
    },
  ];

  return (
    <LineChart
      width={chartWidth}
      height={chartHeight}
      data={statisticalData}
      style={{ pageBreakInside: "avoid" }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year"></XAxis>
      <YAxis>
        <Label
          value={` ${roleType === "Non-executive" ? "Fees" : "Salary"} (Lakhs)`}
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
      <CartesianGrid stroke="#eee" strokeDasharray="10 10" />
      <Tooltip />

      {/* Line for 25th Percentile */}
      <Line
        type="monotone"
        dataKey="percentile25"
        stroke="#8884d8"
        name="25th Percentile"
      />

      {/* Line for Median */}
      <Line type="monotone" dataKey="median" stroke="#82ca9d" name="Median" />

      {/* Line for 75th Percentile */}
      <Line
        type="monotone"
        dataKey="percentile75"
        stroke="red"
        name="75th Percentile"
      />
    </LineChart>
  );
};


export const SalaryTrendChart = ({
  resultData2021,
  resultData2022,
  resultData2023,
  chartHeight,
  chartWidth,
}) => {
  const roleType = sessionStorage.getItem("roleType");
  const valueType =
    roleType === "Non-executive" ? "directors_sitting_fees" : "salary";
  // Assuming resultData2021 and resultData2022 are arrays of objects with a 'salary' property
  const filteredData2021 = resultData2021?.filter(
    (item) => item[valueType] !== 0 && item[valueType] !== null
  );

  const filteredData2022 = resultData2022?.filter(
    (item) => item[valueType] !== 0 && item[valueType] !== null
  );
  const filteredData2023 = resultData2023?.filter(
    (item) => item[valueType] !== 0 && item[valueType] !== null
  );

  // Function to calculate the median of an array
  const calculateMedian = (arr) => {
    const sortedArr = arr?.slice().sort((a, b) => a - b);
    const middle = Math.floor(sortedArr?.length / 2);
    return sortedArr?.length % 2 === 0
      ? (sortedArr[middle - 1] + sortedArr[middle]) / 2
      : sortedArr[middle];
  };

  // Function to calculate median salary for a year
  const calculateMedianSalary = (data) => {
    const salaries = data?.map(
      (item) => parseInt(item[valueType], 10) / 100000
    );
    return calculateMedian(salaries);
  };

  const medianSalary2021 = calculateMedianSalary(filteredData2021);
  const medianSalary2022 = calculateMedianSalary(filteredData2022);
  const medianSalary2023 = calculateMedianSalary(filteredData2023);

  const data = [
    { year: "2021", medianSalary: medianSalary2021.toFixed(2) },
    { year: "2022", medianSalary: medianSalary2022.toFixed(2) },
    { year: "2023", medianSalary: medianSalary2023.toFixed(2) },
  ];

  return (
    <BarChart width={chartWidth} height={chartHeight} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year"></XAxis>

      <YAxis>
        <Label
          value={`Median ${
            roleType === "Non-executive" ? "Fees" : "Salary"
          } (Lakhs)`}
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
          `Median ${
            roleType === "Non-executive" ? "Fees" : "Salary"
          } : ${value} Lakhs`,
        ]}
      />

      <Bar dataKey="medianSalary" fill="#8884d8" name="Median Salaries" />
    </BarChart>
  );
};




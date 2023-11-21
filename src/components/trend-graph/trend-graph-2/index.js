import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";

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

const SalaryTrendGraph2 = ({
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

export default SalaryTrendGraph2;

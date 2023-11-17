import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const SalaryTrendChart = ({
  resultData2021,
  resultData2022,
  resultData2023,
}) => {
  // Assuming resultData2021 and resultData2022 are arrays of objects with a 'salary' property
  const filteredData2021 = resultData2021?.filter(
    (item) => item.salary !== 0 && item.salary !== null
  );

  const filteredData2022 = resultData2022?.filter(
    (item) => item.salary !== 0 && item.salary !== null
  );
  const filteredData2023 = resultData2023?.filter(
    (item) => item.salary !== 0 && item.salary !== null
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
    const salaries = data?.map((item) => parseInt(item.salary, 10) / 100000);
    return calculateMedian(salaries);
  };

  const medianSalary2021 = calculateMedianSalary(filteredData2021);
  const medianSalary2022 = calculateMedianSalary(filteredData2022);
  const medianSalary2023 = calculateMedianSalary(filteredData2023);

  const data = [
    { year: "2021", medianSalary: medianSalary2021 },
    { year: "2022", medianSalary: medianSalary2022 },
    { year: "2023", medianSalary: medianSalary2023 },
  ];

  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="medianSalary"
        name="Median Salaries"
        stroke="rgba(75,192,192,1)"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default SalaryTrendChart;

// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";

// export const calculateStatisticsSalary = (data) => {
//   // Calculate average salary
//   const salaries = data.map((result) => result.salary / 100000);

//   // Remove zeros from the salaries array
//   const nonZeroSalaries = salaries.filter((salary) => salary !== 0);

//   // Check if all values are zero
//   const allZeros = nonZeroSalaries.length === 0;

//   const totalSalary = allZeros
//     ? 0
//     : nonZeroSalaries.reduce((acc, val) => acc + val, 0);
//   const averageSalary = allZeros ? 0 : totalSalary / nonZeroSalaries.length;

//   // Calculate median salary
//   const sortedSalaries = [...nonZeroSalaries].sort((a, b) => a - b);
//   const middleIndex = Math.floor(sortedSalaries.length / 2);
//   const medianSalary = allZeros
//     ? 0
//     : sortedSalaries.length % 2 === 0
//     ? (sortedSalaries[middleIndex - 1] + sortedSalaries[middleIndex]) / 2
//     : sortedSalaries[middleIndex];

//   // Calculate minimum and maximum salary
//   const minSalary = allZeros ? 0 : Math.min(...nonZeroSalaries);
//   const maxSalary = allZeros ? 0 : Math.max(...nonZeroSalaries);

//   // Calculate 25th and 75th percentile values
//   const percentile25 = allZeros
//     ? 0
//     : sortedSalaries[Math.floor(0.25 * sortedSalaries.length)];
//   const percentile75 = allZeros
//     ? 0
//     : sortedSalaries[Math.floor(0.75 * sortedSalaries.length)];

//   return {
//     averageSalary,
//     medianSalary,
//     minSalary,
//     maxSalary,
//     percentile25,
//     percentile75,
//   };
// };

// const SalaryTrendGraph2 = ({ dataWithYear2021, dataWithYear2022 }) => {
//   const filteredData2021 = dataWithYear2021.filter(
//     (item) => item.salary !== 0 && item.salary !== null
//   );

//   const filteredData2022 = dataWithYear2022.filter(
//     (item) => item.salary !== 0 && item.salary !== null
//   );

//   const statistics2021 = calculateStatisticsSalary(filteredData2021);
//   const statistics2022 = calculateStatisticsSalary(filteredData2022);

//   const statisticalData2021 = [
//     { label: "Average", value: statistics2021.averageSalary },
//     { label: "Median", value: statistics2021.medianSalary },
//     { label: "Min", value: statistics2021.minSalary },
//     { label: "Max", value: statistics2021.maxSalary },
//     { label: "25th Percentile", value: statistics2021.percentile25 },
//     { label: "75th Percentile", value: statistics2021.percentile75 },
//   ];

//   const statisticalData2022 = [
//     { label: "Average", value: statistics2022.averageSalary },
//     { label: "Median", value: statistics2022.medianSalary },
//     { label: "Min", value: statistics2022.minSalary },
//     { label: "Max", value: statistics2022.maxSalary },
//     { label: "25th Percentile", value: statistics2022.percentile25 },
//     { label: "75th Percentile", value: statistics2022.percentile75 },
//   ];

//   return (
//     <LineChart
//       width={600}
//       height={300}
//       margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
//     >
//       <XAxis dataKey="index" />
//       <YAxis />
//       <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
//       <Tooltip />
//       <Legend />

//       {statisticalData2021.map(({ label, value }) => (
//         <Line
//           key={`2021-${label}`}
//           data={[{ index: 0, value }]}
//           type="monotone"
//           dataKey="value"
//           stroke="#ff0000" // You can customize the color
//           name={`2021 - ${label}`}
//         />
//       ))}

//       {/* Lines for 2022 statistical data */}
//       {statisticalData2022.map(({ label, value }) => (
//         <Line
//           key={`2022-${label}`}
//           data={[{ index: , value }]}
//           type="monotone"
//           dataKey="value"
//           stroke="#00ff00" // You can customize the color
//           name={`2022 - ${label}`}
//         />
//       ))}
//     </LineChart>
//   );
// };

// export default SalaryTrendGraph2;

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

const calculateStatisticsSalary = (data) => {
  const salaries = data?.map((result) => result.salary / 100000);
  const nonZeroSalaries = salaries?.filter((salary) => salary !== 0);
  const allZeros = nonZeroSalaries.length === 0;

  const sortedSalaries = [...nonZeroSalaries].sort((a, b) => a - b);

  return {
    min: allZeros ? 0 : Math.min(...nonZeroSalaries),
    percentile25: allZeros
      ? 0
      : sortedSalaries[Math.floor(0.25 * sortedSalaries.length)],
    median: allZeros
      ? 0
      : sortedSalaries[Math.floor(0.5 * sortedSalaries.length)],
    percentile75: allZeros
      ? 0
      : sortedSalaries[Math.floor(0.75 * sortedSalaries.length)],
    max: allZeros ? 0 : Math.max(...nonZeroSalaries),
  };
};

const SalaryTrendGraph2 = ({ dataWithYear2021, dataWithYear2022 }) => {
  const filteredData2021 = dataWithYear2021?.filter(
    (item) => item.salary !== 0 && item.salary !== null
  );

  const filteredData2022 = dataWithYear2022?.filter(
    (item) => item.salary !== 0 && item.salary !== null
  );
  const statisticalData2021 = calculateStatisticsSalary(filteredData2021);
  const statisticalData2022 = calculateStatisticsSalary(filteredData2022);

  const statisticalData = [
    {
      index: 0,
      label: "Min",
      value2021: statisticalData2021.min,
      value2022: statisticalData2022.min,
    },
    {
      index: 1,
      label: "25th Percentile",
      value2021: statisticalData2021.percentile25,
      value2022: statisticalData2022.percentile25,
    },
    {
      index: 2,
      label: "Median",
      value2021: statisticalData2021.median,
      value2022: statisticalData2022.median,
    },
    {
      index: 3,
      label: "75th Percentile",
      value2021: statisticalData2021.percentile75,
      value2022: statisticalData2022.percentile75,
    },
    {
      index: 4,
      label: "Max",
      value2021: statisticalData2021.max,
      value2022: statisticalData2022.max,
    },
  ];
  return (
    <LineChart width={800} height={400} data={statisticalData}>
      <XAxis dataKey="label" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="10 10" />
      <Tooltip />
      <Legend />

      {/* Line for 2021 statistical data */}
      <Line type="monotone" dataKey="value2021" stroke="#8884d8" name="2021" />

      {/* Line for 2022 statistical data */}
      <Line type="monotone" dataKey="value2022" stroke="#82ca9d" name="2022" />
    </LineChart>
  );
};

export default SalaryTrendGraph2;

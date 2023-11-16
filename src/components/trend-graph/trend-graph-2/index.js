import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";

const calculateStatisticsSalary = (data) => {
  const salaries = data?.map((result) => result.salary / 100000);
  const nonZeroSalaries = salaries?.filter((salary) => salary !== 0);
  const allZeros = nonZeroSalaries?.length === 0;

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

const SalaryTrendGraph2 = ({
  dataWithYear2021,
  dataWithYear2022,
  dataWithYear2023,
  chartWidth,
  chartHeight,
}) => {
  const filteredData2021 = dataWithYear2021?.filter(
    (item) => item.salary !== 0 && item.salary !== null
  );

  const filteredData2022 = dataWithYear2022?.filter(
    (item) => item.salary !== 0 && item.salary !== null
  );
  const filteredData2023 = dataWithYear2023?.filter(
    (item) => item.salary !== 0 && item.salary !== null
  );
  const statisticalData2021 = calculateStatisticsSalary(filteredData2021);
  const statisticalData2022 = calculateStatisticsSalary(filteredData2022);
  const statisticalData2023 = calculateStatisticsSalary(filteredData2023);

  const statisticalData = [
    {
      index: 0,
      label: "Min",
      value2021: statisticalData2021.min,
      value2022: statisticalData2022.min,
      value2023: statisticalData2023.min,
    },
    {
      index: 1,
      label: "25th Percentile",
      value2021: statisticalData2021.percentile25,
      value2022: statisticalData2022.percentile25,
      value2023: statisticalData2023.percentile25,
    },
    {
      index: 2,
      label: "Median",
      value2021: statisticalData2021.median,
      value2022: statisticalData2022.median,
      value2023: statisticalData2023.median,
    },
    {
      index: 3,
      label: "75th Percentile",
      value2021: statisticalData2021.percentile75,
      value2022: statisticalData2022.percentile75,
      value2023: statisticalData2023.percentile75,
    },
    {
      index: 4,
      label: "Max",
      value2021: statisticalData2021.max,
      value2022: statisticalData2022.max,
      value2023: statisticalData2023.max,
    },
  ];
  return (
    <LineChart width={chartWidth} height={chartHeight} data={statisticalData}>
      <XAxis dataKey="label" />
      <YAxis>
        <Label
          value="Salary (Lakhs)"
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
      <Legend />

      {/* Line for 2021 statistical data */}
      <Line type="monotone" dataKey="value2021" stroke="#8884d8" name="2021" />

      {/* Line for 2022 statistical data */}
      <Line type="monotone" dataKey="value2022" stroke="#82ca9d" name="2022" />
      <Line type="monotone" dataKey="value2023" stroke="red" name="2023" />
    </LineChart>
  );
};

export default SalaryTrendGraph2;

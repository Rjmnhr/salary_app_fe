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

const BenchmarkLineCharts = ({
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

export default BenchmarkLineCharts;

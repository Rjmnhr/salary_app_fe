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
        <Tooltip
          formatter={(value, name, props) => [`Salary : ${value} Lakhs`]}
        />

        <Line
          type="monotone"
          dataKey="salary"
          name="Salary"
          stroke="#8884d8"
          dot={false} // Disable data points
        />
      </LineChart>
    </div>
  );
};

export default BenchmarkLineCharts;


import React from "react";
import { CartesianGrid, Label, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const IndividualSalaryLineChart = ({ title, width, height, data }) => {
  return (
    <div>
      {" "}
      <LineChart
        width={width}
        height={height}
        data={data}
        style={{ pageBreakInside: "avoid" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis tick={false} dataKey="mapped_job_title_1">
          <Label
            value={`Different Job Roles in ${title}`}
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
            value="Salary (LPA)"
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
          formatter={(value, name, props) => [`${name} : ${value} LPA`]}
          labelFormatter={() => <p></p>}
        />

        <Line
          type="monotone"
          dataKey="mapped_average_sal"
          name="Salary"
          stroke="#8884d8"
          dot={false} // Disable data points
        />
      </LineChart>
    </div>
  );
};

export default IndividualSalaryLineChart;

import Chart from "react-apexcharts";
import { useApplicationContext } from "../../../context/app-context";
// const COLORS = ["#e08963", "#38908f", "#b2ebe0", "#5e96ae", "#ffbfa3"];

export const SimplePieChart = ({
  title,
  width,
  dataWithPercent,
  data,
  height,
}) => {
  const { isMobile } = useApplicationContext();

  const options = {
    labels: data.map((entry) => entry.name),
    dataLabels: {
      enabled: isMobile ? true : true,
    },
    legend: {
      position: "bottom",
      itemMargin: {
        horizontal: 5, // Set the horizontal spacing between legend items
        vertical: 10, // Set the vertical spacing between legend items
      },
      formatter: function (seriesName) {
        return seriesName; // Customize the legend item format as needed
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -15, // Adjust the position of the data labels
          minAngleToShowLabel: 10, // Minimum angle to show data label (optional)
          style: {
            fontSize: "16px",
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = dataWithPercent.map((entry) => parseFloat(entry.percentage));
  return (
    <div
      className="text-center mt-3"
      style={{
        display: "grid",
        justifyItems: "center",
        alignContent: "center",
      }}
    >
      <div className="d-flex justify-content-center">
        <h5 className={`mb-5 mt-3  ${isMobile ? "w-75" : "w-100"} `}>
          Most five common skills for {title?.toLowerCase()}{" "}
        </h5>
      </div>

      <Chart
        options={options}
        series={series}
        type="pie"
        width={width}
        height={400}
      />
    </div>
  );
};
/* <PieChart width={width} height={width}>
<Pie
  data={dataWithPercent}
  dataKey="value"
  cx={width / 2}
  cy={width / 2}
  outerRadius={width * 0.2}
  fill="#8884d8"
  label={({ percentage }) => `${percentage}%`} // Display name and percentage
>
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
</Pie>
<Legend />
</PieChart> */


import Chart from "react-apexcharts";
// const COLORS = ["#e08963", "#38908f", "#b2ebe0", "#5e96ae", "#ffbfa3"];

export const SimplePieChart = ({ title, width, dataWithPercent, data }) => {
  // const options = {
  //   chart: {
  //     type: "pie",
  //     width: width,
  //     offsetY: 0,
  //   },
  //   labels: data.map((entry) => entry.name),
  //   legend: {
  //     show: true,
  //     position: "bottom",
  //   },
  //   colors: COLORS,
  //   responsive: [
  //     {
  //       breakpoint: 480,
  //       options: {
  //         legend: {
  //           position: "bottom",
  //         },
  //       },
  //     },
  //   ],
  // };
  const options = {
    labels: data.map((entry) => entry.name),

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

  const series = dataWithPercent.map((entry) => entry.value);
  return (
    <div
      className="text-center mt-3"
      style={{
        display: "grid",
        justifyItems: "center",
        alignContent: "center",
      }}
    >
      <h5 className="mb-5">Most five common skills for {title} </h5>

      <Chart options={options} series={series} type="pie" width={width} />
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

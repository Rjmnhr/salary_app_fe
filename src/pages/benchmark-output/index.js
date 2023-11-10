import React from "react";
import NavBar from "../../components/nav-bar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AimOutlined } from "@ant-design/icons";
import "../reports-page/style.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const decimalFix = (number) => {
  const trimmed = Math.floor(number * 100) / 100;
  return trimmed;
};

function CompaniesList({ data }) {
  return (
    <div>
      <p>
        <span>Companies :</span>{" "}
        <span style={{ fontSize: "14px" }}> {data.join(", ")}</span>
      </p>
    </div>
  );
}
const BenchmarkOutput = () => {
  const resultData = JSON.parse(sessionStorage.getItem("result-data"));
  const [expanded, setExpanded] = React.useState(false);
  const role = sessionStorage.getItem("role");
  const storedOption = sessionStorage.getItem("option");
  const storedCompanies = JSON.parse(sessionStorage.getItem("companies"));

  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  function calculateStatisticsSalary(data) {
    // Calculate average salary
    const salaries = data.map((result) => result.salary / 100000);

    // Remove zeros from the salaries array
    const nonZeroSalaries = salaries.filter((salary) => salary !== 0);

    // Check if all values are zero
    const allZeros = nonZeroSalaries.length === 0;

    const totalSalary = allZeros
      ? 0
      : nonZeroSalaries.reduce((acc, val) => acc + val, 0);
    const averageSalary = allZeros ? 0 : totalSalary / nonZeroSalaries.length;

    // Calculate median salary
    const sortedSalaries = [...nonZeroSalaries].sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedSalaries.length / 2);
    const medianSalary = allZeros
      ? 0
      : sortedSalaries.length % 2 === 0
      ? (sortedSalaries[middleIndex - 1] + sortedSalaries[middleIndex]) / 2
      : sortedSalaries[middleIndex];

    // Calculate minimum and maximum salary
    const minSalary = allZeros ? 0 : Math.min(...nonZeroSalaries);
    const maxSalary = allZeros ? 0 : Math.max(...nonZeroSalaries);

    // Calculate 25th and 75th percentile values
    const percentile25 = allZeros
      ? 0
      : sortedSalaries[Math.floor(0.25 * sortedSalaries.length)];
    const percentile75 = allZeros
      ? 0
      : sortedSalaries[Math.floor(0.75 * sortedSalaries.length)];

    return {
      averageSalary,
      medianSalary,
      minSalary,
      maxSalary,
      percentile25,
      percentile75,
    };
  }

  function calculateStatisticsFees(data) {
    // Calculate average salary
    const salaries = data.map(
      (result) => result.directors_sitting_fees / 100000
    );

    // Remove zeros from the salaries array
    const nonZeroSalaries = salaries.filter((salary) => salary !== 0);

    // Check if all values are zero
    const allZeros = nonZeroSalaries.length === 0;

    const totalSalary = allZeros
      ? 0
      : nonZeroSalaries.reduce((acc, val) => acc + val, 0);
    const averageSalary = allZeros ? 0 : totalSalary / nonZeroSalaries.length;

    // Calculate median salary
    const sortedSalaries = [...nonZeroSalaries].sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedSalaries.length / 2);
    const medianSalary = allZeros
      ? 0
      : sortedSalaries.length % 2 === 0
      ? (sortedSalaries[middleIndex - 1] + sortedSalaries[middleIndex]) / 2
      : sortedSalaries[middleIndex];

    // Calculate minimum and maximum salary
    const minSalary = allZeros ? 0 : Math.min(...nonZeroSalaries);
    const maxSalary = allZeros ? 0 : Math.max(...nonZeroSalaries);

    // Calculate 25th and 75th percentile values
    const percentile25 = allZeros
      ? 0
      : sortedSalaries[Math.floor(0.25 * sortedSalaries.length)];
    const percentile75 = allZeros
      ? 0
      : sortedSalaries[Math.floor(0.75 * sortedSalaries.length)];

    return {
      averageSalary,
      medianSalary,
      minSalary,
      maxSalary,
      percentile25,
      percentile75,
    };
  }

  // Calculate statistics for jobsData
  const statisticsForSalary = calculateStatisticsSalary(resultData);
  const statisticsForFees = calculateStatisticsFees(resultData);

  return (
    <>
      <NavBar />
      <div
        className="container-fluid  d-lg-flex justify-content-center align-items-start 
         "
        style={{ padding: "0", marginTop: "90px" }}
      >
        <div
          className="container-fluid p-3 col-12 col-lg-3  reports-list scrollable-container"
          style={{
            overflowY: "scroll",
            maxHeight: "100vh",
            transform: "transition 0.3s all ease",
          }}
        >
          <Card
            className={`card selectable-tab p-2 px-3 text-left mb-3 selected-tab
                         
                          `}
            style={{ cursor: "pointer" }}
          >
            <p style={{ fontWeight: "500" }} className="fw-b text-primary">
              {role}
            </p>

            {storedOption === "index" ? (
              <p
                className=" border-right px-2"
                style={{
                  borderRight: "1px solid",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <AimOutlined /> Based on index
              </p>
            ) : (
              <p
                className=" border-right px-2"
                style={{
                  borderRight: "1px solid",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <AimOutlined /> Hand selected
              </p>
            )}

            <CardActions disableSpacing>
              <p style={{ margin: "0" }}>See More</p>
              <ExpandMore
                expand={expanded[0] || false}
                onClick={() => handleExpandClick(0)}
                aria-expanded={expanded[0] || false}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded[0] || false} timeout="auto" unmountOnExit>
              <div>
                <CompaniesList data={storedCompanies} />
              </div>
            </Collapse>
          </Card>
        </div>

        <div
          className="container-fluid col-12 col-lg-9  d-grid "
          style={{
            background: "rgba(0, 0, 0, 0.02)",
            height: "100vh",
            justifyItems: "center",
          }}
        >
          <>
            {resultData.length > 1 ? (
              <div
                className="container  col-lg-11 col-12 m-lg-3 m-2 p-1 text-left scrollable-container"
                style={{
                  background: "white",
                  height: "100vh",
                  overflowY: "scroll",
                }}
              >
                <div className="p-lg-3 p-1">
                  <h3>{role} Benchmark Report</h3>
                  <div className="mt-3 mb-3">
                    <h5 className="mb-2">Average Salary </h5>
                    <p className="fs-3">
                      ₹ {decimalFix(statisticsForSalary.averageSalary)} Lakhs{" "}
                    </p>
                  </div>
                  <div className="mt-3 mb-3">
                    <h5 className="mb-2">Average Fees </h5>
                    <p className="fs-3">
                      ₹ {decimalFix(statisticsForFees.averageSalary)} Lakhs{" "}
                    </p>
                  </div>
                  <h5 className="mb-3">Salary details</h5>
                  <div className="d-flex mb-3 mt-3">
                    <div style={{ height: "100px", width: "10%" }}>
                      <svg height="30" width="100%">
                        <defs>
                          <linearGradient
                            id="default-bar"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop style={{ stopColor: "#fff" }} />
                            <stop
                              offset="100%"
                              style={{ stopColor: "#e9e9ec" }}
                            />
                          </linearGradient>
                        </defs>
                        <rect
                          x="0"
                          y="0"
                          width="100%"
                          height="100%"
                          fill="url('#default-bar')"
                        ></rect>
                        Sorry, your browser does not support inline SVG.
                      </svg>
                      <div className="w-100 text-start mt-2">
                        <p
                          className="stripe-text"
                          style={{
                            fontWeight: "bold",
                            margin: "0",
                            color: "gray",
                          }}
                        >
                          Min
                        </p>
                        <p
                          className="stripe-text"
                          style={{ fontWeight: "bold", color: "gray" }}
                        >
                          {decimalFix(statisticsForSalary.minSalary)} Lakhs
                        </p>
                      </div>
                    </div>
                    <div style={{ height: "100px", width: "15%" }}>
                      <div
                        style={{
                          height: "30px",
                          width: "100%",
                          background: "#00aaa4",
                        }}
                      ></div>
                    </div>
                    ​{" "}
                    <div style={{ height: "100px", width: "50%" }}>
                      <svg height="30" width="100%">
                        <defs>
                          <linearGradient
                            id="default-middleBar"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop
                              offset="0%"
                              style={{ stopColor: "#18969b", stopOpacity: 1 }}
                            />
                            <stop
                              offset="100%"
                              style={{ stopColor: "#2d67b9", stopOpacity: 1 }}
                            />
                          </linearGradient>
                        </defs>
                        <rect
                          x="0"
                          y="0"
                          width="100%"
                          height="100%"
                          fill="url('#default-middleBar')"
                        />
                        {/* Vertical dotted line in the middle */}
                        <line
                          x1="50%"
                          y1="0"
                          x2="50%"
                          y2="100%"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                        Sorry, your browser does not support inline SVG.
                      </svg>
                      <div className="w-100 d-flex justify-content-between">
                        <div className="w-100 text-start mt-2">
                          <p
                            className="stripe-text"
                            style={{
                              fontWeight: "bold",
                              margin: "0",
                              color: "gray",
                            }}
                          >
                            25th Percentile
                          </p>
                          <p
                            className="stripe-text"
                            style={{ fontWeight: "bold", color: "gray" }}
                          >
                            {decimalFix(statisticsForSalary.percentile25)} Lakhs
                          </p>
                        </div>
                        <div className="w-100 text-center mt-2">
                          <p
                            className="stripe-text"
                            style={{
                              fontWeight: "bold",
                              margin: "0",
                              color: "gray",
                            }}
                          >
                            MEDIAN
                          </p>
                          <p
                            className="stripe-text"
                            style={{ fontWeight: "bold", color: "gray" }}
                          >
                            {decimalFix(statisticsForSalary.medianSalary)} Lakhs
                          </p>
                        </div>
                        <div className="w-100 text-right mt-2">
                          <p
                            className="stripe-text"
                            style={{
                              fontWeight: "bold",
                              margin: "0",
                              color: "gray",
                            }}
                          >
                            75th Percentile
                          </p>
                          <p
                            className="stripe-text"
                            style={{ fontWeight: "bold", color: "gray" }}
                          >
                            {decimalFix(statisticsForSalary.percentile75)} Lakhs
                          </p>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: "100px", width: "15%" }}>
                      <div
                        style={{
                          height: "30px",
                          width: "100%",
                          background: "#3b7dd8",
                        }}
                      ></div>
                    </div>
                    <div style={{ height: "100px", width: "10%" }}>
                      <svg
                        height="30"
                        width="100%"
                        style={{ transform: "rotate(180deg)" }}
                      >
                        <defs>
                          <linearGradient
                            id="default-bar"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop style={{ stopColor: "#fff" }} />
                            <stop
                              offset="100%"
                              style={{ stopColor: "#e9e9ec" }}
                            />
                          </linearGradient>
                        </defs>
                        <rect
                          x="0"
                          y="0"
                          width="100%"
                          height="100%"
                          fill="url('#default-bar')"
                        ></rect>
                        Sorry, your browser does not support inline SVG.
                      </svg>
                      <div className="w-100 text-right mt-2">
                        <p
                          className="stripe-text"
                          style={{
                            fontWeight: "bold",
                            margin: "0",
                            color: "gray",
                          }}
                        >
                          Max
                        </p>
                        <p
                          className="stripe-text"
                          style={{ fontWeight: "bold", color: "gray" }}
                        >
                          {decimalFix(statisticsForSalary.maxSalary)} Lakhs
                        </p>
                      </div>
                    </div>
                  </div>
                  <h5 className="mb-3">Fees details</h5>
                  <div className="d-flex mb-3 mt-3">
                    <div style={{ height: "100px", width: "10%" }}>
                      <svg height="30" width="100%">
                        <defs>
                          <linearGradient
                            id="default-bar"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop style={{ stopColor: "#fff" }} />
                            <stop
                              offset="100%"
                              style={{ stopColor: "#e9e9ec" }}
                            />
                          </linearGradient>
                        </defs>
                        <rect
                          x="0"
                          y="0"
                          width="100%"
                          height="100%"
                          fill="url('#default-bar')"
                        ></rect>
                        Sorry, your browser does not support inline SVG.
                      </svg>
                      <div className="w-100 text-start mt-2">
                        <p
                          className="stripe-text"
                          style={{
                            fontWeight: "bold",
                            margin: "0",
                            color: "gray",
                          }}
                        >
                          Min
                        </p>
                        <p
                          className="stripe-text"
                          style={{ fontWeight: "bold", color: "gray" }}
                        >
                          {decimalFix(statisticsForFees.minSalary)} Lakhs
                        </p>
                      </div>
                    </div>
                    <div style={{ height: "100px", width: "15%" }}>
                      <div
                        style={{
                          height: "30px",
                          width: "100%",
                          background: "#00aaa4",
                        }}
                      ></div>
                    </div>
                    ​{" "}
                    <div style={{ height: "100px", width: "50%" }}>
                      <svg height="30" width="100%">
                        <defs>
                          <linearGradient
                            id="default-middleBar"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop
                              offset="0%"
                              style={{ stopColor: "#18969b", stopOpacity: 1 }}
                            />
                            <stop
                              offset="100%"
                              style={{ stopColor: "#2d67b9", stopOpacity: 1 }}
                            />
                          </linearGradient>
                        </defs>
                        <rect
                          x="0"
                          y="0"
                          width="100%"
                          height="100%"
                          fill="url('#default-middleBar')"
                        />
                        {/* Vertical dotted line in the middle */}
                        <line
                          x1="50%"
                          y1="0"
                          x2="50%"
                          y2="100%"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                        Sorry, your browser does not support inline SVG.
                      </svg>
                      <div className="w-100 d-flex justify-content-between">
                        <div className="w-100 text-start mt-2">
                          <p
                            className="stripe-text"
                            style={{
                              fontWeight: "bold",
                              margin: "0",
                              color: "gray",
                            }}
                          >
                            25th Percentile
                          </p>
                          <p
                            className="stripe-text"
                            style={{ fontWeight: "bold", color: "gray" }}
                          >
                            {decimalFix(statisticsForFees.percentile25)} Lakhs
                          </p>
                        </div>
                        <div className="w-100 text-center mt-2">
                          <p
                            className="stripe-text"
                            style={{
                              fontWeight: "bold",
                              margin: "0",
                              color: "gray",
                            }}
                          >
                            MEDIAN
                          </p>
                          <p
                            className="stripe-text"
                            style={{ fontWeight: "bold", color: "gray" }}
                          >
                            {decimalFix(statisticsForFees.medianSalary)} Lakhs
                          </p>
                        </div>
                        <div className="w-100 text-right mt-2">
                          <p
                            className="stripe-text"
                            style={{
                              fontWeight: "bold",
                              margin: "0",
                              color: "gray",
                            }}
                          >
                            75th Percentile
                          </p>
                          <p
                            className="stripe-text"
                            style={{ fontWeight: "bold", color: "gray" }}
                          >
                            {decimalFix(statisticsForFees.percentile75)} Lakhs
                          </p>
                        </div>
                      </div>
                    </div>
                    <div style={{ height: "100px", width: "15%" }}>
                      <div
                        style={{
                          height: "30px",
                          width: "100%",
                          background: "#3b7dd8",
                        }}
                      ></div>
                    </div>
                    <div style={{ height: "100px", width: "10%" }}>
                      <svg
                        height="30"
                        width="100%"
                        style={{ transform: "rotate(180deg)" }}
                      >
                        <defs>
                          <linearGradient
                            id="default-bar"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop style={{ stopColor: "#fff" }} />
                            <stop
                              offset="100%"
                              style={{ stopColor: "#e9e9ec" }}
                            />
                          </linearGradient>
                        </defs>
                        <rect
                          x="0"
                          y="0"
                          width="100%"
                          height="100%"
                          fill="url('#default-bar')"
                        ></rect>
                        Sorry, your browser does not support inline SVG.
                      </svg>
                      <div className="w-100 text-right mt-2">
                        <p
                          className="stripe-text"
                          style={{
                            fontWeight: "bold",
                            margin: "0",
                            color: "gray",
                          }}
                        >
                          Max
                        </p>
                        <p
                          className="stripe-text"
                          style={{ fontWeight: "bold", color: "gray" }}
                        >
                          {decimalFix(statisticsForFees.maxSalary)} Lakhs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  justifyItems: "start",
                  textAlign: "start",
                }}
                className="mt-1 mt-lg-3"
              >
                <div
                  className="d-lg-flex justify-content-lg-start justify-content-center align-items-center p-3 text-lg-left text-center"
                  style={{ background: "#fff" }}
                >
                  <div>
                    <h2>Your report was unsuccessful</h2>
                    <p>
                      Sorry! We haven't collected enough data yet to generate
                      this report. Check back soon
                    </p>
                  </div>

                  <img
                    src="https://www.payscale.com/content/market-worth-promo@2x.png"
                    alt=""
                    height={200}
                    width={300}
                  />
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default BenchmarkOutput;

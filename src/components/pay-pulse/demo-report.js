import React from "react";
// import { Tabs } from "antd";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";

// import { RadialChart } from "react-vis";
import "./custom-style.css";
import { decimalFix } from "../../utils/price-a-job-helper-functions";
import LinearSalaryChart from "./charts/linear-salary-chart";
import { useApplicationContext } from "../../context/app-context";

const PayPulseReportComponentDemo = ({ demoData }) => {
  const { isMobile } = useApplicationContext();

  return (
    <>
      {/* <div
        className="container  col-lg-11 col-12 m-lg-3 m-2 p-1 text-left scrollable-container"
        style={{
          background: "white",
          height: "85vh",

          overflowY: isMobile ? "" : "scroll",
        }}
      >
        <div className="p-lg-3 p-1">
          <h3>{storedT} Salary Report</h3>
          <div className="d-lg-flex justify-content-start align-items-center">
            <p
              className=" border-right px-2"
              style={{
                borderRight: "1px solid",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <CalendarOutlined /> Experience : {experience} years
            </p>

            <p
              className=" border-right px-2"
              style={{ display: "flex", alignItems: "center", gap: "3px" }}
            >
              {" "}
              <EnvironmentOutlined /> {location}
            </p>
          </div>
          <div>
         
          </div>
          <p
            style={{
              fontSize: "14px",
              textAlign: "center",
              display: "grid",
              placeItems: "center",
            }}
            className="text-primary"
          >
            The charts below show data for roles in {location} with {experience}{" "}
            year(s) of experience{" "}
            {skillsBool !== null
              ? skillsBool
                ? " and selected skill(s)"
                : ". It doesn't show data for the skill(s) you have selected."
              : ""}
          </p>
          <div className="mt-3">
            <h5 className="mb-2">Average Salary </h5>
            <p className="fs-3">
              ₹ {decimalFix(statisticsForJobsData.averageSalary)} Lakhs Per
              Annum (LPA)
            </p>

            <p className="text-primary ">In {location}</p>
            <LinearSalaryChart data={statisticsForJobsData} />
            <p className="text-primary ">Across India</p>

            <LinearSalaryChart data={statisticsForJobsDataByRole} />

            <p style={{ fontSize: "14px" }} className="my-3 text-center">
              End of the report
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default PayPulseReportComponentDemo;

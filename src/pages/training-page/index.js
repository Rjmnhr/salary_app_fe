import React from "react";
import NavBar from "../../components/nav-bar";

const TrainingPage = () => {
  return (
    <>
      <NavBar />
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          justifyItems: "center",
          alignContent: "center",
          marginTop: "100px",
        }}
        className="col-12 section-title "
      >
        <h2 style={{ width: "100%" }} className="col-12 ">
          Your Training Partner
        </h2>
        <div className="text-left p-3">
          <h5 className="mb-2">
            {" "}
            Our training program is unlike other training programs in the
            market. We don't discuss basic theories about compensation or
            information that is readily found on google/youtube.{" "}
          </h5>
          <h5 className="mb-2">
            Our training program has been designed keeping the pragmatic
            compensation professional in mind. The primary focus of our training
            program are to:
          </h5>
          <div class="container col-12 container-fluid   bg-light rounded-3 p-3 p-lg-5 mt-3  ">
            <ul style={{ fontWeight: "bold" }}>
              <li className="mb-2">
                <span style={{ fontWeight: "bold" }}>
                  Make you more strategic
                </span>{" "}
                - we help you understand how compensation programs are built and
                how they align with corporate goals and business objectives
              </li>
              <li className="mb-2">
                Make you understand business drivers and how to link various HR
                functions together with well designed compensation programs
              </li>
              <li className="mb-2">
                Provide you with a framework and real-life case studies that
                will help you determine if your programs are working and is best
                practice
              </li>
              <li className="mb-2">
                Make you 360 degree leader with an understanding of business
                strategy, finance, sales and marketing and HR
              </li>
              <li className="mb-2">
                Discuss first principles of design and implementation of various
                incentive plans
              </li>
              <li className="mb-2">
                Learn about emerging trends in compensation and executive
                compensation including Combined Incentive Plans and executive
                benchmarking
              </li>
            </ul>
          </div>

          <h5 className="mt-3">
            Most importantly, you will also learn from fellow practitioners
            about how their business operates and how compensation programs vary
            among sectors and stage of maturity
          </h5>
          <h5>
            There are multiple training programs we run. Please enquire with us
            to discuss your specific needs.
          </h5>
          <div class="container col-12 container-fluid   bg-light rounded-3  p-3 p-lg-5 mt-3 ">
            <ul style={{ fontWeight: "bold" }}>
              <li className="mb-2">Compensation masterclass</li>
              <li className="mb-2">Long Term Incentive design</li>
              <li className="mb-2">
                Compensation principles for line managers
              </li>
              <li className="mb-2">Effective Sales Incentive Plan design</li>
              <li className="mb-2">Executive Compensation</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingPage;

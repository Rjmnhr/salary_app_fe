import React from "react";

import { useNavigate } from "react-router-dom";
import { ArrowRightAltOutlined } from "@mui/icons-material";

import NavBar from "../../components/nav-bar/index";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div
        className="container-fluid "
        style={{
          background: "#daf0f5",

          marginTop: "80px",
        }}
      >
        <section id="about" className="about ">
          <div className="container" data-aos="fade-up">
            <div className="row no-gutters">
              <div className="content col-xl-5 d-flex align-items-stretch">
                <div className="content">
                  <h1
                    style={{
                      textAlign: "start",
                      fontSize: "70px",
                      fontWeight: "bold",
                    }}
                  >
                    PRICE A JOB
                  </h1>
                  <div
                    style={{
                      width: "100%",
                      textAlign: "start",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <button
                      onClick={() => navigate("/price-a-job")}
                      style={{
                        fontSize: "20px",
                        marginTop: "10px",
                        background: "linear-gradient(90deg,#2d67b9,#235090)",
                        color: "white",
                      }}
                      className="btn "
                    >
                      GO{" "}
                      <span>
                        <ArrowRightAltOutlined />
                      </span>
                    </button>

                    {/* <a href="#contact" className="btn-get-started scrollto">
                    Use Free Profile Evaluator
                  </a> */}
                  </div>
                </div>
              </div>
              <div></div>
              <div className="col-xl-7 d-flex align-items-stretch">
                <div className="icon-boxes d-flex flex-column justify-content-center">
                  <div className="section-title">
                    <h2>Why choose us?</h2>
                  </div>
                  <div className="row">
                    <div
                      className="col-md-6 icon-box"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      <i className="bx bx-receipt"></i>
                      <h4>Real Time</h4>
                      <p className="text-left">
                        This is completely real-time – no more waiting for 6
                        months to 12 months to get most recent data from Salary
                        surveys. Our data gets uploaded each week.
                      </p>
                    </div>
                    <div
                      className="col-md-6 icon-box"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <i className="bx bx-cube-alt"></i>
                      <h4>Instant Response</h4>
                      <p className="text-left">
                        You don’t need to spend weeks on submitting data in
                        salary surveys – just access our tool anytime.
                      </p>
                    </div>

                    <div
                      className="col-md-6 icon-box"
                      data-aos="fade-up"
                      data-aos-delay="300"
                    >
                      <i className="bx bx-images"></i>
                      <h4>See Market Movement</h4>
                      <p className="text-left">
                        You don’t need to spend weeks on submitting data in
                        salary surveys – just access our tool anytime.
                      </p>
                    </div>

                    <div
                      className="col-md-6 icon-box"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      <i className="bx bx-receipt"></i>
                      <h4>Affordable Package</h4>
                      <p className="text-left">
                        The best part, accessing our tool is about a third the
                        cost you pay for Salary survey.
                      </p>
                    </div>
                    <div
                      className="col-md-6 icon-box"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      <i className="bx bx-receipt"></i>
                      <h4>Search by Location</h4>
                      <p className="text-left">
                        Salary surveys very rarely give you information about
                        city/location premiums – our proprietary tool will give
                        you salary data by city and locations. This is
                        completely real-time – no more waiting for 6 months to
                        12 months to get most recent data from Salary surveys.
                        Our data gets uploaded each week.
                      </p>
                    </div>
                    <div
                      className="col-md-6 icon-box"
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      <i className="bx bx-shield"></i>
                      <h4>Search by Skill</h4>
                      <p className="text-left">
                        Salary surveys don’t tell you salaries by skills
                        required for the job. Our tool allows you to see which
                        skills are more in demand and how much you should be
                        paying for that salary.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;

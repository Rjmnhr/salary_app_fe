import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BgVideo from "../../video/demo.mp4";
import DownloadSamplePDF from "../../components/pay-pulse/download-sample-pdf";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import AxiosInstance from "../../config/axios";
import NavBar from "../../components/layout/nav-bar";
import FooterComponent from "../../components/layout/footer";
import Cookies from "js-cookie";

const PayPulseLandingPage = () => {
  const navigate = useNavigate();
  const [activateDashboard, setActivateDashboard] = useState(false);
  const accessToken = Cookies.get("accessToken");
  const location = window.location.href;
  const userID = localStorage.getItem("user_id");
  sessionStorage.removeItem("activeIndex");
  useEffect(() => {
    AxiosInstance.post(
      `/api/track-data/store3`,
      { path: location, id: userID },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        //eslint-disable-next-line
        const data = await response.data;
      })
      .catch((err) => console.log(err));

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (accessToken) {
      AxiosInstance.post(
        "/api/report/get",
        { payload: "payload" },

        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${accessToken}`,
          },
        }
      )
        .then(async (response) => {
          const data = await response.data;
          if (data?.length > 0) {
            setActivateDashboard(true);
          } else {
            setActivateDashboard(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [accessToken]);
  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    // Set start time when the component mounts
    setStartTime(Date.now());

    // Add an event listener for the beforeunload event
    const handleBeforeUnload = () => {
      // Calculate time spent
      const endTime = Date.now();
      const timeSpentInSeconds = (endTime - startTime) / 1000;

      // Send the data to your backend
      AxiosInstance.post(
        `/api/track-data/store2`,
        { path: location, id: userID, timeSpent: timeSpentInSeconds },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          //eslint-disable-next-line
          const data = await response.data;
        })
        .catch((err) => console.log(err));
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Specify the cleanup function to remove the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    //eslint-disable-next-line
  }, [location, userID]);
  return (
    <>
      <Helmet>
        <title>Pay Pulse | Equipay Partners</title>
        <meta
          name="description"
          content="Refine pay strategies with Equipay's Pay Pulse, ensuring precise and competitive compensation for every role."
        />
        <meta
          property="og:description"
          content="Refine pay strategies with Equipay's Pay Pulse, ensuring precise and competitive compensation for every role."
        />
        {/* Add other meta tags, link tags, etc. as needed */}
      </Helmet>
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
                    Pay Pulse
                  </h1>
                  <div
                    className="mb-3"
                    style={{
                      width: "100%",
                      textAlign: "start",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <button
                      onClick={() => navigate("/pay-pulse-add-details")}
                      style={{
                        fontSize: "20px",
                        marginTop: "10px",
                        background: "linear-gradient(90deg,#2d67b9,#235090)",
                        color: "white",
                      }}
                      className="btn "
                    >
                      Get your salary report
                      <span style={{ marginLeft: "8px" }}>
                        <ArrowRightOutlined />
                      </span>
                    </button>

                    {/* <a href="#contact" className="btn-get-started scrollto">
                    Use Free Profile Evaluator
                  </a> */}
                  </div>
                  <div
                    className="d-lg-flex "
                    style={{
                      width: "100%",
                      textAlign: "start",

                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {activateDashboard ? (
                      <button
                        onClick={() => navigate("/reports-dashboard")}
                        style={{
                          fontSize: "20px",

                          background: "rgb(0, 128, 128)",
                          color: "white",
                        }}
                        className="btn mb-3 m-lg-0"
                      >
                        Dashboard
                      </button>
                    ) : (
                      ""
                    )}
                    <DownloadSamplePDF />

                    {/* <a href="#contact" className="btn-get-started scrollto">
                    Use Free Profile Evaluator
                  </a> */}
                  </div>
                </div>
              </div>
              <div className="col-xl-7 d-flex align-items-stretch">
                <div className="icon-boxes d-flex flex-column justify-content-center">
                  <div className="video-main">
                    <a href="/pay-pulse-video">
                      <video
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={BgVideo}
                        autoPlay
                        loop
                        muted
                      />{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 d-flex align-items-stretch mt-5">
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
                      You don’t need to spend weeks on submitting data in salary
                      surveys – just access our tool anytime.
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
                      You don’t need to spend weeks on submitting data in salary
                      surveys – just access our tool anytime.
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
                      you salary data by city and locations. This is completely
                      real-time – no more waiting for 6 months to 12 months to
                      get most recent data from Salary surveys. Our data gets
                      uploaded each week.
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
                      Salary surveys don’t tell you salaries by skills required
                      for the job. Our tool allows you to see which skills are
                      more in demand and how much you should be paying for that
                      salary.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="pricing section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Pricing</h2>
              <p>We offer our services in the following 3 packages</p>
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="box" data-aos="fade-up" data-aos-delay="100">
                  <h3>Basic</h3>
                  <h4>Free</h4>
                  <ul>
                    <li>1 Salary Report</li>
                  </ul>
                  <div className="btn-wrap">
                    <a href="/login-app" className="btn-buy">
                      Get started
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                <div
                  className="box featured"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <h3>Standard</h3>
                  <h4>
                    <sup>₹</sup>60,000
                  </h4>
                  <ul>
                    <li>5 Salary Reports </li>
                    <li>PDF Downloads </li>
                  </ul>
                  <div className="btn-wrap">
                    <a href="/login-app" className="btn-buy">
                      Get started
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                <div className="box" data-aos="fade-up" data-aos-delay="300">
                  <h3>Premium</h3>
                  <h4>
                    <sup>₹</sup>1,20,000
                  </h4>
                  <ul>
                    <li>Unlimited Salary Reports </li>
                    <li>PDF Downloads </li>
                  </ul>
                  <div className="btn-wrap">
                    <a href="/login-app" className="btn-buy">
                      Get started
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <FooterComponent />
    </>
  );
};

export default PayPulseLandingPage;

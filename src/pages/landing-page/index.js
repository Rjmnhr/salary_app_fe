import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import BgVideo from "../../video/demo.mp4";

import NavBar from "../../components/nav-bar/index";
import DownloadSamplePDF from "../../components/download-sample-pdf";
import AxiosInstance from "../../components/axios";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";


const LandingPage = () => {
  const navigate = useNavigate();
  const [activateDashboard, setActivateDashboard] = useState(false);

  const location = window.location.href;
  const userID = localStorage.getItem("user_id");
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
    const userID = localStorage.getItem("user_id");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (userID && isLoggedIn === "true") {
      AxiosInstance.post(
        "/api/report/get",
        { user_id: userID },
        {
          headers: {
            "Content-Type": "application/json",
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
  }, []);
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
        <title>Price a job | Equipay Partners</title>
        <meta
      name="description"
      content="Refine pay strategies with Equipay's Price a Job, ensuring precise and competitive compensation for every role."
    />
    <meta
      property="og:description"
      content="Refine pay strategies with Equipay's Price a Job, ensuring precise and competitive compensation for every role."
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
                    PRICE A JOB
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
                      onClick={() => navigate("/price-a-job-add-details")}
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
                    />
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
      <footer id="footer">
        <div class="footer-top">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-6 footer-contact text-left">
                <h3>
                 Equipay Partners<span>.</span>
                </h3>

                <p>
                  <strong>Indian Headquarter:</strong>
                  <br />
                  11th Main Road, HAL 2nd Stage <br />
                  Indira Nagar, Bangalore,
                  <br />
                  Karnataka-560038
                  <br />
                  <strong>Email:</strong> team@equipaypartners.com
                  <br />
                </p>
              </div>

              <div class="col-lg-2 col-md-6 footer-links text-left">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i class="bx bx-chevron-right"></i> <a href="/#">Home</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="#about">About us</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="#services">Services</a>
                  </li>
                
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="#faq">Frequently Asked Questions</a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-3 col-md-6 footer-links text-left">
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="/price-a-job">Price a job</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="/executive-compensation">Executive compensation</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="sales-incentive">Sales incentive</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="/training">Training</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="/blog">Blog</a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-4 col-md-6 footer-newsletter text-left">
                <h4>Join Our Newsletter</h4>
                <p>
                  Please enter your email if you are interested to read about
                  our regular work, live case studies, what's happening in
                  businesses around and some interesting trends
                </p>
                <form action="" method="post">
                  <input type="email" name="email" />
                  <input type="submit" value="Subscribe" />
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="container d-md-flex py-4">
          <div class="me-md-auto text-center text-md-left"></div>
          <div class="social-links text-center text-md-right pt-3 pt-md-0">
            {/* <a href="/#" class="twitter">
              <i class="bx bxl-twitter"></i>
            </a> */}
            <a href="https://www.facebook.com/profile.php?id=61554618998649" class="facebook" target="_blank"  rel="noreferrer">
              <i class="bx bxl-facebook"></i>
            </a>
            {/* <a href="/#" class="instagram">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="/#" class="google-plus">
              <i class="bx bxl-skype"></i>
            </a> */}
            <a href="https://www.linkedin.com/company/equipay-partners" class="linkedin" target="_blank"  rel="noreferrer">
              <i class="bx bxl-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;

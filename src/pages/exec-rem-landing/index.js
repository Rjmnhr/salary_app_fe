import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BgVideo from "../../video/demo-benchmark.mp4";



import { ArrowRightOutlined } from "@ant-design/icons";
import trendIcon from "../../icons/trend.png";
import { LandingExecutivePageStyled } from "./style";
import { Helmet } from "react-helmet";
import AxiosInstance from "../../config/axios";
import NavBar from "../../components/layout/nav-bar";
import DownloadSamplePDF from "../../components/price-a-job/download-sample-pdf";

const LandingExecutivePage = () => {
  const navigate = useNavigate();
  const [activateDashboard, setActivateDashboard] = useState(false);

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
  return (
    <>
      <Helmet>
        <title>Executive Compensation | Equipay Partners</title>
        <meta
          name="description"
          content="Unlock strategic success through tailored executive compensation solutions with Equipay Partners"
        />
        <meta
          property="og:description"
          content="Unlock strategic success through tailored executive compensation solutions with Equipay Partners"
        />
        {/* Add other meta tags, link tags, etc. as needed */}
      </Helmet>
      <NavBar />
      <LandingExecutivePageStyled>
        <div
          className="container-fluid "
          style={{
            backgroundColor: " #0093E9",
            backgroundImage: "linear-gradient(0deg, #0093E9 0%, #61cfe8 100%)",
            marginTop: "80px",
          }}
        >
          <section>
            <div className="container" data-aos="fade-up">
              <div className="row no-gutters">
                <div className="content col-xl-5 d-flex align-items-stretch">
                  <div
                    style={{ display: "grid" }}
                    className="content  align-content-end"
                  >
                    <h1
                      style={{
                        textAlign: "start",
                        fontSize: "60px",
                        fontWeight: "bold",
                      }}
                    >
                      Executive Compensation Benchmarking
                    </h1>
                    <h4 style={{ color: "white" }} className="text-left">
                      {" "}
                      Unlock Strategic Insights with Executive Compensation
                      Benchmarking
                    </h4>
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
                        onClick={() =>
                          navigate("/executive-compensation-add-details")
                        }
                        style={{
                          fontSize: "20px",
                          marginTop: "10px",
                          border: "2px solid white",
                        }}
                        className="btn custom-button"
                      >
                        Get your benchmark report
                        <span style={{ marginLeft: "8px" }}>
                          <ArrowRightOutlined />
                        </span>
                      </button>

                      {/* <a href="#contact" className="btn-get-started scrollto">
                    Use Free Profile Evaluator
                  </a> */}
                    </div>
                    <button
                      onClick={() => navigate("/executive-compensation-video")}
                      className="custom-demo-btn w-50"
                    >
                      Watch Demo
                    </button>
                    <div
                      className="invisible"
                      style={{
                        width: "100%",
                        textAlign: "start",
                        display: "flex",
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
                          className="btn "
                        >
                          Dashboard
                        </button>
                      ) : (
                        <DownloadSamplePDF />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 d-flex justify-content-center align-items-stretch">
                  <div className="icon-boxes d-flex flex-column justify-content-center">
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={trendIcon}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container" data-aos="fade-up">
              <div className="row no-gutters">
                <div className="col-xl-7 d-flex justify-content-center align-items-stretch">
                  <div className="icon-boxes d-flex flex-column justify-content-center">
                    <a href="/executive-compensation-video">
                      <video
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        src={BgVideo}
                        autoPlay
                        loop
                        muted
                      />
                    </a>
                  </div>
                </div>
                <div className="content col-12 col-lg-5 mt-3 mt-lg-0 d-flex justify-content-center align-items-stretch">
                  <h1
                    className="col-lg-10 col-12"
                    style={{
                      textAlign: "start",
                      fontSize: "40px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    See your performance and remuneration compared to other
                    directors/executives
                  </h1>
                </div>
              </div>
            </div>
          </section>

          <section id="about" class="about section-bg">
            <div class="container" data-aos="fade-up">
              <div class="row no-gutters">
                <div class="content col-xl-5 d-flex align-items-stretch">
                  <div class="content">
                    <div class="section-title">
                      <h2>Why Choose Us</h2>
                    </div>

                    <h3 className="text-left">
                      We gather and analyze comprehensive data from a wide range
                      of industries, ensuring that your executive compensation
                      benchmarks are relevant and reflective of the current
                      market landscape.
                    </h3>
                    {/* <p>
                We believe each student has a unique life story and if told properly, each story can be articulated as a story of leadership, failure, learning and demonstrate great experience. Our consultants with their rich industry experience and global network will help you frame your story which puts you in the best light
              </p> */}
                  </div>
                </div>
                <div class="col-xl-7 d-flex align-items-stretch">
                  <div class="icon-boxes d-flex flex-column justify-content-center">
                    <div class="row">
                      <div
                        class="col-md-6 icon-box"
                        data-aos="fade-up"
                        data-aos-delay="100"
                      >
                        <i class="bx bx-receipt"></i>
                        <h4>Expertise</h4>
                        <p className="text-left">
                          Our team of compensation experts brings years of
                          industry experience, ensuring that you receive
                          accurate and up-to-date benchmarking data tailored to
                          your organization's unique needs.
                        </p>
                      </div>
                      <div
                        class="col-md-6 icon-box"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        <i class="bx bx-cube-alt"></i>
                        <h4>Data Accuracy</h4>
                        <p className="text-left">
                          We pride ourselves on the accuracy and reliability of
                          our benchmarking data. Trust that you are making
                          decisions based on the most current and relevant
                          information available.
                        </p>
                      </div>
                      <div
                        class="col-md-6 icon-box"
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <i class="bx bx-images"></i>
                        <h4>Confidentiality</h4>
                        <p className="text-left">
                          Your data and compensation information are handled
                          with the utmost confidentiality. We prioritize the
                          security of your sensitive information, providing a
                          trusted partnership for your executive compensation
                          benchmarking needs.
                        </p>
                      </div>
                      <div
                        class="col-md-6 icon-box"
                        data-aos="fade-up"
                        data-aos-delay="400"
                      >
                        <i class="bx bx-shield"></i>
                        <h4>Affordable Package</h4>
                        <p className="text-left">
                          The best part, accessing our tool is about a third the
                          cost you pay for Salary survey.
                        </p>
                      </div>
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
                      <a href="/executive-compensation">
                        Executive compensation
                      </a>
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
              <a
                href="https://www.facebook.com/profile.php?id=61554618998649"
                class="facebook"
                target="_blank"
                rel="noreferrer"
              >
                <i class="bx bxl-facebook"></i>
              </a>
              {/* <a href="/#" class="instagram">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="/#" class="google-plus">
              <i class="bx bxl-skype"></i>
            </a> */}
              <a
                href="https://www.linkedin.com/company/equipay-partners"
                class="linkedin"
                target="_blank"
                rel="noreferrer"
              >
                <i class="bx bxl-linkedin"></i>
              </a>
            </div>
          </div>
        </footer>
      </LandingExecutivePageStyled>
    </>
  );
};

export default LandingExecutivePage;

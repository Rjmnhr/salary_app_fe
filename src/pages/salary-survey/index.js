import React from "react";
import { Helmet } from "react-helmet";
import NavBar from "../../components/nav-bar";
import SurveyRegisterComponent from "../../components/survey-register";
import circleBg from "../../icons/circle-background.jpg";

const SalarySurveyPage = () => {
  return (
    <div>
      <>
        <Helmet>
          <title>Salary Survey | Equipay Partners</title>

          {/* Add other meta tags, link tags, etc. as needed */}
        </Helmet>
        <NavBar />
        <div
          className="container-fluid p-0 "
          style={{
            marginTop: "80px",
          }}
        >
          <section id="about" className="about ">
            <div className="container" data-aos="fade-up">
              <div className="row no-gutters">
                <div className="content col-xl-7 d-flex align-items-stretch text-left">
                  <div className="content">
                    <h1
                      style={{
                        textAlign: "start",
                        fontWeight: "bold",
                      }}
                      className="mb-3"
                    >
                      Discover Your Worth: Take Our Salary Survey
                    </h1>
                    <p style={{ fontSize: "20px" }}>
                      Welcome to Equipay Partners Salary Survey! We're excited
                      to announce that our survey will be open from the{" "}
                      <span className="text-primary">
                        1st of February to the last day of February
                      </span>
                      . During this time, we invite you to contribute valuable
                      insights into compensation trends across various
                      industries
                    </p>
                  </div>
                </div>
                <div className="col-xl-5 d-flex align-items-stretch">
                  <div className="icon-boxes d-flex flex-column justify-content-center">
                    <SurveyRegisterComponent />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="about col-md-12 ">
            <div className="col-xl-12 d-flex align-items-stretch ">
              <div className="icon-boxes d-flex flex-column justify-content-center">
                <div className="section-title">
                  <h2> Benefits of Participating</h2>
                </div>
                <div className="row">
                  <div
                    className="col-md-4 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <i className="bx bx-chart"></i>
                    <h4>Personalized Salary Insights</h4>
                    <p>
                      Receive a customized report based on your industry,
                      experience, and location
                    </p>
                  </div>
                  <div
                    className="col-md-4 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <i className="bx bx-cube-alt"></i>
                    <h4>Industry Benchmarking</h4>
                    <p>
                      Compare your earnings with professionals in your field to
                      understand where you stand.
                    </p>
                  </div>

                  <div
                    className="col-md-4 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <i className="bx bx-shield"></i>
                    <h4>Contribute to Data Transparency</h4>
                    <p>
                      Your input helps create a transparent job market,
                      benefiting everyone
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="about"
            style={{
              backgroundImage: `url(${circleBg})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "50vh",
              display: "grid",
              placeItems: "center",
            }}
            className="about container-fluid mb-5 "
          >
            <div style={{ width: "400px" }} className="content">
              <div
                className="col-md-12 icon-box"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <i className="bx bx-shield"></i>
                <h4>
                  Your data is confidential and will be anonymized before
                  analysis. We take privacy seriously, and your personal
                  information will not be shared.
                </h4>
              </div>
            </div>
          </section>

          <section id="about" className="about col-md-12 ">
            <div className="col-xl-12 d-flex align-items-stretch ">
              <div className="icon-boxes d-flex flex-column justify-content-center">
                <div className="section-title">
                  <h2> How it works</h2>
                </div>
                <div className="row">
                  <div
                    className="col-md-4 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <i className="bx bx-pen"></i>
                    <h4>Complete a Short Survey</h4>
                    <p>
                      Answer a few quick questions about your job, experience,
                      and location.
                    </p>
                  </div>
                  <div
                    className="col-md-4 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <i className="bx bx-receipt"></i>
                    <h4>Get Your Report</h4>
                    <p>
                      Receive an report with insights into your salary and
                      industry benchmarks
                    </p>
                  </div>

                  <div
                    className="col-md-4 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <i className="bx bx-circle"></i>
                    <h4>Help Others</h4>
                    <p>
                      Your participation contributes to a comprehensive salary
                      database, empowering professionals worldwide
                    </p>
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
      </>
    </div>
  );
};

export default SalarySurveyPage;

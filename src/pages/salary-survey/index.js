import React from "react";
import { Helmet } from "react-helmet";
import NavBar from "../../components/nav-bar";
import SurveyRegisterComponent from "../../components/survey-register";
import circleBg from "../../icons/circle-background.jpg";
import { TemplateDownloadComponent } from "../../components/survey-excel";

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
            marginTop: "70px",
          }}
        >
          <section id="about" className="about ">
            <div className="container" data-aos="fade-up">
              <h3
                style={{ fontWeight: "normal" }}
                className="text-left custom-font "
              >
                This salary survey is different from any other salary surveys.
                Our salarytool captures salaries in all advertised jobs in
                real-time and we will provide you data from both participating
                companies as well as real-time salary data
              </h3>
              <div className="row no-gutters">
                <div className="content pt-5 col-xl-7 d-flex align-items-stretch text-justify">
                  <div className="">
                    <p
                      style={{
                        lineHeight: "1.7",
                        fontSize: "18px",
                        wordSpacing: "0",
                      }}
                    >
                      Our salary surveys will be open from{" "}
                      <span className="text-primary">1st February</span> and
                      will remain open till{" "}
                      <span className="text-primary">29th February</span>. We
                      will then collate all data and send you general market
                      result by <span className="text-primary">15th March</span>
                      . Participation in the salary survey is free and each
                      participant will get a general market salary result free
                      of cost. For more customised and tailored salary data,
                      there will be an access fee. Before our survey is open, we
                      are seeking expressions of interest.
                    </p>

                    <p style={{ fontWeight: "bold" }}>
                      Please fill in the form to express your interest. We will
                      let you know when the survey is open
                    </p>
                    <p style={{ fontWeight: "bold" }}>
                      The kinds of data we will be collecting and reporting on
                      can be found in the excel template below. Feel free to
                      download to check if this survey would work for you
                    </p>
                    <TemplateDownloadComponent />
                  </div>
                </div>
                <div className="col-xl-5 d-flex align-items-start ">
                  <div className="icon-boxes  d-flex flex-column justify-content-center">
                    <h3
                      style={{
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "normal",
                      }}
                      className="mb-3 text-primary"
                    >
                      Expression of Interest
                    </h3>
                    <SurveyRegisterComponent />
                  </div>
                </div>
              </div>
            </div>
            {/* <section className="">
              <div className=" container">
                <h3>
                  The kinds of data we will be collecting and reporting on can
                  be found in the excel template below. Feel free to download to
                  check if this survey would work for you
                </h3>
                <div className="mt-5">
                  <TemplateDownloadComponent />
                </div>
              </div>
            </section> */}
          </section>
          <section id="about" className="about col-md-12 bg-light ">
            <div className="col-xl-12 d-flex align-items-stretch ">
              <div className="icon-boxes d-flex flex-column justify-content-center">
                <div className="section-title">
                  <h2> Features of the Salary Survey</h2>
                </div>
                <div className="d-lg-flex justify-content-center flex-wrap">
                  <div
                    className="col-md-4  p-3 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <h4 className="text-primary">
                      International data coverage{" "}
                    </h4>
                    <p>
                      Depending on the data submitted, we can provide you with
                      salary data in various geographies
                    </p>
                  </div>
                  <div
                    className="col-md-4 p-3 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <h4 className="text-primary">Multiple functions covered</h4>
                    <p>
                      The salary survey will cover functions like sales, IT, HR,
                      marketing, operations, finance and more
                    </p>
                  </div>

                  <div
                    className="col-md-4 p-3    icon-box"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <h4 className="text-primary">Roles by levels</h4>
                    <p>
                      The salary survey is very easy to fill in with each role
                      being mapped to reporting levels from the executive
                    </p>
                  </div>

                  <div
                    className="col-md-4 p-3 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <h4 className="text-primary">
                      Coverage by locations and skills
                    </h4>
                    <p>
                      Among one of the first salary survey to capture data by
                      locations and specific skills
                    </p>
                  </div>
                  <div
                    className="col-md-4 p-3 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <h4 className="text-primary">Selective participation</h4>
                    <p>
                      The survey allows you to enter specific roles/functions
                      rather than the whole organization's salary data
                    </p>
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
                      Receive a free general market report for all roles based
                      on your industry, the role's experience, and location
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
                      Compare your employees' earnings with other professionals
                      to understand where your company stands
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
                <img
                  width={50}
                  src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1704954909/ce816moxqaisi49tgprk.png"
                  alt="Salary survey"
                />
                <h4 className="mt-3">
                  Your data is confidential and will be anonymized before
                  analysis. We take privacy seriously, and your information will
                  not be shared.
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
                      Answer a few quick questions about job, experience, and
                      location.
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
                      Receive an report with insights into salary and industry
                      benchmarks
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

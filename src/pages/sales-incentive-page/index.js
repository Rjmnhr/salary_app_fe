import React, { useEffect, useState } from "react";


import pointArrow from "../../icons/right-arrow.png";

import { Helmet } from "react-helmet";
import AxiosInstance from "../../config/axios";
import NavBar from "../../components/layout/nav-bar";

const SalesIncentive = () => {
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
      {" "}
      <Helmet>
        <title>Sales Incentive | Equipay Partners</title>
        {/* Add other meta tags, link tags, etc. as needed */}
      </Helmet>
      <NavBar />
      <div
        className="vh-90 section-title col-12"
        style={{ marginTop: "100px", display: "grid", placeItems: "center" }}
      >
        <div className="container">
          <ul className="list-unstyled list-step list-py-3 mb-0">
            <li className="list-step-item">
              <div className="position-relative rounded-3 py-10 px-4 px-md-10">
                <div className="row align-items-lg-center">
                  <div className="col-lg-5 mb-7 mb-lg-0">
                    <div className="pe-lg-5">
                      <div className="mb-5" data-aos="fade-up">
                        <h2>Typical clients we help</h2>
                        <h4>
                          All organizations that have a sales team and want to
                          improve their performance and productivity to hire and
                          retain best sales performers
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-lg-7"
                    data-aos="fade-left"
                    data-aos-delay="100"
                  >
                    {/* <img
                      className="img-fluid"
                      src="./assets/img/mockups/img1.png"
                      alt="Img"
                    /> */}

                    <div className="col mb-5">
                      <a
                        className="card card-ghost card-transition-zoom h-100"
                        href="./portfolio-case-study.html"
                      >
                        <div className="card-transition-zoom-item">
                          <div className="image-overlay">
                            <img
                              className="card-img"
                              src="./assets/img/580x480/img15.jpg"
                              alt="Description"
                            />
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="position-absolute top-0 start-0 w-100 w-lg-65 h-65 h-lg-100 bg-light rounded-3 zi-n1 ms-n5"></div>
              </div>
            </li>
          </ul>
        </div>
        <section id="services" className="services section-bg ">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Our Services</h2>
            </div>

            <div style={{ display: "grid", placeItems: "center" }}>
              <div className="col-md-6">
                <div
                  className="icon-box"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <i className="icofont-computer"></i>
                  <h4>Audit For their existing SIP</h4>
                </div>
              </div>
              <div className="col-md-6 mt-4 mt-md-0">
                <div
                  className="icon-box"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <i className="icofont-chart-bar-graph"></i>
                  <h4>
                    Design/re-design/edit their existing SIP, having regard to
                    market practice and using design by first principles
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <ul className="list-unstyled list-step list-py-3 mb-0">
            <li className="list-step-item">
              <div className="position-relative rounded-3 py-10 px-4 px-md-10">
                <div className="row align-items-lg-center">
                  <div className="col-lg-5 mb-7 mb-lg-0">
                    <div className="pe-lg-5" data-aos="fade-up">
                      <div className="mb-5">
                        <h2>Design of SIP</h2>
                      </div>
                      <div className="text-left">
                        <h5 className="d-flex justify-contents-start align-items-center mb-3 col-lg-11 col-12">
                          <img
                            style={{ marginRight: "8px" }}
                            src={pointArrow}
                            alt=""
                            height={50}
                            width={50}
                          />{" "}
                          Assessment of what's working vs not working
                        </h5>
                        <h5 className="d-flex justify-contents-start align-items-center mb-3 col-lg-11 col-12">
                          <img
                            style={{ marginRight: "8px" }}
                            src={pointArrow}
                            alt=""
                            height={50}
                            width={50}
                          />
                          Participants,KPIs, leverage, measures, gateway,
                          behaviors, vehicle, deferral
                        </h5>
                        <h5 className="d-flex justify-contents-start align-items-center mb-3 col-lg-11 col-12">
                          <img
                            style={{ marginRight: "8px" }}
                            src={pointArrow}
                            alt=""
                            height={50}
                            width={50}
                          />
                          Stakeholder Management and conflict resolution
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-lg-7"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <img
                      className="img-fluid"
                      src="./assets/img/mockups/img2.png"
                      alt="Img"
                    />
                  </div>
                </div>

                <div className="position-absolute top-0 start-0 w-100 w-lg-65 h-65 h-lg-100 bg-light rounded-3 zi-n1 ms-n5"></div>
              </div>
            </li>

            <li className="list-step-item">
              <div className="position-relative rounded-3 py-10 px-4 px-md-10">
                <div className="row align-items-lg-center">
                  <div className="col-lg-5 mb-7 mb-lg-0">
                    <div className="pe-lg-5" data-aos="fade-up">
                      <div className="mb-5">
                        <h2>What does implementation include?</h2>
                      </div>
                      <div className="text-left">
                        <h5 className="d-flex justify-contents-start align-items-center mb-3 col-lg-11 col-12">
                          <img
                            style={{ marginRight: "8px" }}
                            src={pointArrow}
                            alt=""
                            height={50}
                            width={50}
                          />{" "}
                          Draft of plan rules, FAQs
                        </h5>
                        <h5 className="d-flex justify-contents-start align-items-center mb-3 col-lg-11 col-12">
                          <img
                            style={{ marginRight: "8px" }}
                            src={pointArrow}
                            alt=""
                            height={50}
                            width={50}
                          />
                          Draft of working examples, payout-performance models,
                          offer letters
                        </h5>
                        <h5 className="d-flex justify-contents-start align-items-center mb-3 col-lg-11 col-12">
                          <img
                            style={{ marginRight: "8px" }}
                            src={pointArrow}
                            alt=""
                            height={50}
                            width={50}
                          />
                          Setup with finance, HR, payroll to ensure proper
                          administration
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-lg-7"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <img
                      className="img-fluid"
                      src="./assets/img/mockups/img3.png"
                      alt="Img"
                    />
                  </div>
                </div>

                <div className="position-absolute top-0 start-0 w-100 w-lg-65 h-65 h-lg-100 bg-light rounded-3 zi-n1 ms-n5"></div>
              </div>
            </li>
          </ul>
        </div>
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
                    <i class="bx bx-chevron-right"></i> <a href="/blog">Blog</a>
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
  );
};

export default SalesIncentive;

import React, { useEffect, useState } from "react";

import NavBar from "../../components/nav-bar";
import pointArrow from "../../icons/right-arrow.png";
import AxiosInstance from "../../components/axios";

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
    </>
  );
};

export default SalesIncentive;

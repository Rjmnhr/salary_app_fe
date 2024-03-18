import React, { useEffect, useState } from "react";
import advisoryImg from "../../icons/two-content-business-partners-discussing-issue.webp";
import advisoryImg2 from "../../icons/WhatsApp Image 2024-03-19 at 01.09.04.jpeg";
import { Helmet } from "react-helmet";
import AxiosInstance from "../../config/axios";
import NavBar from "../../components/layout/nav-bar";
import FooterComponent from "../../components/layout/footer";

const AdvisoryPage = () => {
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
        <title>Advisory | Equipay Partners</title>
        {/* Add other meta tags, link tags, etc. as needed */}
      </Helmet>
      <NavBar />
      <div
        className="vh-90 section-title col-12"
        style={{ marginTop: "150px", display: "grid", placeItems: "center" }}
      >
        <div className="container">
          <ul className="list-unstyled list-step list-py-3 mb-0">
            <li className="list-step-item">
              <div className="position-relative rounded-3 py-10 px-4 px-md-10">
                <div className="row align-items-lg-center">
                  <div className="col-lg-5 mb-7 mb-lg-0">
                    <div className="pe-lg-5">
                      <div className="mb-5" data-aos="fade-up">
                        <h2>Advisory Services</h2>
                        <h4>
                          We offer expert advisory services to global
                          organizations and startups in designing best-in-class
                          incentives, remuneration and benchmarking.
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
                      {/* eslint-disable-next-line*/}
                      <a className="card card-ghost card-transition-zoom h-100">
                        <div className="card-transition-zoom-item">
                          <div className="image-overlay">
                            <img
                              className="card-img"
                              src={advisoryImg}
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
        <section id="about" className="about col-md-12 bg-light">
          <div className="col-xl-12 d-flex align-items-stretch ">
            <div className="icon-boxes d-flex flex-column justify-content-center">
              <div className="section-title">
                <h2> Key Services Offered</h2>
              </div>
              <div className="row">
                <div
                  className="col-md-4 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <i className="bx bx-chart"></i>
                  <h4>Designing best-in-class incentives</h4>
                  <p>
                    Tailored incentive programs designed to motivate and reward
                    employees, driving performance and achieving organizational
                    goals.
                  </p>
                </div>
                <div
                  className="col-md-4 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <i className="bx bx-cube-alt"></i>
                  <h4>Remuneration and classification frameworks</h4>
                  <p>
                    Customized frameworks that ensure fair and competitive
                    compensation structures aligned with industry standards and
                    organizational objectives.
                  </p>
                </div>

                <div
                  className="col-md-4 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <i className="bx bx-shield"></i>
                  <h4>Benchmarking</h4>
                  <p>
                    Comparative analysis of compensation practices and market
                    data to provide insights for informed decision-making and
                    competitive positioning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-3">
          <div className="container">
            <ul className="list-unstyled list-step list-py-3 mb-0">
              <li className="list-step-item">
                <div className="position-relative rounded-3 py-10 px-4 px-md-10">
                  <div className="row align-items-lg-center">
                    <div className="col-lg-5 mb-7 mb-lg-0">
                      <div className="pe-lg-5">
                        <div className="mb-5" data-aos="fade-up">
                          <h2>Unique Value Proposition</h2>
                          <h4>
                            Our advisory services stand out because of our
                            commitment to delivering tailored solutions that
                            address the unique needs and challenges of each
                            client. We leverage industry expertise, innovative
                            methodologies, and cutting-edge tools to help
                            organizations optimize their compensation strategies
                            and drive business success.
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
                        {/* eslint-disable-next-line*/}
                        <a className="card card-ghost card-transition-zoom h-100">
                          <div className="card-transition-zoom-item">
                            <div className="image-overlay">
                              <img
                                className="card-img"
                                src={advisoryImg2}
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
        </section>
      </div>
      <FooterComponent />
    </>
  );
};

export default AdvisoryPage;

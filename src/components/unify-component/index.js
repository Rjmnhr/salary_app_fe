import React from "react";

const UnifyComponent = () => {
  return (
    <>
      <div class="container col-12 container-fluid   bg-light rounded-3 p-5 ">
        <h5>
          We have consulted organisations across
          <span className="text-primary"> India, US, UK, Asia Pacific</span> on
          strategic pay and performance matters. Some of our projects include
        </h5>

        <div
          class="d-lg-flex justify-content-center flex-wrap container-fluid "
          style={{ marginTop: "30px" }}
        >
          <div
            class="col-lg-4 col-12 mb-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="card testimonial-wrap card-shadow h-100">
              <div
                class="card-body"
                style={{ display: "grid", placeItems: "center" }}
              >
                <div class="mb-3">
                  <i class="bi-emoji-smile fs-2 text-dark"></i>
                </div>
                <h5 style={{ width: "75%" }}>
                  {" "}
                  Design of ESOP/LTI for startups
                </h5>
              </div>
            </div>
          </div>

          <div class="col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="200">
            <div class="card card-shadow h-100">
              <div
                class="card-body"
                style={{ display: "grid", placeItems: "center" }}
              >
                <div class="mb-3">
                  <i class="bi-droplet fs-2 text-dark"></i>
                </div>
                <h5 style={{ width: "75%" }}>
                  Design of STI plan for large listed organizations
                </h5>
              </div>
            </div>
          </div>

          <div class="w-100"></div>

          <div
            class="col-lg-4 mb-4 mb-lg-0"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div class="card card-shadow h-100">
              <div
                class="card-body"
                style={{ display: "grid", placeItems: "center" }}
              >
                <div class="mb-3">
                  <i class="bi-briefcase fs-2 text-dark"></i>
                </div>
                <h5 style={{ width: "75%" }}>
                  Design of Sales Incentive for FMCG and Retail organizations
                </h5>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div
              class="card card-shadow h-100"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div
                class="card-body"
                style={{ display: "grid", placeItems: "center" }}
              >
                <div class="mb-3">
                  <i class="bi-speedometer2 fs-2 text-dark"></i>
                </div>
                <h5 style={{ width: "75%" }}>
                  Determination of salary for CEO and their executive team
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnifyComponent;

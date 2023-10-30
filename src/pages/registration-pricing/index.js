import React from "react";

import CheckoutComponent from "../../components/payment_checkout/Checkout";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Steps } from "antd";

const items = [
  {
    title: "Verification",
  },
  {
    title: "Plan",
  },
  {
    title: "Payment",
  },
];

const RegistrationPricing = () => {
  return (
    <>
      <div
        style={{
          transition: "all 0.3s ease",
        }}
        class="overflow-hidden p-3"
      >
        <div
          style={{ display: "grid", placeItems: "center" }}
          className="col-12"
        >
          <Steps
            className="col-8"
            current={1}
            size="small"
            labelPlacement="vertical"
            items={items}
          />
        </div>

        <div class="container content-space-1">
          <div class="w-lg-65 text-center mx-lg-auto mb-5 mb-sm-7 mb-lg-10"></div>
          <div className="text-left mb-5">
            <h3>Choose your plan to continue </h3>
          </div>
          <div class="position-relative">
            <div class="row mb-5">
              <div class="col-lg-4 col-sm-12 mb-4 mb-lg-0">
                <div class="card card-lg h-100">
                  <div class="card-body">
                    <div class="mb-3">
                      <h2 class="mb-1 text-primary">BASIC</h2>
                    </div>

                    <div class="d-flex-center mb-5">
                      <div class="flex-shrink-0">
                        <p style={{ fontSize: "2.5rem", fontWeight: "500" }}>
                          ₹ 20,000
                        </p>{" "}
                      </div>
                      {/* <div class="flex-grow-1 align-self-end ms-3">
                      <span class="d-block">USD / monthly</span>
                    </div> */}
                    </div>

                    <div class="row tex">
                      <div
                        class="col-sm-12  "
                        style={{ display: "grid", placeItems: "center" }}
                      >
                        <p
                          style={{ fontSize: "18px", textAlign: "start" }}
                          className="d-flex justify-content-start align-items-center gap-2 "
                        >
                          <CheckCircleTwoTone style={{ marginRight: "8px" }} />{" "}
                          One Job Report
                        </p>
                        <p
                          style={{ fontSize: "18px", textAlign: "start" }}
                          className="d-flex justify-content-start align-items-center gap-2 "
                        >
                          <CheckCircleTwoTone style={{ marginRight: "8px" }} />{" "}
                          PDF Download
                        </p>
                      </div>
                    </div>
                    <CheckoutComponent
                      action={"Register"}
                      className="mt-3"
                      text={"Select"}
                      price={"price_1O5isbSHdxsAYvlqsTcV7kAw"}
                      plan={"Basic"}
                    />
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-lg-0  mb-5">
                <div class="card card-lg card-shadow card-pinned h-100">
                  <span class="badge bg-dark text-white card-pinned-top-end">
                    Most popular
                  </span>

                  <div class="card-body">
                    <div class="mb-3">
                      <h2 class="mb-1 text-primary">STANDARD</h2>
                    </div>

                    <div class="d-flex-center mb-5">
                      <p style={{ fontSize: "2.5rem", fontWeight: "500" }}>
                        ₹ 60,000
                      </p>

                      {/* <div class="flex-grow-1 align-self-end ms-3"></div> */}
                    </div>

                    <div class="row ">
                      <div
                        class="col-sm-12 d "
                        style={{ display: "grid", placeItems: "center" }}
                      >
                        <p
                          style={{ fontSize: "18px", textAlign: "start" }}
                          className="d-flex justify-content-start align-items-center gap-2 "
                        >
                          <CheckCircleTwoTone style={{ marginRight: "8px" }} />{" "}
                          Up to Five Job Reports
                        </p>
                        <p
                          style={{ fontSize: "18px", textAlign: "start" }}
                          className="d-flex justify-content-start align-items-center gap-2 "
                        >
                          <CheckCircleTwoTone style={{ marginRight: "8px" }} />{" "}
                          PDF Download
                        </p>
                      </div>
                    </div>
                    <CheckoutComponent
                      action={"Register"}
                      className="mt-3"
                      text={"Select"}
                      price={"price_1O5itXSHdxsAYvlqFmXt6lwV"}
                      plan={"Standard"}
                    />
                  </div>
                </div>
              </div>

              <div class="col-lg-4 mb-4 mb-lg-0">
                <div class="card card-lg h-100">
                  <div class="card-body">
                    <div class="mb-3">
                      <h2 class="mb-1 text-primary">PREMIUM</h2>
                    </div>

                    <div
                      style={{
                        fontFamily:
                          " -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif",
                      }}
                      class="d-flex-center mb-5"
                    >
                      <p style={{ fontSize: "2.5rem", fontWeight: "500" }}>
                        {" "}
                        ₹ 1.2 Lakhs
                      </p>
                    </div>

                    <div class="row">
                      <div
                        class="col-sm-12  "
                        style={{ display: "grid", placeItems: "center" }}
                      >
                        <p
                          style={{ fontSize: "18px", textAlign: "start" }}
                          className="d-flex justify-content-start align-items-center gap-2 "
                        >
                          <CheckCircleTwoTone style={{ marginRight: "8px" }} />{" "}
                          Unlimited Job Reports
                        </p>
                        <p
                          style={{ fontSize: "18px", textAlign: "start" }}
                          className="d-flex justify-content-start align-items-center gap-2 "
                        >
                          <CheckCircleTwoTone style={{ marginRight: "8px" }} />{" "}
                          PDF Download
                        </p>
                      </div>
                    </div>
                    <CheckoutComponent
                      action={"Register"}
                      className="mt-3"
                      text={"Select"}
                      price={"price_1O5iuUSHdxsAYvlqPOP39oMk"}
                      plan={"Premium"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPricing;

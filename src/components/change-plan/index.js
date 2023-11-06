import React from "react";
import CheckoutComponent from "../payment_checkout/Checkout";
import { CheckCircleTwoTone } from "@ant-design/icons";
import premiumIcon from "../../icons/premium-quality.png";
import { useNavigate } from "react-router-dom";

const ChangePlan = () => {
  const userPlan = sessionStorage.getItem("user-plan");
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          height: "90vh",
          display: "grid",
          justifyItems: "center",
          alignContent: "center",
          background: "white",
        }}
        className="container  col-lg-11 col-12 m-lg-3 m-2 p-3  scrollable-container"
      >
        {userPlan === "Premium" ? (
          <>
            <img
              className="mb-3"
              src={premiumIcon}
              width={100}
              height={100}
              alt=""
            />
            <h2>You are our premium member</h2>{" "}
            <h3>You already have all our higher privileges</h3>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/landing")}
            >
              Explore
            </button>
          </>
        ) : (
          <div class="position-relative pb-3">
            <div class="row mb-5">
              {userPlan === "Standard" ? (
                ""
              ) : (
                <div class="col-lg-4 col-sm-12 mb-4 mb-lg-0">
                  <div class="card card-lg h-100">
                    <div class="card-body">
                      <div class="mb-3">
                        <h2 class="mb-1 text-primary">BASIC</h2>
                      </div>

                      <div class="d-flex-center mb-5">
                        <div class="flex-shrink-0">
                          <p
                            style={{
                              fontSize: "2.5rem",
                              fontWeight: "500",
                            }}
                          >
                            Free
                          </p>{" "}
                        </div>
                        {/* <div class="flex-grow-1 align-self-end ms-3">
      <span class="d-block">USD / monthly</span>
    </div> */}
                      </div>

                      <div class="row tex">
                        <div
                          class="col-sm-12  "
                          style={{
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "16px",
                              textAlign: "start",
                            }}
                            className="d-flex justify-content-start align-items-center gap-2 "
                          >
                            <CheckCircleTwoTone
                              style={{ marginRight: "8px" }}
                            />{" "}
                            1 Salary Report
                          </p>
                        </div>
                      </div>
                      {userPlan === "Basic" ? (
                        <button
                          style={{ background: "rgba(0, 0, 0, 0.02)" }}
                          className="btn  border "
                        >
                          Current plan
                        </button>
                      ) : (
                        <CheckoutComponent
                          action={"Upgrade"}
                          className="mt-3"
                          text={"Upgrade"}
                          price={"price_1O5isbSHdxsAYvlqsTcV7kAw"}
                          plan={"Basic"}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div
                class={`${
                  userPlan === "Standard" ? "col-lg-6" : "col-lg-4"
                }  mb-lg-0  mb-5`}
              >
                <div class="card card-lg card-shadow card-pinned h-100">
                  <div class="card-body">
                    <div class="mb-3">
                      <h2 style={{ width: "  114%" }} class="mb-1 text-primary">
                        STANDARD
                      </h2>
                    </div>

                    <div class="d-flex-center mb-5">
                      <p
                        style={{
                          fontSize: "2.5rem",
                          fontWeight: "400",
                        }}
                      >
                        ₹ 60,000
                      </p>

                      {/* <div class="flex-grow-1 align-self-end ms-3"></div> */}
                    </div>

                    <div class="row ">
                      <div
                        class="col-sm-12 d "
                        style={{
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "16px",
                            textAlign: "start",
                          }}
                          className="d-flex justify-content-start align-items-center gap-2 "
                        >
                          <CheckCircleTwoTone style={{ marginRight: "8px" }} />{" "}
                          5 Salary Reports
                        </p>
                      </div>
                    </div>
                    {userPlan === "Standard" ? (
                      <button
                        style={{ background: "rgba(0, 0, 0, 0.02)" }}
                        className="btn  border "
                      >
                        Current plan
                      </button>
                    ) : (
                      <CheckoutComponent
                        action={"Upgrade"}
                        className="mt-3"
                        text={"Upgrade"}
                        price={"price_1O9KTPDNZni9rE7FAvQLL2KI"}
                        plan={"Standard"}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div
                class={`${
                  userPlan === "Standard" ? "col-lg-6" : "col-lg-4"
                }  mb-lg-0  mb-5`}
              >
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
                      <p
                        style={{
                          fontSize: "2.5rem",
                          fontWeight: "500",
                        }}
                      >
                        {" "}
                        ₹ 1.2 L{" "}
                      </p>
                    </div>

                    <div class="row">
                      <div
                        class="container-fluid "
                        style={{
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "16px",
                            textAlign: "start",
                          }}
                          className="d-flex justify-content-start align-items-center gap-2 "
                        >
                          <CheckCircleTwoTone style={{ marginRight: "8px" }} />{" "}
                          Unlimited
                        </p>
                      </div>
                    </div>
                    {userPlan === "Premium" ? (
                      <button className="btn  w-75">Your current plan</button>
                    ) : (
                      <CheckoutComponent
                        action={"Upgrade"}
                        className="mt-3"
                        text={"Upgrade"}
                        price={"price_1O9KffDNZni9rE7Fr8gBJURb"}
                        plan={"Premium"}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChangePlan;

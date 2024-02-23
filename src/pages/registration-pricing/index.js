import React, { useEffect, useState } from "react";


import { Steps } from "antd";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../config/axios";
import CheckoutComponent from "../../components/payment/Checkout";


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
  const navigate = useNavigate();

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
                          Free
                        </p>{" "}
                      </div>
                      {/* <div class="flex-grow-1 align-self-end ms-3">
                      <span class="d-block">USD / monthly</span>
                    </div> */}
                    </div>

                    <div class="row pricing">
                      <ul>
                        <li>One Job Report</li>

                        <li>One Executive Compensation Report</li>

                        <li className="invisible">PDF Download</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => navigate("/success-registration-basic")}
                      style={{
                        background: "black",
                        color: "white",
                      }}
                      className="btn border w-75 "
                    >
                      Select
                    </button>
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
                      <ul>
                        <li> Up to Five Job Reports</li>

                        <li>PDF Download</li>
                        <li> Up to Five Executive Compensation Report</li>
                      </ul>
                    </div>
                    <CheckoutComponent
                      action={"Register"}
                      className="mt-3"
                      text={"Select"}
                      price={"price_1O9KTPDNZni9rE7FAvQLL2KI"}
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
                      <ul>
                        <li> Unlimited Job Reports</li>

                        <li>PDF Download</li>
                        <li> Unlimited Executive Compensation Report</li>
                      </ul>
                    </div>
                    <CheckoutComponent
                      action={"Register"}
                      className="mt-3"
                      text={"Select"}
                      price={"price_1O9KffDNZni9rE7Fr8gBJURb"}
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

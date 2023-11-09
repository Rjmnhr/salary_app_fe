import React, { useEffect, useState } from "react";

import NavBar from "../../components/nav-bar";
import AxiosInstance from "../../components/axios";
// import pdf from "./CEO_pay_NSE100.pdf";
// import { Card, Badge } from "antd";
// import pdfIcon from "../../icons/pdf.png";
// import CheckoutComponent from "../../components/payment_checkout/Checkout";

const ExecutiveReports = () => {
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
      <div className="vh-100" style={{ display: "grid", placeItems: "center" }}>
        <div>
          <h1>
            We are Available <span className="text-primary">soon!</span>{" "}
          </h1>
          <h5>
            Currently we are working on our products and will be launching soon.
            Do not miss it
          </h5>
          <section id="contact" class="contact">
            <div class="container" data-aos="fade-up">
              <h2>
                Are you excited about the products?{" "}
                <a href="/contact">Contact us now</a>
              </h2>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ExecutiveReports;

//    <div className="col-12 section-title ">
//    <h2 style={{ width: "100%" }} className="col-12 ">
//      Executive Compensation Reports
//    </h2>
//  </div>

//  <div className="container d-flex justify-content-lg-around align-items-center flex-lg-row flex-column  col-12  ">
//    <div style={{ width: "240px" }} className="mb-3">
//      <Badge.Ribbon placement="start" text="Best seller">
//        <Card
//          hoverable
//          style={{ width: 240 }}
//          cover={
//            <div
//              style={{
//                background:
//                  "linear-gradient(90deg, rgb(45, 103, 185), rgb(35, 80, 144))",
//                height: "200px",
//                padding: "5px",
//              }}
//            >
//              <img width={100} height={100} src={pdfIcon} alt="" />
//              <h4 style={{ color: "white" }}>
//                CEO Pay at NSE of 100 companies
//              </h4>
//            </div>
//          }
//        >
//          <div className="text-left">
//            <h5>Executive Report </h5>
//            <p
//              style={{
//                fontSize: "18px",
//                fontWeight: "bold",
//                marginBottom: "5px",
//              }}
//            >
//              ₹ 25,000
//            </p>
//            <p>Receive Instantly</p>
//            <CheckoutComponent
//              text={"Buy now"}
//              price={process.env.REACT_APP_PRICE_100}
//            />
//          </div>
//        </Card>
//      </Badge.Ribbon>
//    </div>
//    <div style={{ width: "240px" }} className="mb-3">
//      <Card
//        hoverable
//        style={{ width: 240 }}
//        cover={
//          <div
//            style={{
//              background:
//                "linear-gradient(90deg, rgb(45, 103, 185), rgb(35, 80, 144))",
//              height: "200px",
//              padding: "5px",
//            }}
//          >
//            <img width={100} height={100} src={pdfIcon} alt="" />
//            <h4 style={{ color: "white" }}>CEO pay SMALL CAP 250</h4>
//          </div>
//        }
//      >
//        <div className="text-left">
//          <h5>Executive Report </h5>
//          <p
//            style={{
//              fontSize: "18px",
//              fontWeight: "bold",
//              marginBottom: "5px",
//            }}
//          >
//            ₹ 25,000
//          </p>
//          <p>Receive Instantly</p>
//          <CheckoutComponent
//            text={"Buy now"}
//            price={process.env.REACT_APP_PRICE_250}
//          />
//        </div>
//      </Card>
//    </div>
//    <div style={{ width: "240px" }} className="mb-3">
//      <Card
//        hoverable
//        style={{ width: 240 }}
//        cover={
//          <div
//            style={{
//              background:
//                "linear-gradient(90deg, rgb(45, 103, 185), rgb(35, 80, 144))",
//              height: "200px",
//              padding: "5px",
//            }}
//          >
//            <img width={100} height={100} src={pdfIcon} alt="" />
//            <h4 style={{ color: "white" }}>CEO pay TOP 500 FINAL</h4>
//          </div>
//        }
//      >
//        <div className="text-left">
//          <h5>Executive Report </h5>
//          <p
//            style={{
//              fontSize: "18px",
//              fontWeight: "bold",
//              marginBottom: "5px",
//            }}
//          >
//            ₹ 25,000
//          </p>
//          <p>Receive Instantly</p>
//          <CheckoutComponent
//            text={"Buy now"}
//            price={process.env.REACT_APP_PRICE_500}
//          />
//        </div>
//      </Card>
//    </div>
//  </div>

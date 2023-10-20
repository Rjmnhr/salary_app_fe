import React from "react";

import NavBar from "../../components/nav-bar";
// import pdf from "./CEO_pay_NSE100.pdf";
import { Card, Badge } from "antd";
import pdfIcon from "../../pdf.png";
import CheckoutComponent from "../../components/payment_checkout/Checkout";

const ExecutiveReports = () => {
  return (
    <>
      <NavBar />
      <div
        className="vh-90"
        style={{ marginTop: "100px", display: "grid", placeItems: "center" }}
      >
        {/* <iframe title="pdf" src={pdf} width="100%" height="700px"></iframe> */}
        <div
          className="container col-12 "
          style={{ display: "grid", placeItems: "center" }}
        >
          <h5 className="mb-3">Executive Compensation Reports</h5>
          <div style={{ width: "240px" }}>
            <Badge.Ribbon placement="start" text="Best seller">
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <div
                    style={{
                      background:
                        "linear-gradient(90deg, rgb(45, 103, 185), rgb(35, 80, 144))",
                      height: "200px",
                      padding: "5px",
                    }}
                  >
                    <img width={100} height={100} src={pdfIcon} alt="" />
                    <h4 style={{ color: "white" }}>
                      CEO Pay at NSE of 100 companies
                    </h4>
                  </div>
                }
              >
                <div className="text-left">
                  <h5>Executive Report </h5>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    ₹ 25,000
                  </p>
                  <p>Receive Instantly</p>
                  <CheckoutComponent />
                </div>
              </Card>
            </Badge.Ribbon>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExecutiveReports;

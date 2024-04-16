import React, { useEffect, useState } from "react";
import NavBar from "../layout/nav-bar";
import { Helmet } from "react-helmet";
import Card from "@mui/material/Card";

import {
  CalendarOutlined,
  CloseCircleFilled,
  EnvironmentOutlined,
  RightOutlined,
} from "@ant-design/icons";

import { useApplicationContext } from "../../context/app-context";
import {
  login_app_path,
  pay_pulse_dashboard_path,
} from "../../config/constant";
import { useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import AxiosInstance from "../../config/axios";
import { api_pay_pulse_getActivity } from "../../config/config";
import PayPulseInputDemo from "./demo-input";

const PayPulseInputPage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const { userData, payPulsePrevReports, setPayPulsePrevReports, isMobile } =
    useApplicationContext();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    AxiosInstance.post(
      api_pay_pulse_getActivity,
      { payload: "payload" },
      {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${accessToken}`,
        },
      }
    )
      .then(async (response) => {
        const data = await response.data;

        if (response.status === 403 || response.status === 401)
          return navigate(login_app_path);

        if (data.status === 200) {
          setPayPulsePrevReports(data.data);
        } else {
          return navigate(login_app_path);
        }
      })

      .catch((err) => console.log(err));

    //eslint-disable-next-line
  }, [userData, accessToken, navigate]);
  return (
    <div>
      <Helmet>
        <title>PayPulse | Equipay Partners</title>
        <meta
          name="description"
          content="Refine pay strategies with Equipay's PayPulse, ensuring precise and competitive compensation for every role."
        />
        <meta
          property="og:description"
          content="Refine pay strategies with Equipay's PayPulse, ensuring precise and competitive compensation for every role."
        />
        {/* Add other meta tags, link tags, etc. as needed */}
      </Helmet>
      <NavBar />

      <div style={{ marginTop: "90px" }} className=" p-0 ">
        <div
          className="d-lg-flex justify-content-center align-items-center"
          style={{
            position: "relative",
            height: "88vh",
          }}
        >
          {payPulsePrevReports?.length > 0 && (
            <div className="d-flex justify-content-start">
              <button
                className="btn  p-lg-3 shadow"
                style={{
                  position: isMobile ? "" : "absolute",
                  top: 0,
                  left: 0,
                  borderRadius: "  0 18px 18px 0  ",
                  marginTop: isMobile ? "0" : "30px",
                  background: "#9c9c9c",
                  color: "white",
                }}
                onClick={showDrawer}
              >
                <span>Previous Reports </span> <RightOutlined />
              </button>
            </div>
          )}
          <div className="container">
            <div
              className={` ${
                payPulsePrevReports?.length > 0 ? "col-lg-12" : "col-lg-12"
              } p-0    `}
            >
              <PayPulseInputDemo />
            </div>
          </div>

          <Drawer
            title="Previous Reports"
            placement="left"
            closable={false}
            onClose={onClose}
            open={open}
            getContainer={false}
            style={{ position: "relative" }}
          >
            {isMobile && (
              <button
                onClick={onClose}
                className=" btn  mr-3 mt-2 "
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                <CloseCircleFilled />{" "}
              </button>
            )}

            <PreviousReportComponent prevReports={payPulsePrevReports} />
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default PayPulseInputPage;

const PreviousReportComponent = ({ prevReports }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(
    parseInt(sessionStorage.getItem("activeIndex")) || 0
  );

  return (
    <div>
      {prevReports
        ? prevReports.reverse().map((data, index) => {
            // Check if the current index is not the first one (index 0)

            return (
              <Card
                className={`card selectable-tab p-2 px-3 text-left mb-3 ${
                  activeIndex === index ? "selected-tab" : ""
                }`}
                key={data.report_id}
                onClick={() => {
                  setActiveIndex(index);
                  sessionStorage.setItem("activeIndex", index);
                  navigate(pay_pulse_dashboard_path);
                }}
                style={{ cursor: "pointer" }}
              >
                <p style={{ fontWeight: "500" }} className="fw-b text-primary">
                  {data.title}
                </p>
                <div className="d-flex justify-content-start align-items-center">
                  <p
                    className=" border-right px-2"
                    style={{
                      borderRight: "1px solid",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <CalendarOutlined /> {data.experience} years
                  </p>
                  <p
                    className=" border-right px-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    {" "}
                    <EnvironmentOutlined /> {data.location}
                  </p>
                </div>
              </Card>
            );
          })
        : "Loading...."}
    </div>
  );
};

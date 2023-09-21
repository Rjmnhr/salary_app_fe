import React from "react";
import { Tabs } from "antd";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import NavBar from "../../components/nav-bar/index";
import "./style.css";

const ReportsPage = () => {
  return (
    <>
      <NavBar />

      <div
        className="container-fluid  d-flex justify-content-center align-items-start"
        style={{ padding: "0" }}
      >
        <div
          className="container col-2  side-bar border"
          style={{ height: "100vh", padding: "0" }}
        >
          <div className="container-fluid p-0 text-center">
            <Tabs
              style={{ width: "100%", textAlign: "center" }}
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Business",
                },
                {
                  key: "2",
                  label: "Personal",
                },
              ]}
            />
          </div>
          <div className="container-fluid p-0">
            <ul style={{ listStyle: "none", padding: "0" }}>
              <li className="p-3 border" style={{ background: "powderblue" }}>
                Reports
              </li>
            </ul>
          </div>
        </div>
        <div className="container-fluid p-3 col-3 reports-list">
          <input className="form-control mb-3" placeholder="search" />
          <button className="btn btn-primary mb-3 w-100">
            Get More Reports
          </button>
          <div>
            <div className="card p-2 px-3 text-start">
              <p className="fw-b text-primary">Software Developer, Bangalore</p>
              <div className="d-flex justify-content-start align-items-center">
                <p
                  className=" border-right px-2"
                  style={{ borderRight: "1px solid" }}
                >
                  <CalendarOutlined /> 1 year
                </p>
                <p className=" border-right px-2">
                  {" "}
                  <EnvironmentOutlined /> Bangalore
                </p>
              </div>
              <p
                style={{ fontSize: "10px", color: "gray", fontWeight: "bold" }}
              >
                BENCHMARKED JOB
              </p>
            </div>
          </div>
        </div>
        <div
          className="container-fluid col-7 d-grid "
          style={{
            background: "rgba(0, 0, 0, 0.02)",
            height: "100vh",
            justifyItems: "center",
          }}
        >
          <div
            className="container col-11 m-3 p-3 text-start"
            style={{ background: "white", height: "100vh" }}
          >
            <h3>Software Developer Compensation Report</h3>
            <div className="d-flex justify-content-start align-items-center">
              <p
                className=" border-right px-2"
                style={{ borderRight: "1px solid" }}
              >
                <CalendarOutlined /> 1 year
              </p>

              <p className=" border-right px-2">
                {" "}
                <EnvironmentOutlined /> Bangalore
              </p>
            </div>
            <div>
              <h5>Base Pay at 50th</h5>
              <p className="fs-3"> ₹771,595</p>
              <div className="d-flex mb-3">
                <div style={{ height: "100px", width: "10%" }}>
                  <svg height="30" width="100%">
                    <defs>
                      <linearGradient
                        id="default-bar"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop style={{ stopColor: "#fff" }} />
                        <stop offset="100%" style={{ stopColor: "#e9e9ec" }} />
                      </linearGradient>
                    </defs>
                    <rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="url('#default-bar')"
                    ></rect>
                    Sorry, your browser does not support inline SVG.
                  </svg>
                </div>
                <div style={{ height: "100px", width: "15%" }}>
                  <div
                    style={{
                      height: "30px",
                      width: "100%",
                      background: "#f8a66e",
                    }}
                  ></div>
                  <div className="w-100 text-start mt-2">
                    <p
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      10%
                    </p>
                    <p style={{ fontWeight: "bold", color: "gray" }}>₹427k</p>
                  </div>
                </div>
                ​{" "}
                <div style={{ height: "100px", width: "50%" }}>
                  <svg height="30" width="100%">
                    <defs>
                      <linearGradient
                        id="default-middleBar"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "#18969b", stopOpacity: 1 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: "#2d67b9", stopOpacity: 1 }}
                        />
                      </linearGradient>
                    </defs>
                    <rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="url('#default-middleBar')"
                    />
                    {/* Vertical dotted line in the middle */}
                    <line
                      x1="50%"
                      y1="0"
                      x2="50%"
                      y2="100%"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    Sorry, your browser does not support inline SVG.
                  </svg>
                  <div className="w-100 text-center mt-2">
                    <p
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      MEDIAN
                    </p>
                    <p style={{ fontWeight: "bold", color: "gray" }}>₹808k</p>
                  </div>
                </div>
                <div style={{ height: "100px", width: "15%" }}>
                  <div
                    style={{
                      height: "30px",
                      width: "100%",
                      background: "#00aaa4",
                    }}
                  ></div>
                  <div className="w-100 text-start mt-2">
                    <p
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      90%
                    </p>
                    <p style={{ fontWeight: "bold", color: "gray" }}>₹1m</p>
                  </div>
                </div>
                <svg
                  height="30"
                  width="10%"
                  style={{ transform: "rotate(180deg)" }}
                >
                  <defs>
                    <linearGradient
                      id="default-bar"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop style={{ stopColor: "#fff" }} />
                      <stop offset="100%" style={{ stopColor: "#e9e9ec" }} />
                    </linearGradient>
                  </defs>
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url('#default-bar')"
                  ></rect>
                  Sorry, your browser does not support inline SVG.
                </svg>
              </div>

              <div>
                <h5>Total Cash Compensation</h5>
                <p className="fs-3"> ₹807,853</p>
                <div className="d-flex">
                  <div style={{ height: "100px", width: "10%" }}>
                    <svg height="30" width="100%">
                      <defs>
                        <linearGradient
                          id="default-bar"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop style={{ stopColor: "#fff" }} />
                          <stop
                            offset="100%"
                            style={{ stopColor: "#e9e9ec" }}
                          />
                        </linearGradient>
                      </defs>
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url('#default-bar')"
                      ></rect>
                      Sorry, your browser does not support inline SVG.
                    </svg>
                  </div>
                  <div style={{ height: "100px", width: "15%" }}>
                    <div
                      style={{
                        height: "30px",
                        width: "100%",
                        background: "#f8a66e",
                      }}
                    ></div>
                    <div className="w-100 text-start mt-2">
                      <p
                        style={{
                          fontWeight: "bold",
                          margin: "0",
                          color: "gray",
                        }}
                      >
                        10%
                      </p>
                      <p style={{ fontWeight: "bold", color: "gray" }}>₹427k</p>
                    </div>
                  </div>
                  ​{" "}
                  <div style={{ height: "100px", width: "50%" }}>
                    <svg height="30" width="100%">
                      <defs>
                        <linearGradient
                          id="default-middleBar"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop
                            offset="0%"
                            style={{ stopColor: "#18969b", stopOpacity: 1 }}
                          />
                          <stop
                            offset="100%"
                            style={{ stopColor: "#2d67b9", stopOpacity: 1 }}
                          />
                        </linearGradient>
                      </defs>
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url('#default-middleBar')"
                      />
                      {/* Vertical dotted line in the middle */}
                      <line
                        x1="50%"
                        y1="0"
                        x2="50%"
                        y2="100%"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      Sorry, your browser does not support inline SVG.
                    </svg>
                    <div className="w-100 text-center mt-2">
                      <p
                        style={{
                          fontWeight: "bold",
                          margin: "0",
                          color: "gray",
                        }}
                      >
                        MEDIAN
                      </p>
                      <p style={{ fontWeight: "bold", color: "gray" }}>₹808k</p>
                    </div>
                  </div>
                  <div style={{ height: "100px", width: "15%" }}>
                    <div
                      style={{
                        height: "30px",
                        width: "100%",
                        background: "#00aaa4",
                      }}
                    ></div>
                    <div className="w-100 text-start mt-2">
                      <p
                        style={{
                          fontWeight: "bold",
                          margin: "0",
                          color: "gray",
                        }}
                      >
                        90%
                      </p>
                      <p style={{ fontWeight: "bold", color: "gray" }}>₹1m</p>
                    </div>
                  </div>
                  <svg
                    height="30"
                    width="10%"
                    style={{ transform: "rotate(180deg)" }}
                  >
                    <defs>
                      <linearGradient
                        id="default-bar"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop style={{ stopColor: "#fff" }} />
                        <stop offset="100%" style={{ stopColor: "#e9e9ec" }} />
                      </linearGradient>
                    </defs>
                    <rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="url('#default-bar')"
                    ></rect>
                    Sorry, your browser does not support inline SVG.
                  </svg>
                </div>
                <div>
                  <h5> Compensation Summary</h5>
                  <img
                    style={{ width: "100%" }}
                    src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1695222287/yyjthnse3ihldkuyzzds.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsPage;

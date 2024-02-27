import React from 'react'
import { decimalFix } from '../../../utils/price-a-job-helper-functions'

const LinearSalaryChart = ({data}) => {
  return (
    <div>
          <div className="d-flex mb-3 mt-3">
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
                  <div className="w-100 text-start mt-2">
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      Min
                    </p>
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", color: "gray" }}
                    >
                      {decimalFix(data.minSalary)} LPA
                    </p>
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
                  <div className="w-100 d-flex justify-content-between">
                    <div className="w-100 text-start mt-2">
                      <p
                        className="stripe-text"
                        style={{
                          fontWeight: "bold",
                          margin: "0",
                          color: "gray",
                        }}
                      >
                        25th Percentile
                      </p>
                      <p
                        className="stripe-text"
                        style={{ fontWeight: "bold", color: "gray" }}
                      >
                        {decimalFix(data.percentile25)} LPA
                      </p>
                    </div>
                    <div className="w-100 text-center mt-2">
                      <p
                        className="stripe-text"
                        style={{
                          fontWeight: "bold",
                          margin: "0",
                          color: "gray",
                        }}
                      >
                        MEDIAN
                      </p>
                      <p
                        className="stripe-text"
                        style={{ fontWeight: "bold", color: "gray" }}
                      >
                        {decimalFix(data.medianSalary)} LPA
                      </p>
                    </div>
                    <div className="w-100 text-right mt-2">
                      <p
                        className="stripe-text"
                        style={{
                          fontWeight: "bold",
                          margin: "0",
                          color: "gray",
                        }}
                      >
                        75th Percentile
                      </p>
                      <p
                        className="stripe-text"
                        style={{ fontWeight: "bold", color: "gray" }}
                      >
                        {decimalFix(data.percentile75)} LPA
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ height: "100px", width: "15%" }}>
                  <div
                    style={{
                      height: "30px",
                      width: "100%",
                      background: "#3b7dd8",
                    }}
                  ></div>
                </div>
                <div style={{ height: "100px", width: "10%" }}>
                  <svg
                    height="30"
                    width="100%"
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
                  <div className="w-100 text-right mt-2">
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", margin: "0", color: "gray" }}
                    >
                      Max
                    </p>
                    <p
                      className="stripe-text"
                      style={{ fontWeight: "bold", color: "gray" }}
                    >
                      {decimalFix(data.maxSalary)} LPA
                    </p>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default LinearSalaryChart



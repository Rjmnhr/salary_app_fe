import React from "react";
import { KPIReportComponentStyled } from "./style";

const KPIReportComponent = ({ resultData }) => {
  return (
    <div
      className="container p-0  bg-light mt-3 scrollable-container "
      style={{ height: "85vh", overflowY: "scroll" }}
    >
      <KPIReportComponentStyled>
        {resultData?.length > 1 ? (
          <table className="border text-left" style={{ position: "relative" }}>
            <thead
              style={{ color: "white", position: "sticky", top: 0 }}
              className="border bg-dark"
            >
              <tr>
                <th>Individual KPI</th>

                <th> Typical Weighting</th>
              </tr>
            </thead>
            <tbody>
              {resultData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Individual_kpis}</td>
                  <td>{item.weighting * 100}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            style={{
              display: "grid",
              justifyItems: "start",
              textAlign: "start",
            }}
            className="mt-1 mt-lg-3"
          >
            <div
              className="d-lg-flex justify-content-lg-start justify-content-center align-items-center p-3 text-lg-left text-center"
              style={{ background: "#fff" }}
            >
              <div>
                <h2>Your report was unsuccessful</h2>
                <p>
                  Sorry! We haven't collected enough data yet to generate this
                  report. Check back soon
                </p>
              </div>

              <img
                src="https://www.payscale.com/content/market-worth-promo@2x.png"
                alt=""
                height={200}
                width={300}
              />
            </div>
          </div>
        )}
      </KPIReportComponentStyled>
    </div>
  );
};

export default KPIReportComponent;

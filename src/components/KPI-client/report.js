import React from "react";
import { KPIReportComponentStyled } from "../../pages/KPI-report/style";

const KPIReportComponent = ({ resultData }) => {
  return (
    <div
      className="container p-0  bg-light mt-3 scrollable-container "
      style={{ height: "85vh", overflowY: "scroll" }}
    >
      <KPIReportComponentStyled>
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
      </KPIReportComponentStyled>
    </div>
  );
};

export default KPIReportComponent;

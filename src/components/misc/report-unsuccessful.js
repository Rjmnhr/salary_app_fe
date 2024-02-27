import React from "react";

const ReportUnsuccessful = () => {
  return (
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
            Sorry! We haven't collected enough data yet to generate this report.
            Check back soon
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
  );
};

export default ReportUnsuccessful;

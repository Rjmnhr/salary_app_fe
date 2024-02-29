import React from "react";
import icon from "../../icons/9169253.jpg";

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
        className="w-100 p-3 text-center"
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
          // src="https://www.payscale.com/content/market-worth-promo@2x.png"
          src={icon}
          alt=""
          height={300}
          width={300}
        />
      </div>
    </div>
  );
};

export default ReportUnsuccessful;

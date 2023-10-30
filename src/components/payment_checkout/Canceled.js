import React from "react";
import cancel from "../../cancelled.png";
import { useNavigate } from "react-router-dom";

const Canceled = () => {
  const navigate = useNavigate();
  return (
    <div
      className="sr-root"
      style={{
        display: "grid",
        justifyItems: "center",
        height: "100vh",
        alignContent: "center",
      }}
    >
      {/* <div className="sr-section completed-view">
      <div className="sr-callout">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div> */}

      <div className="sr-content p-3 col-12 col-lg-8">
        <div>
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
            <h1>Payment was cancelled!</h1>
            <img
              style={{ marginLeft: "10px" }}
              src={cancel}
              alt=""
              width={50}
              height={50}
            />{" "}
          </div>

          <button
            onClick={() => navigate("/")}
            style={{
              fontSize: "20px",
              margin: "10px",
              background: "black",
              color: "white",
            }}
            className="btn "
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canceled;

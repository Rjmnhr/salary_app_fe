import React, { useEffect, useState } from "react";
import cancel from "../../icons/cancelled.png";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../axios";

const Canceled = () => {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(Date.now());
  const location = window.location.href;
  const userID = localStorage.getItem("user_id");
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

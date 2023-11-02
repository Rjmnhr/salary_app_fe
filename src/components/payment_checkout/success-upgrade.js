import React from "react";
import successTick from "../../icons/check-soft-bg.svg";
import preLoader from "../../icons/Settings.gif";
import { useEffect } from "react";
import AxiosInstance from "../axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SuccessUpgrade = () => {
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const userID = localStorage.getItem("user_id");
    const userPlan = sessionStorage.getItem("upgrade_plan");

    if (userPlan && userID) {
      AxiosInstance.post(
        "/api/user/upgrade",
        { plan: userPlan, id: userID },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          //eslint-disable-next-line
          const data = await response.data;
          sessionStorage.removeItem("upgrade_plan");
          setIsProfileUpdated(true);
        })
        .catch((err) => {
          console.log(err);
          alert("something is wrong");
          sessionStorage.removeItem("upgrade_plan");
          // navigate("/login");
        });
    } else {
      alert("something wrong");
      navigate("/");
    }

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isProfileUpdated) {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          clearInterval(countdown);
          navigate("/reports");
        }
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [seconds, navigate, isProfileUpdated]);
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
            <h1>Payment Successful!</h1>
            <img
              style={{ marginLeft: "10px" }}
              src={successTick}
              alt=""
              width={50}
              height={50}
            />{" "}
          </div>
          {isProfileUpdated ? (
            <>
              {" "}
              <h1>Your Account is Upgraded </h1>{" "}
              <p>You will be redirecting automatically in {seconds} seconds</p>{" "}
              or <a href="/price-a-job">Click here</a>{" "}
            </>
          ) : (
            <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
              <h1>Your Account is getting upgrade </h1>
              <img
                style={{ marginLeft: "10px" }}
                src={preLoader}
                alt=""
                width={50}
                height={50}
              />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessUpgrade;

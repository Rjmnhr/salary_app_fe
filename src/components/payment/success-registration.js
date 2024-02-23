import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


import successTick from "../../icons/check-soft-bg.svg";
import preLoader from "../../icons/Settings.gif";
import AxiosInstance from "../../config/axios";

const SuccessRegistration = () => {
  //eslint-disable-next-line
  const [session, setSession] = useState({});
  const location = useLocation();
  const sessionId = location.search.replace("?session_id=", "");

  const first_name = localStorage.getItem("first_name");

  const last_name = localStorage.getItem("last_name");
  const password = localStorage.getItem("password");
  const phone = localStorage.getItem("phone");
  const email = localStorage.getItem("email");
  const [isProfileCreated, setProfileCreated] = useState(false);
  const [userAction, setUserAction] = useState("");

  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();

  const locationURL = window.location.href;
  const userID = localStorage.getItem("user_id");
  useEffect(() => {
    AxiosInstance.post(
      `/api/track-data/store3`,
      { path: locationURL, id: userID },
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

    //eslint-disable-next-line
  }, []);

  const [startTime, setStartTime] = useState(Date.now());
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

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, [sessionId]);

  useEffect(() => {
    if (isProfileCreated) {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          clearInterval(countdown);
          navigate("/price-a-job-add-details");
        }
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [seconds, navigate, isProfileCreated]);

  useEffect(() => {
    async function fetchSession() {
      await AxiosInstance.get("/checkout-session?sessionId=" + sessionId).then(
        async (res) => {
          const response = await res.data;
          setSession(response);

          const UserPlan = response.metadata.plan;
          const action = response.metadata.action;
          setUserAction(action);
          if (!isProfileCreated && action === "Register") {
            CreateProfile(UserPlan);
          } else if (action === "Upgrade") {
            sessionStorage.setItem("upgrade_plan", UserPlan);

            navigate("/success-upgrade");
          }
        }
      );
    }
    if (sessionId) {
      fetchSession();
    }

    //eslint-disable-next-line
  }, [sessionId]);

  const clearLocalStorage = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("password");
    localStorage.removeItem("phone");
  };

  const CreateProfile = (plan) => {
    const formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("plan", plan);

    AxiosInstance.post("/api/user/signup", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.data;

        const accessToken = data.accessToken;

        if (!accessToken) {
          navigate("/login");
          clearLocalStorage();
          return;
        }

        const user_id = data.id;
        // const plan = data.plan;

        // localStorage.setItem("plan", plan);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("email", data.email);

        clearLocalStorage();
        setProfileCreated(true); // Mark profile as created
      })
      .catch((err) => {
        console.log(err);
        alert("something is wrong");

        navigate("/login");
      });
  };

  return (
    <>
      {userAction === "Register" && sessionId ? (
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
              {isProfileCreated ? (
                <>
                  {" "}
                  <h1>Your Account is ready </h1>{" "}
                  <p>
                    You will be redirecting automatically in {seconds} seconds
                  </p>{" "}
                  or <a href="/price-a-job-add-details">Click here</a>{" "}
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                  <h1>Your Account is getting ready </h1>
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
      ) : (
        ""
      )}
    </>
  );
};

export default SuccessRegistration;

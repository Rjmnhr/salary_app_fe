import React, { useState, useEffect } from "react";

import preLoader from "../../icons/Settings.gif";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../config/axios";
import { useApplicationContext } from "../../context/app-context";
import { login_path, pay_pulse_input_path } from "../../config/constant";
import { goToExternalURL } from "../../utils/price-a-job-helper-functions";

const SuccessRegistrationBasic = () => {
  const first_name = sessionStorage.getItem("first_name");

  const last_name = sessionStorage.getItem("last_name");
  const password = sessionStorage.getItem("password");
  const phone = sessionStorage.getItem("phone");
  const email = sessionStorage.getItem("email");
  const job = sessionStorage.getItem("job");
  const company = sessionStorage.getItem("company");
  const [isProfileCreated, setProfileCreated] = useState(false);
  const { setUserData, userData, isTrailActive } = useApplicationContext();
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();

  const location = window.location.href;
  const userID = localStorage.getItem("user_id");
  useEffect(() => {
    AxiosInstance.post(
      `/api/track-data/store3`,
      { path: location, id: userID },
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
    if (isProfileCreated) {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          clearInterval(countdown);
          goToExternalURL(
            pay_pulse_input_path,
            userData?.user_type,
            isTrailActive
          );
        }
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [seconds, navigate, isProfileCreated, userData, isTrailActive]);

  useEffect(() => {
    CreateProfile("Basic");

    //eslint-disable-next-line
  }, []);

  const clearSessionStorage = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("first_name");
    sessionStorage.removeItem("last_name");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("job");
    sessionStorage.removeItem("company");
  };

  const CreateProfile = (plan) => {
    const formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("plan", plan);
    formData.append("job", job);
    formData.append("company", company);
    AxiosInstance.post("/api/user/signup", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.data;

        const accessToken = data.accessToken;

        if (!accessToken) {
          navigate(login_path);
          clearSessionStorage();
          return;
        }
        setUserData(data);

        // const plan = data.plan;

        // localStorage.setItem("plan", plan);

        localStorage.setItem("accessToken", accessToken);

        clearSessionStorage();
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
            {isProfileCreated ? (
              <>
                {" "}
                <h1>Your Account is ready </h1>{" "}
                <p>
                  You will be redirecting automatically in {seconds} seconds
                </p>{" "}
                or <a href={pay_pulse_input_path}>Click here</a>{" "}
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
    </>
  );
};

export default SuccessRegistrationBasic;

import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../../components/axios";

const UserAccount = () => {
  const [userInfo, setUserInfo] = useState(null);

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
    const userID = localStorage.getItem("user_id");
    AxiosInstance.get(`api/user/details?id=${userID}`)
      .then(async (res) => {
        const response = await res.data;
        sessionStorage.setItem("user-email", response.email);
        sessionStorage.setItem("user-plan", response.plan);
        setUserInfo(response);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container p-3 min-vh-100 mt-2 mt-lg-5">
      <div
        className="d-flex justify-content-between align-items-center "
        style={{ gap: "10px" }}
      >
        <div className="col-12 section-title ">
          <h2 style={{ width: "100%" }} className="col-12 ">
            Account
          </h2>
        </div>
      </div>
      <Divider />

      <div className="d-lg-flex">
        <div className="container col-lg-4 col-12 text-left">
          <h3 className="mb-3">MEMBERSHIP</h3>
        </div>

        <div className="container col-lg-8 col-12">
          <div className="d-flex justify-content-between align-items-center mb-3 ">
            <p style={{ margin: "0" }}>{userInfo?.email}</p>
            <a href="/change-email">Change email</a>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3 ">
            <p style={{ margin: "0" }}>Password: ********</p>
            <a href="/change-password">Change password</a>
          </div>
        </div>
      </div>
      <Divider />
      <div className="d-lg-flex">
        <div className="container col-lg-4 col-12 text-left">
          <h3 className="mb-3">PLAN DETAILS</h3>
        </div>

        <div className="container col-lg-8 col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p style={{ margin: "0" }}>{userInfo?.plan}</p>
            <a href="/change-plan">Change plan</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;

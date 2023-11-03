import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../../components/axios";

const UserAccount = () => {
  const [userInfo, setUserInfo] = useState(null);
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

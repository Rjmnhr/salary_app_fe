import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import AxiosInstance from "../axios";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleLoginComponent = ({ element }) => {
  const navigate = useNavigate();
  const Location = useLocation();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then(async (res) => {
          const data = await res.data;

          storeData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const storeData = (data) => {
    const formData = new FormData();
    formData.append("first_name", data.given_name);
    formData.append("last_name", data.family_name);
    formData.append("email", data.email);

    AxiosInstance.post("/api/user/create-google-user", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.data;
        console.log(data);
        if (!response.status === 200) return alert("Something ids wrong");

        const user_id = data.id;

        localStorage.setItem("user_id", user_id);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("accessToken", data.accessToken);

        if (Location.pathname === "/login-app") {
          navigate("/price-a-job");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button
        className="btn border w-75 btn-white btn-lg d-grid mb-4"
        onClick={googleLogin}
        style={{ padding: "5px", fontSize: "16px" }}
      >
        <span className="d-flex justify-content-center gap-3 align-items-center">
          <img
            className="avatar avatar-xss me-2"
            src="./assets/svg/brands/google-icon.svg"
            alt="IDescription"
            height={20}
            width={20}
            style={{ marginRight: "10px" }}
          />
          {element}
        </span>
      </button>
    </div>
  );
};

export default GoogleLoginComponent;

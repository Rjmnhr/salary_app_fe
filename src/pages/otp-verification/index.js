import React from "react";
import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { OtpVerificationPageStyled } from "./style";
import { message } from "antd";
import AxiosInstance from "../../components/axios";

import { LoadingOutlined } from "@ant-design/icons";
import { useApplicationContext } from "../../context/app-context";

const OtpVerification = () => {
  const [warning, setWarning] = useState("");

  const [otpPin, setOtpPin] = useState(Array(6).fill(""));
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const email = localStorage.getItem("email");
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const password = localStorage.getItem("password");
  const phone = localStorage.getItem("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { setIsSignIn } = useApplicationContext();

  const clearLocalStorage = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("password");
    localStorage.removeItem("phone");
  };

  const handleInputChange = (index, event) => {
    const input = event.target.value;

    if (/^\d?$/.test(input)) {
      const updatedOtpPin = [...otpPin];
      updatedOtpPin[index] = input;

      if (input && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
      setOtpPin(updatedOtpPin);
    }

    //updating the postcodes as an array
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otpPin[index] === "") {
      const updatedOtpPin = [...otpPin];
      updatedOtpPin[index - 1] = "";

      setOtpPin(updatedOtpPin);

      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    } else if (
      event.key === "ArrowRight" &&
      index < 5 &&
      otpPin[index] !== ""
    ) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const joinedOtpPin = otpPin.join("");

    AxiosInstance.post("/api/otp/verify-otp", {
      email: email,
      otp: joinedOtpPin,
    })
      .then(async (response) => {
        const data = await response.data;
        console.log(data);
        if (!response.status === 200) {
          alert("something wrong");
          return;
        }

        CreateProfile();
      })
      .catch((err) => {
        setWarning("Invalid OTP");

        console.log(err);
      });
  };

  const error = (data) => {
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  const CreateProfile = () => {
    const formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);

    AxiosInstance.post("/api/user/signup", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.data;
        setIsSignIn(false);
        setIsLoading(false);

        const accessToken = data.accessToken;
        const id = data.id;

        if (!accessToken) {
          error("Registration failed");
          navigate("/login");
          clearLocalStorage();
          return;
        }

        const userType = data.user_type;
        const user_id = data.id;

        localStorage.setItem("userType", userType);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user_id", id);
        localStorage.setItem("user_name", data.first_name);
        localStorage.setItem("email", data.email);

        if (userType === "admin") {
          localStorage.setItem("isAdmin", "true");
        } else {
          localStorage.setItem("isAdmin", "false");
        }

        clearLocalStorage();

        if (Location.pathname === "/login-app") {
          navigate("/price-a-job");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("something is wrong");
        navigate("/login");
      });
  };

  return (
    <>
      {contextHolder}
      <OtpVerificationPageStyled>
        <div className="main-container">
          <div
            className="left-container img_container"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dsw1ubwyh/image/upload/v1695657433/pgsgfjhvitdmjl0pnbco.png)",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "100vh",
              transform: "translate3d(0px, 0px, 0px)",
            }}
          >
            <p style={{ fontSize: "80px" }}>
              <span className="text-primary" style={{ fontWeight: "bold" }}>
                {" "}
                Equipay
              </span>{" "}
              <span style={{ color: "white" }}>Partners</span>
            </p>
          </div>
          <div className="right-container">
            <div className="right-sub-container">
              <div>
                <div>
                  <h3>Enter Verification Code</h3>
                </div>
                <p style={{ width: "80%" }}>
                  Please type in the <span>6-digit code</span>
                  sent to your email. If it does not appear in your Inbox,
                  please check your Updates, Quarantined or Spam folders.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                {otpPin.map((otp, index) => (
                  <input
                    style={{
                      width: "20px",
                      background: "none",
                      border: "none",
                      borderBottom: "1px solid black",
                      outline: "none",
                    }}
                    key={index}
                    type="number"
                    id={`otp-${index}`}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    value={otp}
                    onChange={(event) => handleInputChange(index, event)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    maxLength={1}
                  />
                ))}

                <p style={{ color: "red" }}>{warning}</p>
                <br />
                <button type="submit">
                  {isLoading ? <LoadingOutlined /> : "NEXT"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </OtpVerificationPageStyled>
    </>
  );
};

export default OtpVerification;

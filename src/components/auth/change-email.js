import shieldIcon from "../../icons/encrypted.png";
import emailIcon from "../../icons/gmail.png";

import React, { useState } from "react";
import { LoadingOutlined, ArrowRightOutlined } from "@ant-design/icons";

import { useEffect } from "react";
import { message, Modal } from "antd";
import { useApplicationContext } from "../../context/app-context";
import { CheckCircleOutlineRounded } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosInstance from "../../config/axios";

const email = sessionStorage.getItem("user-email");
const userID = localStorage.getItem("user_id");

const VerifyEmail = ({ setIsOtpSend }) => {
  const handleSubmit = async () => {
    const lowerCasedEmail = email.toLowerCase();
    console.log(lowerCasedEmail);

    AxiosInstance.post("/api/otp/send-otp", {
      email: lowerCasedEmail,
    })
      .then(async (response) => {
        const data = await response.data;
        // Handle successful OTP request
        console.log(data);

        setIsOtpSend(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <div
          style={{
            display: "grid",
            justifyItems: "center",
            alignContent: "center",
            minHeight: "100vh",
          }}
        >
          <img src={shieldIcon} height={100} width={100} alt="" />

          <h1 className="action-headline" data-uia="action-headline">
            <span id="" data-uia="">
              First, let's confirm your identity.
            </span>
          </h1>
          <p className="explanation-text" data-uia="explanation-text">
            <span id="" data-uia="">
              Before you make any changes, we'll just need to make sure it's
              you.
            </span>
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
            className="card p-3 border col-12 "
          >
            <div className="col-3">
              <img src={emailIcon} height={50} width={50} alt="" />
            </div>
            <div
              className="d-flex justify-content-between align-items-center col-9"
              onClick={handleSubmit}
            >
              <div className="text-left">
                <h5>Email a code</h5>

                <p className="factor-button-secondary-tex m-0">{email}</p>
              </div>
              <ArrowRightOutlined />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const OtpVerification = () => {
  const [otp, setOtp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const { setIsEmailVerified } = useApplicationContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    AxiosInstance.post("/api/otp/verify-otp", {
      email: email,
      otp: otp,
    })
      .then(async (response) => {
        const data = await response.data;
        console.log(data);

        setIsLoading(false);
        setIsEmailVerified(true);
      })
      .catch((err) => {
        setWarning("Invalid OTP");
        setIsLoading(false);

        console.log(err);
      });
  };

  return (
    <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <form onSubmit={handleSubmit} class=" text-start  col-lg-12">
        <div class="mb-5 text-start">
          <h1>SECURITY CHECK</h1>
          <h3>Check your email for a code</h3>
          <p>
            Please enter the code we sent to
            <span style={{ color: "gray", fontWeight: "bold" }}>
              {email}
            </span>{" "}
            to help us protect your account.
          </p>
        </div>
        <div style={{ display: "grid", placeItems: "center" }}>
          <div class="mb-3 col-lg-6">
            <input
              class="form-control form-control-lg"
              placeholder="Verification code"
              required
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        </div>

        <p style={{ color: "red" }}>{warning}</p>

        <div class="col-lg-12">
          <button type="submit" class="btn btn-primary w-50 w-lg-25">
            {isLoading ? <LoadingOutlined /> : "Verify Code"}
          </button>
        </div>
      </form>
    </div>
  );
};

const ChangeNewMail = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [modalVisible, setModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailUsed, setEmailUsed] = useState(false);
  const navigate = useNavigate();

  const notification = ({ message, type }) => {
    messageApi.open({
      type: type,
      content: message,
    });
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AxiosInstance.post(
      "/api/user/change-email",
      {
        email: newEmail,
        id: userID,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        //eslint-disable-next-line
        const data = await response.data;

        if (data === 404) {
          setEmailUsed(true);
          return;
        }

        if (!response.status === 200) {
          notification("email change failed", "error");
          return;
        }

        notification("email has been changed successfully ", "success");
        setModalVisible(true);
        e.target.reset();
        setTimeout(() => {
          // Navigate to the desired route after 5 seconds
          navigate("/account"); // Replace 'destination' with your actual route
        }, 5000); // 3 seconds in millisecondsx
      })
      .catch((err) => {
        notification("something error", "error");
        console.log(err);
      });
  };

  return (
    <>
      {contextHolder}
      <div>
        <div
          class="container  text-left p-3 mt-lg-5 mt-2"
          style={{
            minHeight: "100vh",
          }}
        >
          <h2>Change Email</h2>
          <p>Current Email is {email}</p>

          <form
            onSubmit={handleSubmit}
            class="php-email-form col-12 col-lg-8 p-0"
          >
            <div class="form-group mb-3 ">
              <input
                type="text"
                class="form-control"
                name="New email"
                id="New email"
                placeholder="New email"
                required
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <p style={{ fontSize: "14px", color: "red" }}>
                {emailUsed
                  ? "Email is already in use with another account"
                  : ""}
              </p>
            </div>

            <div class="text-left">
              <button type="submit" className="btn btn-primary w-25">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        visible={modalVisible}
        onCancel={handleModalClose}
        onOk={handleModalClose}
      >
        <div className="container p-3 d-flex-column align-items-center">
          <p className="d-flex align-items-center gap-1 ">
            Your email has been changed successfully!
            <CheckCircleOutlineRounded sx={{ color: "green" }} />{" "}
          </p>
        </div>
      </Modal>
    </>
  );
};

const ChangeEmail = () => {
  const [isOtpSend, setIsOtpSend] = useState(false);
  const { isEmailVerified } = useApplicationContext();
  const Location = useLocation();

  useEffect(() => {
    AxiosInstance.post(
      `/api/track-data/store3`,
      { path: Location.pathname },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        const data = await response.data;

        console.log(data);
      })
      .catch((err) => console.log(err));

    //eslint-disable-next-line
  }, []);
  return (
    <div>
      {isOtpSend ? (
        isEmailVerified ? (
          <ChangeNewMail />
        ) : (
          <OtpVerification />
        )
      ) : (
        <VerifyEmail setIsOtpSend={setIsOtpSend} />
      )}
    </div>
  );
};

export default ChangeEmail;

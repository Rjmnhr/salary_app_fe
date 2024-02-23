import React, { useEffect, useState } from "react";


import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { CheckCircleOutlineRounded } from "@mui/icons-material";
import AxiosInstance from "../../config/axios";

const ChangePassword = () => {
  const email = sessionStorage.getItem("user-email");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentPassword, setIsCurrentPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", currentPassword);

    try {
      const response = await AxiosInstance.post("/api/user/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.data;

      setIsLoading(false);

      if (data === 404) {
        setIsCurrentPassword(false);
        return;
      }

      resetPassword();
    } catch (err) {
      console.log(err);
    }
  };
  const resetPassword = (e) => {
    if (confirmPassword !== password) {
      return;
    }

    AxiosInstance.post(
      "/api/user/reset-password",
      {
        email: email,
        password: password,
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

        setIsLoading(false);
        if (!response.status === 200) {
          alert("Password reset failed");
          return;
        }

        setModalVisible(true);

        setTimeout(() => {
          // Navigate to the desired route after 5 seconds
          navigate("/account"); // Replace 'destination' with your actual route
        }, 5000); // 3 seconds in millisecondsx
      })
      .catch((err) => {
        alert("something error");
        console.log(err);
      });
  };
  useEffect(() => {
    if (password && confirmPassword)
      if (password === confirmPassword) {
        setIsPasswordSame(true);
      } else {
        setIsPasswordSame(false);
      }
    // eslint-disable-next-line
  }, [password, confirmPassword]);
  return (
    <div>
      <div
        class="container  text-left p-3 mt-lg-5 mt-2"
        style={{
          minHeight: "100vh",
        }}
      >
        <h2>Change password</h2>
        <p>Protect your account with a unique password</p>

        <form
          onSubmit={handleSubmit}
          class="php-email-form col-12 col-lg-8 p-0"
        >
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="Current password"
              id="Current password"
              placeholder="Current password"
              data-rule="minlen:4"
              data-msg="Please enter at least 8 chars of Current password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <div className="d-flex justify-content-start mb-4">
              {isCurrentPassword ? (
                ""
              ) : (
                <p style={{ color: "red", marginRight: "5px" }}>
                  Incorrect password.
                </p>
              )}
              <a className="form-label-link" href="/forgot-password">
                Forgot Password?
              </a>
            </div>
          </div>

          <div class="form-group mb-3 ">
            <input
              type="password"
              class="form-control"
              name="New password"
              id="New password"
              placeholder="New password"
              data-rule="minlen:4"
              data-msg="Please enter at least 8 chars of New password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div class="validate"></div>
          </div>

          <div class="form-group mb-3">
            <input
              type="password"
              class="form-control"
              name="Re-enter new password"
              id="Re-enter new password"
              placeholder="Re-enter new password"
              data-rule="minlen:4"
              data-msg="Please enter at least 8 chars of Re-enter new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {isPasswordSame === false ? (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  margin: "0",
                  paddingLeft: "15px",
                }}
              >
                Password does not match
              </p>
            ) : (
              ""
            )}
          </div>
          <div class="text-left">
            <button type="submit" className="btn btn-primary w-25">
              {isLoading ? <LoadingOutlined /> : "Save"}
            </button>
          </div>
        </form>
      </div>
      <Modal
        visible={modalVisible}
        onCancel={handleModalClose}
        onOk={handleModalClose}
      >
        <div className="container p-3 d-flex-column align-items-center">
          <p className="d-flex align-items-center gap-1 ">
            Your password has been successfully changed!
            <CheckCircleOutlineRounded sx={{ color: "green" }} />{" "}
          </p>

          <p style={{ cursor: "pointer" }}>
            You can now log in with your new password.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ChangePassword;

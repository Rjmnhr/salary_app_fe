import React, { useState } from "react";
// import InfoModal from "../modals/info-modal";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import { useApplicationContext } from "../../context/app-context";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../axios";
import { useEffect } from "react";
import { Input, message } from "antd";
import GoogleLoginComponent from "../google-login/google-login";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setIsSignIn } = useApplicationContext();
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Passwords does not match",
    });
  };

  const handleSwitch = () => {
    setIsSignIn(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (confirmPassword !== password) {
      error();
      return;
    }

    const lowerCasedEmail = email.toLowerCase();
    console.log(lowerCasedEmail);

    AxiosInstance.post("/api/otp/send-otp", {
      email: lowerCasedEmail,
    })
      .then(async (response) => {
        const data = await response.data;
        // Handle successful OTP request
        console.log(data);

        localStorage.setItem("email", lowerCasedEmail);
        localStorage.setItem("first_name", firstName);
        localStorage.setItem("last_name", lastName);
        localStorage.setItem("password", password);

        setIsLoading(false);
        navigate("/otp-validation");
      })
      .catch((err) => console.log(err));
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
    <>
      {contextHolder}
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "100vh",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {contextHolder}
        <div class="container card col-12 col-lg-4 p-3" data-aos="fade-up">
          <div class="section-title">
            <h2>Create your account</h2>
          </div>

          <div class="row" data-aos="fade-up" data-aos-delay="100">
            <div class="col-lg-12">
              <form class="php-email-form" onSubmit={handleSubmit}>
                <div class="d-flex">
                  <div class="col-6 form-group">
                    <input
                      type="text"
                      name="first Name"
                      class="form-control"
                      id="name"
                      placeholder="First name"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <div class="validate"></div>
                  </div>
                  <div class="col-6 form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="last name"
                      id="last name"
                      placeholder="Last name"
                      data-rule="last name"
                      data-msg="Please enter a valid last name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <div class="validate"></div>
                  </div>
                </div>
                <div class="col form-group">
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    data-rule="email"
                    data-msg="Please enter a valid email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div class="validate"></div>
                </div>
                <div className="mb-3 col-12 col-lg-12">
                  <Input.Password
                    placeholder=" Password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    className="border text-start"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3 col-12 col-lg-12">
                  <Input.Password
                    placeholder="Confirm password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    className="border text-start"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {isPasswordSame === false ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      margin: "0",
                      paddingLeft: "15px",
                    }}
                  >
                    Password does not match the confirm password.
                  </p>
                ) : (
                  ""
                )}

                <div class="text-center">
                  <button className="btn btn-primary w-75 mb-3" type="submit">
                    {isLoading ? <LoadingOutlined /> : "Create an account"}
                  </button>
                  <GoogleLoginComponent element={"sign up with Google"} />
                  <p class="card-text text-muted">
                    Remember your password?
                    <p
                      class="link"
                      style={{ cursor: "pointer" }}
                      onClick={handleSwitch}
                    >
                      Log in
                    </p>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;

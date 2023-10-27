import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApplicationContext } from "../../context/app-context";
import { Input, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";

import AxiosInstance from "../axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const Location = useLocation();
  const { setIsSignIn, setIsLoggedIn } = useApplicationContext();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSwitch = () => {
    setIsSignIn(false);
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    AxiosInstance.post("/api/user/login", formData, {
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        const data = await response.data;
        setIsLoading(false);

        if (!response.status === 200) {
          error("wrong password or username");
          document.querySelector("#signupSrPassword").style.border =
            "1px solid red";
          document.querySelector("#signinSrEmail").style.border =
            "1px solid red";
          return;
        }

        success();

        const accessToken = data.accessToken;
        const user_id = data.id;
        const plan = data.plan;

        if (!accessToken) return error(data);

        const userType = data.user_type;

        localStorage.setItem("userType", userType);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("plan", plan);
        sessionStorage.setItem("info", "");

        setIsLoggedIn(true);

        if (userType === "admin") {
          localStorage.setItem("isAdmin", "true");
        } else {
          localStorage.setItem("isAdmin", "false");
        }

        setEmail("");
        setPassword("");
        if (Location.pathname === "/login-app") {
          navigate("/price-a-job");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        error("Something wrong");
        console.log(err);
      });
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Login successfully",
    });
  };

  const error = (data) => {
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  useEffect(() => {
    let timeoutId;
    if (isLoading) {
      timeoutId = setTimeout(() => {
        setIsLoading(false);
        error("Check your internet connection");
      }, 15000);
    }
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line
  }, [isLoading]);
  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      {contextHolder}
      <div class="container card col-12  p-3" data-aos="fade-up">
        <div class="section-title">
          <h2>Login to Equipay Partners</h2>
        </div>

        <div class="row" data-aos="fade-up" data-aos-delay="100">
          <div class="col-lg-12">
            <form class="php-email-form" onSubmit={handleSubmit}>
              <div class="col form-group">
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  id="email"
                  placeholder="Email"
                  data-rule="email"
                  data-msg="Please enter a valid email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div class="validate"></div>
              </div>
              <div className="mb-3 col-12 col-lg-12">
                <Input.Password
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="border text-start"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div class="text-center">
                <button className="btn btn-primary w-75 mb-3" type="submit">
                  {isLoading ? <LoadingOutlined /> : "Log in"}
                </button>
                {/* <GoogleLoginComponent element={"Log in with Google"} /> */}
                <p class="card-text text-muted">
                  Don't have an account yet?
                  <span
                    class="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={handleSwitch}
                  >
                    {" "}
                    Sign up here
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

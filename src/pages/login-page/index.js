import { useApplicationContext } from "../../context/app-context";
import loginBG from "../../icons/salary-wave.png";
import { LoginPagestyled } from "./style";
import { useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import AxiosInstance from "../../config/axios";
import SignIn from "../../components/auth/sign-in";
import SignUp from "../../components/auth/sign-up";
import { home_path } from "../../config/constant";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isSignIn } = useApplicationContext();
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
  return (
    <>
      <Helmet>
        <title>Login | Equipay Partners</title>
        <meta
          name="description"
          content="Secure access to your Equipay Partners account. Login for personalized pay solutions, training resources, and exclusive advisory services."
        />
        <meta
          property="og:description"
          content="Secure access to your Equipay Partners account. Login for personalized pay solutions, training resources, and exclusive advisory services."
        />
        {/* Add other meta tags, link tags, etc. as needed */}
      </Helmet>
      <LoginPagestyled>
        <div className="main-container" style={{ height: "100vh" }}>
          <div
            className="left-container img_container p-3"
            style={{
              backgroundImage: `url(${loginBG})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "100vh",
            }}
          >
            <h1
              className="text-center"
              onClick={() => navigate(home_path)}
              style={{ cursor: "pointer" }}
            >
              Equipay Partners{" "}
            </h1>
            <p className="text-center" style={{ color: "black" }}>
              Your partners in all matters pay
            </p>
          </div>

          <div className="right-container">
            <div className="right-sub-container">
              <div>{isSignIn ? <SignIn /> : <SignUp />}</div>
            </div>
          </div>
        </div>
      </LoginPagestyled>
    </>
  );
};

export default LoginPage;

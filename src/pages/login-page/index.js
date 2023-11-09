import SignIn from "../../components/sign-in/sign-in";

import NavBar from "../../components/nav-bar/index";
import SignUp from "../../components/sign-up/sign-up";
import { useApplicationContext } from "../../context/app-context";
import loginBG from "../../icons/salary-wave.png";
import { LoginPagestyled } from "./style";
import { useEffect, useState } from "react";
import AxiosInstance from "../../components/axios";

const LoginPage = () => {
  const { isSignIn } = useApplicationContext();

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
      <LoginPagestyled>
        <NavBar />

        <div className="main-container" style={{ height: "100vh" }}>
          <div
            className="left-container img_container"
            style={{
              backgroundImage: `url(${loginBG})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "100vh",
              transform: "translate3d(0px, 0px, 0px)",
            }}
          ></div>
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

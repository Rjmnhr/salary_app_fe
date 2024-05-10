import { createContext, useContext, useEffect, useState } from "react";
import AxiosInstance from "../config/axios";
import { api_pay_pulse_getActivity_demo } from "../config/config";

const MyContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isPreviousReports, setIsPreviousReports] = useState(false);
  const [payPulsePrevReports, setPayPulsePrevReports] = useState([]);
  const [payPulsePrevReportsDemo, setPayPulsePrevReportsDemo] = useState([]);
  const [isTrailActive, setIsTrailActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    AxiosInstance.get(
      "api/user/details",

      {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => {
        const UserData = res.data?.data;
        if (res.status === 200) {
          setUserData(UserData);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px) to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add an event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (userData) {
      AxiosInstance.get(
        api_pay_pulse_getActivity_demo,

        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${accessToken}`,
          },
        }
      )
        .then(async (response) => {
          const data = await response.data;

          if (data.status === 200) {
            setPayPulsePrevReportsDemo(data.data);
            if (data?.data?.length > 0) {
              setIsTrailActive(false);
            } else {
              setIsTrailActive(true);
            }
          }
        })

        .catch((err) => console.log(err));
    }
  }, [userData, accessToken]);

  const value = {
    isSignIn,
    setIsSignIn,
    isEmailVerified,
    setIsEmailVerified,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    isPreviousReports,
    setIsPreviousReports,
    payPulsePrevReports,
    setPayPulsePrevReports,
    payPulsePrevReportsDemo,
    setPayPulsePrevReportsDemo,
    isMobile,
    setIsMobile,
    isTrailActive,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useApplicationContext = () => {
  return useContext(MyContext);
};

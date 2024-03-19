import { createContext, useContext, useEffect, useState } from "react";
import AxiosInstance from "../config/axios";

const MyContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isPreviousReports, setIsPreviousReports] = useState(false);
  const [payPulsePrevReports, setPayPulsePrevReports] = useState([]);

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
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useApplicationContext = () => {
  return useContext(MyContext);
};

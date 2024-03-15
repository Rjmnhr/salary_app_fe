import { createContext, useContext, useEffect, useState } from "react";
import AxiosInstance from "../config/axios";
import Cookies from "js-cookie";

const MyContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const accessToken = Cookies.get("accessToken");
  console.log("🚀 ~ useEffect ~ accessToken:", accessToken);
  useEffect(() => {
    if (accessToken) {
      const cachedUserData = Cookies.get("userData");
      if (cachedUserData) {
        setUserData(JSON.parse(cachedUserData));
        setIsLoggedIn(true);
      } else {
        AxiosInstance.get("api/user/details", {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        })
          .then((res) => {
            const UserData = res.data?.data;
            if (res.status === 200) {
              setUserData(UserData);
              setIsLoggedIn(true);
              Cookies.set("userData", JSON.stringify(UserData), { expires: 7 }); // Cookie expiration set to 7 days
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }, [accessToken]);

  const updateUserData = (newUserData) => {
    setUserData(newUserData);
    Cookies.set("userData", JSON.stringify(newUserData), { expires: 7 }); // Cookie expiration set to 7 days
  };

  const value = {
    isSignIn,
    setIsSignIn,
    isEmailVerified,
    setIsEmailVerified,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    updateUserData,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useApplicationContext = () => {
  return useContext(MyContext);
};

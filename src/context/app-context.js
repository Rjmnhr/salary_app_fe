import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPlan, setUserPlan] = useState("");

  const value = {
    isSignIn,
    setIsSignIn,
    isEmailVerified,
    setIsEmailVerified,
    isLoggedIn,
    setIsLoggedIn,
    accessToken,
    setAccessToken,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    userEmail,
    setUserEmail,
    userPlan,
    setUserPlan,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useApplicationContext = () => {
  return useContext(MyContext);
};

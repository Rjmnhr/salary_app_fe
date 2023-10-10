import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isSignIn, setIsSignIn] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = {
    isSignIn,
    setIsSignIn,

    isLoggedIn,
    setIsLoggedIn,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useApplicationContext = () => {
  return useContext(MyContext);
};

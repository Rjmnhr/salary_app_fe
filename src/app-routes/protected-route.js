import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AxiosInstance from "../config/axios";
import { useApplicationContext } from "../context/app-context";

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();
  const path = location.pathname;
  const accessToken = localStorage.getItem("accessToken");
  const { setFirstName, setLastName, setUserEmail, setUserPlan } =
    useApplicationContext();

  const VerifyToken = async () => {
    try {
      const res = await AxiosInstance.get(
        "/api/user/details",

        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await res.data;

      if (res.status === 200) {
        setIsAuthenticated(true);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setUserEmail(data.email);
        setUserPlan(data.plan);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.log(err);
      // Handle the error here or return an error response if needed
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    VerifyToken();
    //eslint-disable-next-line
  }, []);

  if (isAuthenticated !== null) {
    if (isAuthenticated) {
      return element;
    } else {
      // Redirect to the login page if not authenticated
      localStorage.removeItem("isLoggedIn");
      return <Navigate to={`/login-app?p=${path}`} />;
    }
  }
};

export default ProtectedRoute;

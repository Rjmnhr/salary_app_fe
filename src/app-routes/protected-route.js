import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();
  const path = location.pathname;

  const VerifyToken = async () => {
    try {
      const res = await fetch(
        "https://backend.equipaypartners.com/api/token/verify",
        // "http://localhost:8003/api/token/verify",
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        setIsAuthenticated(true);
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

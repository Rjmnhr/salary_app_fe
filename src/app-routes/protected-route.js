import { useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const VerifyToken = async () => {
    try {
      const res = await fetch(
        "https://backend.equipaypartners.com/api/token/verify",
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

  VerifyToken();

  if (isAuthenticated !== null) {
    if (isAuthenticated) {
      return element;
    } else {
      // Redirect to the login page if not authenticated

      return <Navigate to="/login-app" />;
    }
  }
};

export default ProtectedRoute;
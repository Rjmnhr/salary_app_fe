import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const accessToken = localStorage.getItem("accessToken");

  const VerifyToken = async () => {
    try {
      const res = await fetch("http://localhost:8003/api/token/verify", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      console.log(
        "🚀 ~ file: protected-route.js:19 ~ verify ~ res.status:",
        res.status
      );
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      // Handle the error here or return an error response if needed
      return false;
    }
  };

  const isAuthenticated = VerifyToken();
  console.log(
    "🚀 ~ file: protected-route.js:30 ~ ProtectedRoute ~ isAuthenticated:",
    isAuthenticated
  );

  console.log(
    "🚀 ~ file: protected-route.js:37 ~ ProtectedRoute ~ element:",
    element
  );

  if (isAuthenticated) {
    return element;
  } else {
    // Redirect to the login page if not authenticated

    return <Navigate to="/login-app" />;
  }
};

export default ProtectedRoute;

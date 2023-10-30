import { useState } from "react";
import { Navigate } from "react-router-dom";
import ReportsPage from "../pages/reports-page";

const VerifyPlanRoute = ({ element }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userID = localStorage.getItem("user_id");
  const [userPlan, setUserPlan] = useState(null);

  const VerifyToken = async () => {
    try {
      const res = await fetch(
        "http://localhost:8003/api/token/plan",
        { id: userID },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );

      const data = res.json();
      console.log("🚀 ~ file: verifyPlan.js:23 ~ VerifyToken ~ data:", data);

      if (res.status === 200) {
        setUserPlan(data.plan);
      } else {
        setUserPlan(false);
      }
    } catch (err) {
      console.log(err);
      // Handle the error here or return an error response if needed
      setUserPlan(false);
    }
  };

  VerifyToken();

  if (userPlan !== null) {
    if (userPlan) {
      return (
        <>
          <ReportsPage userPlan={userPlan} />
        </>
      );
    } else {
      // Redirect to the login page if not authenticated

      return <Navigate to="/login-app" />;
    }
  }
};

export default VerifyPlanRoute;

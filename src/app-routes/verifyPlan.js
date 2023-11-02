import { useState } from "react";
import { Navigate } from "react-router-dom";
import ReportsPage from "../pages/reports-page";
import AxiosInstance from "../components/axios";

const VerifyPlanRoute = ({ element }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userID = localStorage.getItem("user_id");

  const [userPlan, setUserPlan] = useState(null);

  const VerifyToken = async () => {
    try {
      const res = await AxiosInstance.post(
        "/api/token/plan",
        { id: userID },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );

      const data = res.data[0];

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

  if (userPlan !== null && userPlan !== undefined) {
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

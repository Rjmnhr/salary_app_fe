import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import AxiosInstance from "../config/axios";
import PayPulseOutput from "../components/pay-pulse/output";

const VerifyPlanRoute = ({ element }) => {
  const accessToken = localStorage.getItem("accessToken");

  const [userPlan, setUserPlan] = useState(null);

  const VerifyToken = async () => {
    try {
      const res = await AxiosInstance.post(
        "/api/token/plan",
        { test: "test" },

        {
          headers: {
            "Content-Type": "application/json",
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

  useEffect(() => {
    VerifyToken();
    //eslint-disable-next-line
  }, []);

  if (userPlan !== null && userPlan !== undefined) {
    if (userPlan) {
      return (
        <>
          <PayPulseOutput userPlan={userPlan} />
        </>
      );
    } else {
      // Redirect to the login page if not authenticated

      return <Navigate to="/login-app" />;
    }
  }
};

export default VerifyPlanRoute;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home-page/index";

import LandingPage from "../pages/landing-page";

import PriceAJob from "../pages/price-a-job";
import ExecutiveReports from "../pages/executive-reports";

import LoginPage from "../pages/login-page";
import OtpVerification from "../pages/otp-verification";
import Success from "../components/payment_checkout/Success";
import Canceled from "../components/payment_checkout/Canceled";
import TrainingPage from "../pages/training-page";
import SalesIncentive from "../pages/sales-incentive-page";
import RegistrationPricing from "../pages/registration-pricing";
import SuccessRegistration from "../components/payment_checkout/success-registration";
import SuccessUpgrade from "../components/payment_checkout/success-upgrade";
import ProtectedRoute from "./protected-route";

import ReportsPage from "../pages/reports-page";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
            </>
          }
        />
        <Route
          path="/landing"
          element={
            <>
              <LandingPage />
            </>
          }
        />
        <Route
          path="/price-a-job"
          element={
            <ProtectedRoute
              element={
                <>
                  <PriceAJob />
                </>
              }
            />
          }
        />

        {/* <Route path="/reports" element={<VerifyPlanRoute />} /> */}
        <Route
          path="/reports"
          element={
            <>
              <ReportsPage />
            </>
          }
        />
        <Route
          path="/executive-reports"
          element={
            <>
              <ExecutiveReports />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <LoginPage />
            </>
          }
        />
        <Route
          path="/otp-validation"
          element={
            <>
              <OtpVerification />
            </>
          }
        />
        <Route
          path="/login-app"
          element={
            <>
              <LoginPage />
            </>
          }
        />
        <Route
          path="/training"
          element={
            <>
              <TrainingPage />
            </>
          }
        />
        <Route
          path="/sales"
          element={
            <>
              <SalesIncentive />
            </>
          }
        />
        <Route
          path="/registration-pricing"
          element={
            <>
              <RegistrationPricing />
            </>
          }
        />
        <Route
          path="/success-registration"
          element={
            <>
              <SuccessRegistration />
            </>
          }
        />
        <Route
          path="/success-upgrade"
          element={
            <>
              <SuccessUpgrade />
            </>
          }
        />
        <Route path="/success.html" element={<Success />} />
        <Route path="/canceled.html" element={<Canceled />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;

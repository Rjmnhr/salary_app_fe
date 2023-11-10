import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home-page/index";

import LandingPage from "../pages/landing-page";

import PriceAJob from "../pages/price-a-job";

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
import ExecutiveReports from "../pages/executive-reports";
import ForgotPasswordPage from "../pages/forgot-password-page";
import UserAccount from "../pages/user-account-page";
import ChangeEmail from "../components/change-email";
import ChangePassword from "../components/change-password";
import ChangePlan from "../components/change-plan";
import SuccessRegistrationBasic from "../components/payment_checkout/success-registration-basic";
import Contact from "../components/contact";
import VerifyPlanRoute from "./verifyPlan";
import WebinarComponent from "../components/webinar-component";

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

        <Route path="/reports" element={<VerifyPlanRoute />} />
        <Route path="/reports-dashboard" element={<VerifyPlanRoute />} />
        {/* <Route
          path="/reports"
          element={
            <>
              <ReportsPage />
            </>
          }
        /> */}
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
          path="/success-registration-basic"
          element={
            <>
              <SuccessRegistrationBasic />
            </>
          }
        />
        <Route
          path="/success-upgrade"
          element={
            <ProtectedRoute
              element={
                <>
                  <SuccessUpgrade />
                </>
              }
            />
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute
              element={
                <>
                  <UserAccount />
                </>
              }
            />
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Contact />
            </>
          }
        />
        <Route
          path="/change-email"
          element={
            <ProtectedRoute
              element={
                <>
                  <ChangeEmail />
                </>
              }
            />
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute
              element={
                <>
                  <ChangePassword />
                </>
              }
            />
          }
        />
        <Route
          path="/change-plan"
          element={
            <ProtectedRoute
              element={
                <>
                  <ChangePlan />
                </>
              }
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <>
              <ForgotPasswordPage />
            </>
          }
        />
        <Route
          path="/webinars"
          element={
            <>
              <WebinarComponent />
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

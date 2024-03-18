import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home-page/index.js";
import PayPulseLandingPage from "../pages/pay-pulse-landing/index.js";
import { useEffect, useState } from "react";
import LandingExecutivePage from "../pages/exec-rem-landing/index.js";
import ProtectedRoute from "./protected-route.js";
import PayPulseInput from "../components/pay-pulse/input.js";

import ExecutiveBenchmark from "../components/exec-rem/input.js";
import VerifyPlanRoute from "./verifyPlan.js";
import LoginPage from "../pages/login-page/index.js";
import OtpVerification from "../components/auth/otp-verification.js";
import SalesIncentive from "../pages/sales-incentive-page/index.js";
import TrainingPage from "../pages/training-page/index.js";
import RegistrationPricing from "../pages/registration-pricing/index.js";
import SuccessRegistration from "../components/payment/success-registration.js";
import SuccessRegistrationBasic from "../components/payment/success-registration-basic.js";
import SuccessUpgrade from "../components/payment/success-upgrade.js";
import SuccessTraining from "../components/payment/sucess-training.js";
import UserAccount from "../pages/user-account-page/index.js";
import Contact from "../components/contact/index.js";
import ChangeEmail from "../components/auth/change-email.js";
import ChangePassword from "../components/auth/change-password.js";
import ChangePlan from "../components/auth/change-plan.js";
import ForgotPasswordPage from "../components/auth/forgot-password.js";
import RoleInformation from "../components/exec-rem/role-info.js";
import TableComponent, {
  TableComponentMobile,
} from "../components/exec-rem/companies-filtered.js";
import BenchmarkOutput from "../components/exec-rem/output.js";
import FillForm from "../pages/training-page/fill-form.js";
import BlogsMainPage from "../pages/blog-page.js/main.js";
import SalarySurveyPage from "../pages/salary-survey-page/index.js";
import SurveyExcelUploader from "../components/salary-survey/template-download.js";
import SurveyComplete from "../components/salary-survey/surve-complete.js";
import IndividualBlogPage from "../pages/blog-page.js/index.js";
import KPIClientPage from "../pages/KPI-client-page/index.js";
import ExecutiveBenchmarkVideo from "../components/exec-rem/demo-video.js";
import PayPulseVideo from "../components/pay-pulse/demo-video.js";
import KPIClientOutput from "../components/KPI-client/output.js";
import Success from "../components/payment/Success.js";
import Canceled from "../components/payment/Canceled.js";
import {
  advisory_page_path,
  exec_rem_input_path,
  exec_rem_landing_path,
  home_path,
  login_app_path,
  login_path,
  otp_validation_path,
  pay_pulse_dashboard_path,
  pay_pulse_input_path,
  pay_pulse_landing_path,
  pay_pulse_output_path,
  sales_incentive_page_path,
  training_page_path,
  unauthorized_path,
} from "../config/constant.js";
import Unauthorized from "../components/misc/unauthorized.js";
import PriceAJobVideoLatest from "../components/pay-pulse/demo-video-latest.js";
import AdvisoryPage from "../pages/advisory-page/index.js";

const AppRoute = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px) to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add an event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={home_path}
          element={
            <>
              <HomePage />
            </>
          }
        />
        <Route
          path={pay_pulse_landing_path}
          element={
            <>
              <PayPulseLandingPage />
            </>
          }
        />
        <Route
          path={exec_rem_landing_path}
          element={
            <>
              <LandingExecutivePage />
            </>
          }
        />
        <Route path={pay_pulse_input_path} element={<PayPulseInput />} />
        <Route
          path={exec_rem_input_path}
          element={
            <ProtectedRoute
              element={
                <>
                  <ExecutiveBenchmark />
                </>
              }
            />
          }
        />

        <Route path={pay_pulse_output_path} element={<VerifyPlanRoute />} />
        <Route path={pay_pulse_dashboard_path} element={<VerifyPlanRoute />} />
        {/* <Route
          path="/reports"
          element={
            <>
              <ReportsPage />
            </>
          }
        /> */}

        <Route
          path={login_path}
          element={
            <>
              <LoginPage />
            </>
          }
        />
        <Route
          path={unauthorized_path}
          element={
            <>
              <Unauthorized />
            </>
          }
        />
        <Route
          path={login_app_path}
          element={
            <>
              <LoginPage />
            </>
          }
        />
        <Route
          path={otp_validation_path}
          element={
            <>
              <OtpVerification />
            </>
          }
        />

        <Route
          path={training_page_path}
          element={
            <>
              <TrainingPage />
            </>
          }
        />
        <Route
          path={sales_incentive_page_path}
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
          path="/success-training"
          element={
            <>
              <SuccessTraining />
            </>
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
          path={advisory_page_path}
          element={
            <>
              <AdvisoryPage />
            </>
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
          path="/role-information"
          element={
            <ProtectedRoute
              element={
                <>
                  <RoleInformation />
                </>
              }
            />
          }
        />
        <Route
          path="/companies-filtered"
          element={
            <ProtectedRoute
              element={
                <>{isMobile ? <TableComponentMobile /> : <TableComponent />}</>
              }
            />
          }
        />
        <Route
          path="/output"
          element={
            <ProtectedRoute
              element={
                <>
                  <BenchmarkOutput />
                </>
              }
            />
          }
        />

        <Route
          path="/fill-form"
          element={
            <>
              <FillForm />
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <>
              <BlogsMainPage />
            </>
          }
        />
        <Route
          path="/salary-survey"
          element={
            <>
              <SalarySurveyPage />
            </>
          }
        />
        <Route
          path="/survey-upload"
          element={
            <>
              <SurveyExcelUploader />
            </>
          }
        />
        <Route
          path="/survey-complete"
          element={
            <>
              <SurveyComplete />
            </>
          }
        />

        <Route
          path="/post"
          element={
            <>
              <IndividualBlogPage />
            </>
          }
        />

        <Route
          path="/kpi-client"
          element={
            <>
              <KPIClientPage />
            </>
          }
        />
        <Route
          path="/executive-compensation-video"
          element={
            <>
              <ExecutiveBenchmarkVideo />
            </>
          }
        />
        <Route
          path="/pay-pulse-video"
          element={
            <>
              <PayPulseVideo />
            </>
          }
        />
        <Route
          path="/kpi-client-report"
          element={
            <>
              <KPIClientOutput />
            </>
          }
        />
        <Route
          path="/pay-pulse-demo-latest"
          element={
            <>
              <PriceAJobVideoLatest />
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

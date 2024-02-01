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
import ForgotPasswordPage from "../pages/forgot-password-page";
import UserAccount from "../pages/user-account-page";
import ChangeEmail from "../components/change-email";
import ChangePassword from "../components/change-password";
import ChangePlan from "../components/change-plan";
import SuccessRegistrationBasic from "../components/payment_checkout/success-registration-basic";
import Contact from "../components/contact";
import VerifyPlanRoute from "./verifyPlan";
import ExecutiveBenchmark from "../pages/executive-benchmark";
import RoleInformation from "../components/role-information";
import BenchmarkOutput from "../pages/benchmark-output";
import TableComponent, {
  TableComponentMobile,
} from "../components/companies-filterd";
import LandingExecutivePage from "../pages/landing-executive-page";
import FillForm from "../pages/training-page/fill-form";
import SuccessTraining from "../components/payment_checkout/sucess-training";
import { useEffect, useState } from "react";
import SalarySurveyPage from "../pages/salary-survey/index.js";
import SurveyComplete from "../components/survey-complete/index.js";
import BlogsMainPage from "../pages/blog-page.js/main.js";
import IndividualBlogPage from "../pages/blog-page.js/index.js";
import KPIClientPage from "../pages/KPI-client-page/index.js";
import KPIClientOutput from "../pages/KPI-report/index.js";
import ExecutiveBenchmarkVideo from "../pages/executive-benchmark-video/index.js";
import PriceAJobVideo from "../pages/price-a-job-video/index.js";
import SurveyExcelUploader from "../components/survey-excel/index.js";

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
          path="/"
          element={
            <>
              <HomePage />
            </>
          }
        />
        <Route
          path="/price-a-job"
          element={
            <>
              <LandingPage />
            </>
          }
        />
        <Route
          path="/executive-compensation"
          element={
            <>
              <LandingExecutivePage />
            </>
          }
        />
        <Route
          path="/price-a-job-add-details"
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
        <Route
          path="/executive-compensation-add-details"
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
          path="/price-a-job-video"
          element={
            <>
              <PriceAJobVideo />
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
        <Route path="/success.html" element={<Success />} />
        <Route path="/canceled.html" element={<Canceled />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;

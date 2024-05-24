import { BrowserRouter, Route, Routes } from "react-router-dom";
import PayPulseLandingPage from "../pages/pay-pulse-landing/index.js";
import ProtectedRoute from "./protected-route.js";
import VerifyPlanRoute from "./verifyPlan.js";
import LoginPage from "../pages/login-page/index.js";
import OtpVerification from "../components/auth/otp-verification.js";
import SalesIncentive from "../pages/sales-incentive-page/index.js";
import TrainingPage from "../pages/training-page/index.js";
import SuccessRegistrationBasic from "../components/payment/success-registration-basic.js";
import UserAccount from "../pages/user-account-page/index.js";
import Contact from "../components/contact/index.js";
import ChangeEmail from "../components/auth/change-email.js";
import ChangePassword from "../components/auth/change-password.js";
import ChangePlan from "../components/auth/change-plan.js";
import ForgotPasswordPage from "../components/auth/forgot-password.js";
import BlogsMainPage from "../pages/blog-page.js/main.js";
import IndividualBlogPage from "../pages/blog-page.js/index.js";
import PayPulseVideo from "../components/pay-pulse/demo-video.js";
import Success from "../components/payment/Success.js";
import Canceled from "../components/payment/Canceled.js";
import {
  advisory_page_path,
  home_path,
  login_app_path,
  login_path,
  otp_validation_path,
  pay_pulse_dashboard_path,
  pay_pulse_input_path,
  pay_pulse_landing_path,
  pay_pulse_output_path,
  privacy_policy_path,
  sales_incentive_page_path,
  terms_condition_path,
  training_page_path,
  unauthorized_path,
} from "../config/constant.js";
import Unauthorized from "../components/misc/unauthorized.js";
import AdvisoryPage from "../pages/advisory-page/index.js";
import PrivacyPolicy from "../legal-policies/privacy-policy.js";
import TermsAndConditions from "../legal-policies/terms-and-conditions.js";
import NavBar from "../components/layout/nav-bar.js";
import PayPulseInputPage from "../components/pay-pulse/input-page.js";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={home_path}
          element={
            <>
              <PayPulseLandingPage />
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
        <Route path={pay_pulse_input_path} element={<PayPulseInputPage />} />
        <Route path={pay_pulse_output_path} element={<VerifyPlanRoute />} />
        <Route path={pay_pulse_dashboard_path} element={<VerifyPlanRoute />} />
        <Route path={login_path} element={<LoginPage />} />
        <Route path={unauthorized_path} element={<Unauthorized />} />
        <Route path={login_app_path} element={<LoginPage />} />
        <Route path={otp_validation_path} element={<OtpVerification />} />
        <Route path={training_page_path} element={<TrainingPage />} />
        <Route path={sales_incentive_page_path} element={<SalesIncentive />} />
        <Route path={privacy_policy_path} element={<PrivacyPolicy />} />
        <Route path={terms_condition_path} element={<TermsAndConditions />} />

        <Route
          path="/success-registration-basic"
          element={<SuccessRegistrationBasic />}
        />
        <Route
          path="/account"
          element={<ProtectedRoute element={<UserAccount />} />}
        />
        <Route
          path="/contact"
          element={
            <>
              <NavBar />
              <div style={{ marginTop: "100px" }}>
                <Contact />
              </div>
            </>
          }
        />
        <Route
          path="/change-email"
          element={<ProtectedRoute element={<ChangeEmail />} />}
        />
        <Route
          path="/change-password"
          element={<ProtectedRoute element={<ChangePassword />} />}
        />
        <Route
          path="/change-plan"
          element={<ProtectedRoute element={<ChangePlan />} />}
        />
        <Route path={advisory_page_path} element={<AdvisoryPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/blog" element={<BlogsMainPage />} />

        <Route path="/post" element={<IndividualBlogPage />} />

        <Route path="/pay-pulse-video" element={<PayPulseVideo />} />

        <Route path="/success.html" element={<Success />} />
        <Route path="/canceled.html" element={<Canceled />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;

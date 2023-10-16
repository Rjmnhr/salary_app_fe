import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page/index";

import ReportsPage from "./pages/reports-page";

import PriceAJob from "./pages/price-a-job";
import ExecutiveReports from "./pages/executive-reports";

import LoginPage from "./pages/login-page";
import OtpVerification from "./pages/otp-verification";

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
          path="/price-a-job"
          element={
            <>
              <PriceAJob />
            </>
          }
        />

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
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;

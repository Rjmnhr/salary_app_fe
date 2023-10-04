import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page/index";

import AddDetails from "./pages/add-details";
import ReportsPage from "./pages/reports-page";

import PriceAJob from "./pages/price-a-job";
import ExecutiveReports from "./pages/executive-reports";
import JobReport from "./components/sample";

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
          path="/add-details"
          element={
            <>
              <AddDetails />
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
          path="/test"
          element={
            <>
              <JobReport />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;

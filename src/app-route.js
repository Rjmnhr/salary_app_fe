import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import AddDetails from "./pages/add-details";
import ReportsPage from "./pages/reports-page";
import MyTagsInput from "./components/sample";

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
          path="/test"
          element={
            <>
              <MyTagsInput />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;

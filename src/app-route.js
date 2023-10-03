import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page/index";

import AddDetails from "./pages/add-details";
import ReportsPage from "./pages/reports-page";
import CarouselComponent from "./components/carousel-component";
import PriceAJob from "./pages/price-a-job";

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
          path="/test"
          element={
            <>
              <CarouselComponent jobTitle={"devops"} />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;

import React from "react";
import miscError from "../../icons/page-misc-error-light.png";
import { home_path } from "../../config/constant";

const Unauthorized = () => {
  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div className="container-xxl container-p-y">
        <div className="misc-wrapper">
          <h2 className="mb-2 mx-2">Unauthorized Access</h2>
          <p className="mb-4 mx-2">
            Oops! 😖 The requested URL was not found on this server.
          </p>
          <a href={home_path} className="btn btn-primary">
            Back to home
          </a>
          <div className="mt-3">
            <img
              src={miscError}
              alt="page-misc-error-light"
              width="500"
              className="img-fluid"
              data-app-dark-img="illustrations/page-misc-error-dark.png"
              data-app-light-img="illustrations/page-misc-error-light.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

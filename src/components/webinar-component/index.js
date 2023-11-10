import React from "react";
import NavBar from "../nav-bar";
import { VideoPlayer } from "../../pages/training-page";

const WebinarComponent = () => {
  return (
    <>
      <NavBar />
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          justifyItems: "center",
          alignContent: "center",
          marginTop: "80px",
        }}
        className="col-12 section-title "
      >
        <div className="col-12 mt-3 section-title ">
          <h2 style={{ width: "100%" }} className="col-12 ">
            Training Videos
          </h2>
        </div>
        <div className="d-lg-flex">
          <div className="col-6 mb-3">
            <VideoPlayer videoId={"GQbg_Ris93Y"} />
          </div>
          <div className="col-6 mb-3">
            <VideoPlayer videoId={"jISQ7nHLzms"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WebinarComponent;

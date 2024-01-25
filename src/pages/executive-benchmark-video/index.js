import React from "react";
import NavBar from "../../components/nav-bar";
import BgVideo from "../../video/demo-benchmark.mp4";
import FooterComponent from "../../components/footer-component";
const ExecutiveBenchmarkVideo = () => {
  return (
    <div>
      <NavBar />
      <div
        style={{
          marginTop: "100px",
          display: "grid",
          placeItems: "center",
          height: "90vh",
        }}
        className="container"
      >
        <div>
          <video
            style={{
              width: "90%",
              height: "90%",
              objectFit: "contain",
            }}
            src={BgVideo}
            autoPlay
            controls
          />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default ExecutiveBenchmarkVideo;

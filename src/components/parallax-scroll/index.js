import React from "react";
import { ParallaxScrollStyled } from "./style";

const ParallaxScroll = ({ img }) => {
  return (
    <>
      <ParallaxScrollStyled>
        <div className="wrapper">
          <div className="cover-scroll">
            <img src={img} alt="" className="background" />
            <section class="d-flex align-items-center">
              <div class="container" data-aos="zoom-out" data-aos-delay="100">
                <div class="row">
                  <div class="col-xl-6 text-start">
                    <h1
                      style={{
                        textAlign: "start",
                        fontSize: "70px",
                        fontWeight: "bold",
                      }}
                    >
                      YOUR PARTNERS IN ALL
                      <span className="text-primary">MATTERS</span> PAY
                    </h1>

                    <a href="#contact" class="btn-get-started scrollto">
                      Use Free Profile Evaluator
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </ParallaxScrollStyled>
    </>
  );
};

export default ParallaxScroll;

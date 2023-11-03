import React from "react";
import { ParallaxScrollStyled } from "./style";

const ParallaxScroll = ({ img, content }) => {
  return (
    <>
      <ParallaxScrollStyled>
        <div className="wrapper">
          <div className="cover-scroll">
            <img src={img} alt="" className="background" />
            {content}
          </div>
        </div>
      </ParallaxScrollStyled>
    </>
  );
};

export default ParallaxScroll;

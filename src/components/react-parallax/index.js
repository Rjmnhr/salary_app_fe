import React from "react";
import { Parallax } from "react-parallax";
import { ParallaxComponentStyled } from "./style";

const ParallaxComponent = ({ img, content }) => {
  return (
    <div>
      <ParallaxComponentStyled>
        <Parallax className="cover-img" bgImage={img} strength={400}>
          <div className="misty-overlay container-fluid">{content}</div>
        </Parallax>
      </ParallaxComponentStyled>
    </div>
  );
};

export default ParallaxComponent;

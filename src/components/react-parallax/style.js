import styled from "@emotion/styled";

export const ParallaxComponentStyled = styled.div`
  .cover-img {
    display: grid;
    place-items: center;
    height: 100vh;
  }
  .misty-overlay {
    position: relative;
    z-index: 2; /* Make sure it's above the misty overlay */
  }

  .cover-img {
    position: relative;
  }

  .cover-img::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(
      255,
      255,
      255,
      0.3
    ); /* Adjust the opacity (0.5) as needed */
    z-index: 1; /* Make sure it's on top of the image */
  }
`;

import styled from "styled-components";

export const ParallaxScrollStyled = styled.div`
  .wrapper {
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    perspective: 10px;
    margin: 0;
  }

  .cover-scroll {
    position: relative;
    display: grid;
    place-items: center;
    height: 100%;
    transform-style: preserve-3d;
    z-index: -1;
  }

  .background {
    position: absolute;
    width: 100%;

    object-fit: cover;
    z-index: -1;
    transform: translateZ(-10px) scale(2);
  }
  /* Hide the scrollbar for WebKit browsers */
  .wrapper::-webkit-scrollbar {
    display: none;
  }
`;

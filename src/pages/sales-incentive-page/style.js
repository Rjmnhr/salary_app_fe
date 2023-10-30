import styled from "styled-components";

export const SalesIncentiveStyled = styled.div`
  .image-overlay {
    position: relative;
    overflow: hidden;
  }

  .overlay-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(
      0,
      0,
      0,
      0.5
    ); /* Adjust the background color and opacity as needed */
    color: white;
    padding: 10px;
    border-radius: 5px;
  }

  .card-img {
    width: 100%;
    transition: opacity 0.3s; /* Add a transition effect for opacity */
  }

  .card:hover .card-img {
    opacity: 0.8; /* Adjust the opacity as needed */
  }
`;

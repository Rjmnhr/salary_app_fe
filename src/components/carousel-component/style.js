import styled from "@emotion/styled";

export const CarouselComponentStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #85a8c5;

  .carousel {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .inner {
    white-space: nowrap;
    transition: transform 0.3s;
    box-shadow: 0 5px 15px rgb(0, 0, 0, 0 5);
  }

  .item-carousel {
    display: inline-flex;

    align-items: center;
    justify-content: center;

    background-color: white;
  }

  .selected-tab-container {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .tick-mark {
    /* Tick mark styles */
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    color: #007bff;
  }
`;

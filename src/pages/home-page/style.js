import styled from "styled-components";

export const HomePageStyled = styled.div`
  .custom-button {
    color: white;
  }

  .custom-button:hover {
    background: white;
    color: #696cff;
    border: 2px solid #696cff;
  }

  .custom-demo-btn {
    position: relative;
    display: inline-block;

    padding: 10px 15px;
    text-align: center;
    font-size: 18px;
    letter-spacing: 1px;
    text-decoration: none;
    color: white;
    background: #696cff;
    cursor: pointer;
    transition: ease-out 0.5s;
    border: 2px solid white;
    border-radius: 1rem;
    box-shadow: inset 0 0 0 0 white;
  }

  .custom-demo-btn:hover {
    color: #1a6cb6;
    box-shadow: inset 0 -100px 0 0 white;
    border: 2px solid #696cff;
  }

  .custom-demo-btn:active {
    transform: scale(0.9);
  }

  .laptop-bg img {
    width: 100%;
  }
`;

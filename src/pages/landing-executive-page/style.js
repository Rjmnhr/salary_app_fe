import styled from "styled-components";

export const LandingExecutivePageStyled = styled.div`
  .custom-button {
    color: white;
  }

  .custom-button:hover {
    background: white;
    color: #043585;
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
    background: #1a6cb6;
    cursor: pointer;
    transition: ease-out 0.5s;
    border: 2px solid #1a6cb6;
    border-radius: 0.25rem;
    box-shadow: inset 0 0 0 0 white;
  }

  .custom-demo-btn:hover {
    color: #1a6cb6;
    box-shadow: inset 0 -100px 0 0 white;
  }

  .custom-demo-btn:active {
    transform: scale(0.9);
  }
`;

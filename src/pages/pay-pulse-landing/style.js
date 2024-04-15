import styled from "styled-components";
export const PayPulsePageStyled = styled.div`
  .custom-button {
    color: white;
  }

  .custom-button:hover {
    background: white;
    color: #007bff;
    border: 2px solid #007bff;
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
    background: #007bff;
    cursor: pointer;
    transition: ease-out 0.5s;
    border: 2px solid white;
    border-radius: 1rem;
    box-shadow: inset 0 0 0 0 white;
  }

  .custom-demo-btn:hover {
    color: #1a6cb6;
    /* box-shadow: inset 0 -100px 0 0 white; */
    border: 2px solid #007bff;

    background: white;
  }

  .custom-demo-btn:active {
    transform: scale(0.9);
  }

  .custom-download-btn {
    position: relative;
    display: inline-block;
    padding: 10px 15px;
    text-align: center;
    font-size: 18px;
    letter-spacing: 1px;
    text-decoration: none;
    color: #007bff;
    background: white;
    cursor: pointer;
    transition: ease-out 0.5s;
    border: 2px solid white;
    border-radius: 1rem;
    box-shadow: inset 0 0 0 0 #007bff;
  }

  .custom-download-btn:hover {
    color: #1a6cb6;
    /* box-shadow: inset 0 -100px 0 0 white; */
    border: 2px solid #007bff;

    background: white;
  }

  .custom-download-btn:active {
    transform: scale(0.9);
  }
  .laptop-bg img {
    width: 100%;
  }
`;

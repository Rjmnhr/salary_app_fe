import { styled } from "styled-components";

export const OtpVerificationPageStyled = styled.div`
  .main-container {
    display: flex;
    align-items: center;
  }

  .left-container {
    width: 50%;
    display: grid;
    place-items: center;
    height: 100vh;
    background: black;
    color: white;
    padding: 20px;
  }

  .left-container h1 {
    font-size: 80px;
  }

  .right-container {
    width: 60%;
    display: grid;
    place-items: center;
    height: 100vh;
    padding: 20px;
    background: rgb(248, 248, 248);
  }
  .right-sub-container {
    text-align: start;
  }

  [id^="otp"] {
    margin: 5px;
  }

  button {
    padding: 12px;
    background: #333333;
    color: white;

    border: none;

    width: 150px;
  }
  .img_container {
    position: relative;
  }

  .img_container::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }

  input[type="number"] {
    -webkit-appearance: none;
    appearance: none;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }

  @media (max-width: 912px) {
    .left-container {
      display: none;
    }
    .right-container {
      width: 100%;
    }
  }
`;

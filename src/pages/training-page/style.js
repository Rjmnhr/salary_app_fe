import styled from "styled-components";

export const TrainingPageStyled = styled.div`
  .training-section {
    padding: 50px;
    text-align: center;
    background-color: #fff;
  }
  .training-title {
    font-size: 36px;
    color: #333;
    margin-bottom: 20px;
  }
  .training-options {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .training-card {
    width: 300px;
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    position: relative;
  }
  .checkbox-container {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    z-index: 99; /* Ensure the checkbox is on top of other content */
  }
  .training-card:hover {
    transform: scale(1.05);
  }
  .training-card h3 {
    font-size: 24px;
    color: #333;
  }
  .training-card p {
    font-size: 16px;
    color: #666;
  }
`;

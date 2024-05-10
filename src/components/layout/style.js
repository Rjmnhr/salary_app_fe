import styled from "styled-components";

export const NavBarStyled = styled.div`
  .navbar {
    background: transparent; /* Initial background color */
    transition: background-color 0.3s ease; /* Transition effect */
  }

  .navbar.scrolled {
    background-color: #333; /* Background color when scrolled */
  }

  .NavBarStyled {
    position: fixed;
    top: 0;
    left: -300px; /* Start offscreen */
    width: 300px;
    height: 100vh;
    background-color: #fff;
    transition: all 0.3s ease-in-out; /* Add a transition effect */
  }

  .NavBarStyled.open {
    left: 0; /* Slide in from the left */
  }

  .custom-btn {
    position: relative;
    display: inline-block;
    padding: 5px 12px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    color: #5783db;
    background: white;
    cursor: pointer;
    transition: ease-out 0.5s;
    border: 2px solid #5783db;
    border-radius: 1rem;
    box-shadow: inset 0 0 0 0 #5783db;
  }

  .custom-btn:hover {
    color: white;
    box-shadow: inset 0 -100px 0 0 #5783db;
    border: 2px solid 1;
  }

  .custom-btn:active {
    transform: scale(0.9);
  }
  a:hover {
    color: #5bbcff !important;
    cursor: pointer;
  }
`;

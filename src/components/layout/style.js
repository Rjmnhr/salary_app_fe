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
`;

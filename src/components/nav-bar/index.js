import React, { useEffect, useState } from "react";
import { NavBarStyled } from "./style";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = ({ scrollToContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const Location = useLocation();

  const getActiveLink = (path) => {
    switch (path) {
      case "/":
        return "home";
      case "/price-a-job":
        return "price-a-job";
      case "/reports":
        return "price-a-job";
      case "/executive-reports":
        return "executive-reports";
      // Add more cases for other routes
      default:
        return "";
    }
  };

  const activeLink = getActiveLink(Location.pathname);
  // Add a scroll event listener to the window
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // If the user has scrolled more than 50 pixels, set scrolled to true
        setScrolled(true);
      } else {
        // If the user has scrolled back to the top, set scrolled to false
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogOut = () => {
    navigate("/");
    localStorage.setItem("accessToken", "");
    localStorage.setItem("isLoggedIn", false);
  };

  return (
    <body className={`${menuOpen ? "mobile-nav-active" : ""} `}>
      <NavBarStyled>
        <button
          type="button"
          class="mobile-nav-toggle d-lg-none"
          onClick={handleMenuToggle}
        >
          <i class="icofont-navigation-menu"></i>
        </button>
        <header
          id="header"
          className={`navbar fixed-top ${scrolled ? "scrolled" : ""}`}
          style={{
            background: ` ${scrolled ? "#fff" : "transparent"}`,
          }}
        >
          <div class="container d-flex align-items-center">
            <h1 class="logo me-auto">
              <a href="/">Equipay Partners</a>
            </h1>

            <nav
              class={`${
                menuOpen
                  ? "mobile-nav d-lg-none"
                  : " nav-menu d-none d-lg-block"
              } `}
            >
              <ul>
                <li className={activeLink === "home" ? "active" : ""}>
                  <a href="/">Home</a>
                </li>
                <li className={activeLink === "price-a-job" ? "active" : ""}>
                  <a href="/price-a-job">Price a Job</a>
                </li>
                <li
                  className={activeLink === "executive-reports" ? "active" : ""}
                >
                  <a href="/executive-reports">
                    Executive Compensation Reports
                  </a>
                </li>

                <li>
                  <a href="#training">Training</a>
                </li>
                <li>
                  <a href="#sales">Sales Incentive</a>
                </li>
                {/* 
                <li>
                  <a href="#contact" onClick={scrollToContact}>
                    Contact
                  </a>
                </li> */}
                <li>
                  {isLoggedIn === "true" ? (
                    <a href="#eq" onClick={handleLogOut}>
                      Log out
                    </a>
                  ) : (
                    <a href="/login">Log in</a>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </NavBarStyled>
    </body>
  );
};

export default NavBar;

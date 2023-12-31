import React, { useEffect, useState } from "react";
import { NavBarStyled } from "./style";
import { useLocation, useNavigate } from "react-router-dom";

import { Dropdown } from "antd";

import logo from "../../icons/logo192.png";

// const CapitalizeFirstLetter = (data) => {
//   // Split the string into words
//   const words = data?.split(" ");
//   // Capitalize the first letter of each word and make the rest lowercase
//   const capitalizedWords = words?.map((word) => {
//     if (word.charAt(0) === word.charAt(0).toUpperCase()) {
//       // If the first letter is already capitalized, keep it as is
//       return word;
//     } else {
//       // Otherwise, capitalize the first letter and make the rest lowercase
//       return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
//     }
//   });

//   // Join the words back together with spaces
//   return capitalizedWords?.join(" ");
// };

const NavBar = ({ bgInput }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const Location = useLocation();

  const getActiveLink = (path) => {
    switch (path) {
      case "/":
        return "home";
      case "/price-a-job-add-details":
        return "price-a-job";
      case "/reports":
        return "price-a-job";
      case "/price-a-job":
        return "price-a-job";
      case "/executive-compensation":
        return "/executive-compensation";
      case "/training":
        return "training";
      case "/sales":
        return "sales";
        case "/blog":
        return "blog";
        case "/account":
        return "account";
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

  //eslint-disable-next-line
  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("accessToken", "");
    localStorage.setItem("isLoggedIn", false);
  };

  const items = [
    {
      key: "1",
      label: <a href="/account">My Account</a>,
    },
    {
      key: "2",
      label: (
        <a href="#eq" onClick={handleLogOut}>
          Log out
        </a>
      ),
    },
  ];

  return (
    <body className={`${menuOpen ? "mobile-nav-active" : ""} `}>
      <NavBarStyled>
        <button
          type="button"
          class="mobile-nav-toggle d-lg-none"
          onClick={handleMenuToggle}
        >
          <i style={{ color: "black" }} class="icofont-navigation-menu"></i>
        </button>
        <header
          id="header"
          className={`navbar fixed-top ${scrolled ? "scrolled" : ""}`}
          style={{
            background: bgInput ? bgInput : "white",
          }}
        >
          <div class="container d-flex align-items-center">
            <h1 class="logo me-auto">
              <a href="/">
                {" "}
                <img
                  style={{ marginRight: "8px" }}
                  src={logo}
                  alt=""
                  height={35}
                  width={35}
                />
                Equipay Partners
              </a>
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
                  className={
                    activeLink === "/executive-compensation" ? "active" : ""
                  }
                >
                  <a href="/executive-compensation">Executive Compensation</a>
                </li>

                <li className={activeLink === "training" ? "active" : ""}>
                  <a href="/training">Training</a>
                </li>
                <li className={activeLink === "sales" ? "active" : ""}>
                  <a href="/sales">Sales Incentive</a>
                </li>
                <li className={activeLink === "blog" ? "active" : ""}>
                  <a href="/blog">Blog</a>
                </li>

                {isLoggedIn === "true" ? (
                  <>
                    <Dropdown
                      menu={{
                        items,
                      }}
                      placement="bottomRight"
                      arrow
                    >
                      <li style={{ cursor: "pointer" }} className={activeLink === "account" ? "active" : ""}>
                        {/*eslint-disable-next-line*/}
                        <a>Account</a>
                      </li>
                    </Dropdown>
                  </>
                ) : (
                  <li>
                    <a href="/login">Log in</a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </header>
      </NavBarStyled>
    </body>
  );
};

export default NavBar;

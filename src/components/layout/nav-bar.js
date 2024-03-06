import React, { useEffect, useState } from "react";
import { NavBarStyled } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Dropdown } from "antd";
import logo from "../../icons/logo192.png";
import { useApplicationContext } from "../../context/app-context";
import AxiosInstance from "../../config/axios";
import { UserOutlined } from "@ant-design/icons";

const NavBar = ({ bgInput }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const Location = useLocation();
  const [initials, setInitials] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    setFirstName,
    setLastName,
    setUserEmail,
    setUserPlan,

    firstName,
    lastName,
  } = useApplicationContext();

  useEffect(() => {
    AxiosInstance.get("api/user/details", {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    })
      .then(async (res) => {
        const UserData = res.data?.data;

        if (res.status === 200) {
          setFirstName(UserData.first_name);
          setLastName(UserData.last_name);
          setUserEmail(UserData.email);
          setUserPlan(UserData.plan);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Ensure firstName and lastName are strings
    const sanitizedFirstName = String(firstName);

    const sanitizedLastName = String(lastName);

    // Extracting the first letters only if both first and last names have values
    const initialsValue =
      sanitizedFirstName && sanitizedLastName
        ? (sanitizedFirstName[0] + sanitizedLastName[0]).toUpperCase()
        : "";

    setInitials(initialsValue);
  }, [firstName, lastName]);

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
      case "/kpi-client":
        return "kpi";
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

  //eslint-disable-next-line
  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("accessToken", "");
    localStorage.setItem("isLoggedIn", false);
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="d-flex justify-content-start align-items-center pb-2 text-start  ">
          {" "}
          <p className="m-0">{firstName}</p>
          <Avatar
            style={{
              backgroundColor: "#007bff",
              verticalAlign: "middle",
              marginLeft: "10px",
            }}
            size="small"
          >
            {initials}
          </Avatar>
        </div>
      ),
    },
    {
      key: "2",
      label: <a href="/account">My Profile</a>,
    },
    {
      key: "3",
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
            boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div class="container-fluid px-5 d-flex align-items-center">
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
                <li className={activeLink === "price-a-job" ? "active" : ""}>
                  <a href="/price-a-job">Price a Job</a>
                </li>
                <li
                  className={`
                   ${activeLink === "/executive-compensation" ? "active" : ""}
                   d-none
                 `}
                >
                  <a href="/executive-compensation">Executive Compensation</a>
                </li>
                <li className={activeLink === "survey" ? "active" : ""}>
                  <a href="/salary-survey">Salary survey</a>
                </li>
                <li
                  className={` d-none ${activeLink === "kpi" ? "active" : ""}`}
                >
                  <a href="/kpi-client">KPI Client</a>
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

                {isLoggedIn ? (
                  <>
                    <Dropdown
                      menu={{
                        items,
                      }}
                      placement="bottomLeft"
                    >
                      <li
                        style={{ cursor: "pointer" }}
                        className={`${
                          activeLink === "account" ? "active" : ""
                        } pt-2 pb-0`}
                      >
                        {/*eslint-disable-next-line*/}
                        <a>
                          <Avatar
                            style={{
                              backgroundColor: "#007bff",
                              verticalAlign: "middle",
                            }}
                            size="medium"
                          >
                            <UserOutlined />
                          </Avatar>
                        </a>
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

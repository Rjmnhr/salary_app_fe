import React, { useEffect, useState } from "react";
import { NavBarStyled } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Menu } from "antd";
import logo from "../../icons/logo192.png";
import { useApplicationContext } from "../../context/app-context";
import { ArrowRightOutlined, UserOutlined } from "@ant-design/icons";
import {
  advisory_page_path,
  blog_page_path,
  home_path,
  pay_pulse_landing_path,
  salary_survey,
  sales_incentive_page_path,
  training_page_path,
} from "../../config/constant";

const NavBar = ({ bgInput }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const Location = useLocation();

  const [initials, setInitials] = useState("");
  const { userData, setUserData } = useApplicationContext();

  const [hoveredItem, setHoveredItem] = useState(null);

  const productMenuItems = [
    {
      key: "1",
      title: (
        <div
          className="p-2 d-flex justify-content-between"
          onMouseEnter={() => setHoveredItem("1")}
          onMouseLeave={() => setHoveredItem(null)}
          style={{ width: "200px" }}
          onClick={() => navigate(pay_pulse_landing_path)}
        >
          <h6>
            {" "}
            <i
              className="icofont-chart-bar-graph text-primary mr-2"
              style={{ fontSize: "20px" }}
            ></i>
            PayPulse
          </h6>
          {hoveredItem === "1" && (
            <ArrowRightOutlined className="text-primary" />
          )}
        </div>
      ),
    },
    {
      key: "2",
      title: (
        <div
          className="p-2 d-flex justify-content-between"
          onMouseEnter={() => setHoveredItem("2")}
          onMouseLeave={() => setHoveredItem(null)}
          style={{ width: "200px" }}
          onClick={() => navigate(salary_survey)}
        >
          <h6>
            {" "}
            <i
              className="icofont-computer text-primary mr-2"
              style={{ fontSize: "20px" }}
            ></i>
            Salary Survey
          </h6>
          {hoveredItem === "2" && (
            <ArrowRightOutlined className="text-primary" />
          )}
        </div>
      ),
    },
  ];

  const serviceMenuItems = [
    {
      key: "1",
      title: (
        <div
          className="p-2 d-flex justify-content-between"
          onMouseEnter={() => setHoveredItem("1")}
          onMouseLeave={() => setHoveredItem(null)}
          style={{ width: "200px" }}
          onClick={() => navigate(training_page_path)}
        >
          <h6>
            {" "}
            <i
              className="icofont-teacher text-primary mr-2"
              style={{ fontSize: "20px" }}
            ></i>
            Training
          </h6>
          {hoveredItem === "1" && (
            <ArrowRightOutlined className="text-primary" />
          )}
        </div>
      ),
    },
    {
      key: "2",
      title: (
        <div
          className="p-2 d-flex justify-content-between"
          onMouseEnter={() => setHoveredItem("2")}
          onMouseLeave={() => setHoveredItem(null)}
          style={{ width: "200px" }}
          onClick={() => navigate(sales_incentive_page_path)}
        >
          <h6>
            {" "}
            <i
              className="icofont-money text-primary mr-2"
              style={{ fontSize: "20px" }}
            ></i>
            Sales Incentive
          </h6>
          {hoveredItem === "2" && (
            <ArrowRightOutlined className="text-primary" />
          )}
        </div>
      ),
    },
    {
      key: "3",
      title: (
        <div
          className="p-2 d-flex justify-content-between"
          onMouseEnter={() => setHoveredItem("3")}
          onMouseLeave={() => setHoveredItem(null)}
          style={{ width: "200px" }}
          onClick={() => navigate(advisory_page_path)}
        >
          <h6>
            {" "}
            <i
              className="icofont-light-bulb text-primary mr-2"
              style={{ fontSize: "20px" }}
            ></i>
            Advisory
          </h6>
          {hoveredItem === "3" && (
            <ArrowRightOutlined className="text-primary" />
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (userData) {
      const sanitizedFirstName = String(userData?.first_name);

      const sanitizedLastName = String(userData?.last_name);

      // Extracting the first letters only if both first and last names have values
      const initialsValue =
        sanitizedFirstName && sanitizedLastName
          ? (sanitizedFirstName[0] + sanitizedLastName[0]).toUpperCase()
          : "";

      setInitials(initialsValue);
    }
    // Ensure firstName and lastName are strings
  }, [userData]);

  const getActiveLink = (path) => {
    switch (path) {
      case "/":
        return "home";
      case "/pay-pulse-add-details":
        return "price-a-job";
      case "/reports":
        return "price-a-job";
      case "/pay-pulse":
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

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("accessToken");
    setUserData(null);
  };

  // Handle menu item click
  const handleMenuItemClick = (key) => {
    // Handle menu item click as needed
    console.log(`Clicked on menu item with key: ${key}`);
  };

  const profileMenuItems = [
    {
      key: "1",
      title: (
        <div
          onClick={() => navigate("/account")}
          className="d-flex justify-content-between align-items-center pb-2 text-start  "
          style={{ width: "100px" }}
        >
          {" "}
          <p className="m-0">{userData?.first_name}</p>
          <Avatar
            style={{
              backgroundColor: "#5bbcff",
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
      //eslint-disable-next-line
      title: <a onClick={handleLogOut}>Log out</a>,
    },
  ];
  return (
    <div className={`${menuOpen ? "mobile-nav-active" : ""} `}>
      <NavBarStyled>
        <button
          type="button"
          className="mobile-nav-toggle d-lg-none"
          onClick={handleMenuToggle}
        >
          <i className="icofont-navigation-menu"></i>
        </button>
        <header
          id="header"
          className={`navbar fixed-top `}
          style={{
            background: bgInput ? bgInput : "white",
            boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="container  d-flex align-items-center">
            <h1 className="logo me-auto">
              {/*eslint-disable-next-line*/}
              <span
                onClick={() => navigate(home_path)}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <img
                  style={{ marginRight: "8px", marginBottom: "3px" }}
                  src={logo}
                  alt=""
                  height={35}
                  width={35}
                />
                Equipay Partners
              </span>
            </h1>

            <nav
              className={`${
                menuOpen
                  ? "mobile-nav d-lg-none text-left"
                  : " nav-menu d-none d-lg-block "
              } `}
            >
              <ul>
                <Dropdown
                  overlay={
                    <Menu
                      className="p-3"
                      onClick={({ key }) => handleMenuItemClick(key)}
                    >
                      {productMenuItems.map((item) => (
                        <Menu.Item key={item.key}>{item.title}</Menu.Item>
                      ))}
                    </Menu>
                  }
                  placement="bottomLeft"
                >
                  <li className="d-none">
                    {/*eslint-disable-next-line*/}
                    <a style={{ fontSize: "16px" }}>Products</a>
                  </li>
                </Dropdown>
                <Dropdown
                  overlay={
                    <Menu
                      className="p-3"
                      onClick={({ key }) => handleMenuItemClick(key)}
                    >
                      {serviceMenuItems.map((item) => (
                        <Menu.Item key={item.key}>{item.title}</Menu.Item>
                      ))}
                    </Menu>
                  }
                  placement="bottomLeft"
                >
                  <li>
                    {/*eslint-disable-next-line*/}
                    <a style={{ fontSize: "16px" }}>Services</a>
                  </li>
                </Dropdown>

                <li className={activeLink === "blog" ? "active" : ""}>
                  {/*eslint-disable-next-line*/}
                  <a
                    style={{ fontSize: "16px", cursor: "pointer" }}
                    onClick={() => navigate(blog_page_path)}
                  >
                    Blogs
                  </a>
                </li>

                {userData ? (
                  <>
                    <Dropdown
                      overlay={
                        <Menu
                          className="p-2"
                          onClick={({ key }) => handleMenuItemClick(key)}
                        >
                          {profileMenuItems.map((item) => (
                            <Menu.Item key={item.key}>{item.title}</Menu.Item>
                          ))}
                        </Menu>
                      }
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
                              backgroundColor: "#5bbcff",
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
                  ""
                )}
              </ul>
            </nav>
          </div>
        </header>
      </NavBarStyled>
    </div>
  );
};

export default NavBar;

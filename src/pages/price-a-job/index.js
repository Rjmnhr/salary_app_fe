import React, { useEffect, useState } from "react";

import "./custom-style.css";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { NavBarStyled } from "../../components/nav-bar/style";
const items = [
  {
    value: "Customer Support",
    label: "Customer Support",
  },
  {
    value: "Voice Process",
    label: "Voice Process",
  },
  {
    value: "Software Development",
    label: "Software Development",
  },
  {
    value: "Sales",
    label: "Sales",
  },
  {
    value: "Business Development",
    label: "Business Development",
  },
  {
    value: "Counsellor",
    label: "Counsellor",
  },
  {
    value: "Lead/Management",
    label: "Lead/Management",
  },
  {
    value: "Recruiter",
    label: "Recruiter",
  },
  {
    value: "Devops",
    label: "Devops",
  },
  {
    value: "Product management",
    label: "Product management",
  },
  {
    value: "Engineer",
    label: "Engineer",
  },
  {
    value: "Business Analyst",
    label: "Business Analyst",
  },
  {
    value: "Data Engineer",
    label: "Data Engineer",
  },
  {
    value: "Data Scientist",
    label: "Data Scientist",
  },
  {
    value: "Project Management",
    label: "Project Management",
  },
  {
    value: "Digital Marketing",
    label: "Digital Marketing",
  },
];

const PriceAJob = () => {
  const [jobTitle, setJobTitle] = useState(null);

  const navigate = useNavigate();

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) => {
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    setJobTitle(input);
  };

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <>
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
              background: ` ${scrolled ? "#fff" : "#fff"}`,
              borderBottom: "1px solid gray",
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
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li class="active">
                    <a href="/price-a-job">Price a Job</a>
                  </li>
                  <li>
                    <a href="#reports">Executive Compensation Reports</a>
                  </li>

                  <li>
                    <a href="#training">Training</a>
                  </li>
                  <li>
                    <a href="#sales">Sales Incentive</a>
                  </li>

                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                  <li>
                    <a href="/login">Login</a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
        </NavBarStyled>
      </body>

      <div
        className="container-fluid  "
        style={{
          background: "gainsboro",
          height: "100vh",
          borderTop: "1px solid gray",
        }}
      >
        <div
          className="container main-container "
          style={{
            background: "white",
            height: "100vh",
            overflowY: "scroll",
            display: "grid",
            justifyItems: "center",
            alignContent: "center",
            borderTop: "1px solid gray",
          }}
        >
          <div className="container p-3 mt-5">
            <h2 className="fs-2">Price a Job</h2>
            <h5 className="mt-3">
              Let's start building a profile with a job title and location.
            </h5>
            <form
              className="w-100 mt-5"
              style={{ display: "grid", placeItems: "center" }}
            >
              <div className="mb-3 col-12 col-lg-7">
                <Select
                  size={"large"}
                  showSearch
                  placeholder="Select education"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  style={{
                    width: "100%",
                    borderRadius: "3px",
                    textAlign: "start",
                  }}
                  options={items}
                  className="border text-start"
                />
              </div>

              <div className="mb-3 col-12 col-lg-7">
                <input
                  placeholder="City"
                  required
                  className="form-control"
                  onChange={(e) => {
                    sessionStorage.setItem("location", e.target.value);
                  }}
                />
              </div>
            </form>
          </div>

          {jobTitle ? (
            <button
              onClick={() => navigate("/add-details")}
              className="btn btn-primary mt-3 w-25"
            >
              Next
            </button>
          ) : (
            <button disabled className="btn btn-primary mt-3 w-25">
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PriceAJob;

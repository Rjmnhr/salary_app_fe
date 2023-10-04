import React, { useEffect, useState } from "react";

import "./custom-style.css";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { NavBarStyled } from "../../components/nav-bar/style";
import { cities } from "../../components/cities-name-list";
const items = [
  "Customer Support",

  "Voice Process",

  "Software Development",

  "Sales",

  "Business Development",

  "Counsellor",

  "Lead/Management",

  "Recruiter",

  "Devops",

  "Product management",

  "Engineer",

  "Business Analyst",

  "Data Engineer",

  "Data Scientist",

  "Project Management",

  "Digital Marketing",
];

const PriceAJob = () => {
  const [selectedJobTitles, setSelectedJobTitles] = useState([]);
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const filteredOptions = items.filter((o) => !selectedJobTitles.includes(o));

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

  const handleSearch = (newValue) => {
    if (newValue) {
      if (newValue.length > 1) {
        const filter = cities.filter((data) =>
          data.toLowerCase().includes(newValue.toLowerCase())
        );
        setData(filter);
      } else {
        setData([]);
      }
    } else {
      setData([]);
    }
  };
  const handleSelectChange = (value) => {
    setLocation(value);
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
                  mode="multiple"
                  size={"large"}
                  showSearch
                  placeholder="Job Title"
                  optionFilterProp="children"
                  value={selectedJobTitles}
                  onChange={setSelectedJobTitles}
                  style={{
                    width: "100%",
                    borderRadius: "3px",
                    textAlign: "start",
                  }}
                  options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  className="border text-start"
                />
              </div>

              <div className="mb-3 col-12 col-lg-7">
                <Select
                  size={"large"}
                  style={{
                    width: "100%",
                    borderRadius: "0",
                    textAlign: "start",
                  }}
                  className="input border"
                  showSearch
                  placeholder="City"
                  defaultActiveFirstOption={false}
                  suffixIcon={null}
                  filterOption={false}
                  onSearch={handleSearch}
                  onChange={handleSelectChange}
                  notFoundContent={null}
                  options={(data || []).map((d) => ({
                    value: d,
                    label: d,
                  }))}
                />
              </div>
            </form>
          </div>

          {selectedJobTitles ? (
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

import React, { useEffect, useState } from "react";

import "./custom-style.css";
import { useNavigate } from "react-router-dom";
import { InputNumber, Select } from "antd";
import { NavBarStyled } from "../../components/nav-bar/style";
import { cities } from "../../components/cities-name-list";
import { DistinctSkills } from "../../components/list-of-distinct-skills";

// const items = [
//   "Customer Support",

//   "Voice Process",

//   "Software Development",

//   "Sales",

//   "Business Development",

//   "Counsellor",

//   "Lead/Management",

//   "Recruiter",

//   "Devops",

//   "Product management",

//   "Engineer",

//   "Business Analyst",

//   "Data Engineer",

//   "Data Scientist",

//   "Project Management",

//   "Digital Marketing",
// ];

const items = [
  "Management",
  "Consultant",
  "Tech Support",
  "Customer Support",
  "Software Developer",
  "Medical Coder",
  "Medical Billing",
  "Sales and Business Development",
  "Data Science/Engineer",
  "DevOps Engineer",
  "Project Manager",
  "Digital Marketing",
  "Counsellor",
  "Content/Copy Writer",
  "Graphic Designer",
  "Architect",
  "Business Analyst",
  "UI/UX Designer",
  "Accounts Manager",
  "Software Engineer",
  "Operations",
  "Engineer",
  "Human Resource",
  "Product Manager",
  "Equity Advisor",
  "Accountant",
];

const CapitalizeFirstLetter = (data) => {
  // Split the string into words
  const words = data?.split(" ");
  // Capitalize the first letter of each word and make the rest lowercase
  const capitalizedWords = words?.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // Join the words back together with spaces
  return capitalizedWords?.join(" ");
};

const PriceAJob = () => {
  const [selectedJobTitles, setSelectedJobTitles] = useState([]);
  const [data, setData] = useState(cities);

  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const filteredOptions = items.filter((o) => !selectedJobTitles.includes(o));

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // eslint-disable-next-line
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillData, setSkillData] = useState(DistinctSkills);
  // const [skillSet, setSkillSet] = useState([]);
  const [experience, setExperience] = useState("");

  const skillSet = [...DistinctSkills];

  console.log("🚀 ~ file: index.js:95 ~ PriceAJob ~ skillSet:", skillSet);

  // useEffect(() => {
  //   axios
  //     .post(
  //       "https://auth.emsicloud.com/connect/token",
  //       {
  //         client_id: "bdqzoc3y3d36h59j",
  //         client_secret: "W4KYdc2L",
  //         grant_type: "client_credentials",
  //         scope: "emsi_open",
  //       },
  //       {
  //         headers: {
  //           "content-type": "application/x-www-form-urlencoded",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       getSkills(response.data.access_token);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // const getSkills = (accessToken) => {
  //   axios
  //     .get("https://emsiservices.com/skills/versions/latest/skills", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then(function (response) {
  //       const skillArr = response.data.data;
  //       const skillNamesArr = skillArr.map((item) => item.name);
  //       setSkillSet(skillNamesArr);
  //       setSkillData(skillNamesArr);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };

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

  const handleSkillSearch = (newValue) => {
    const filter = skillSet.filter((data) =>
      data.toLowerCase().includes(newValue.toLowerCase())
    );
    setSkillData(filter);
  };
  const handleSkillSelectChange = (value) => {
    setSelectedSkills(value);
  };

  const handleSearch = (newValue) => {
    const filter = cities.filter((data) =>
      data.toLowerCase().includes(newValue.toLowerCase())
    );
    setData(filter);
  };
  const handleSelectChange = (value) => {
    setLocation(value);
  };

  const handleSubmit = () => {
    sessionStorage.setItem(
      "selectedJobTitles",
      JSON.stringify(selectedJobTitles)
    );
    sessionStorage.setItem("location", location);
    sessionStorage.setItem("experience", experience);
    sessionStorage.setItem("selected_skills", JSON.stringify(selectedSkills));

    navigate("/reports");
  };

  const handleExperience = (value) => {
    setExperience(value);
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
              Let's start building a profile with compensable factors to
              benchmark jobs.
            </h5>

            <form
              className="w-100 mt-5"
              style={{ display: "grid", placeItems: "center" }}
              onSubmit={handleSubmit}
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
                  required
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
                  required
                />
              </div>

              <div className="mb-3 col-12 col-lg-7">
                <InputNumber
                  size={"large"}
                  placeholder="Years of experience"
                  style={{ width: "100%" }}
                  min={0} // Optional: Set a minimum value
                  max={100} // Optional: Set a maximum value
                  step={1} // Optional: Set the step increment/
                  value={experience}
                  onChange={handleExperience}
                  required
                />
              </div>

              {/* <div className="mb-3 col-12 col-lg-7">
              <label>Education</label>
              <br />

              <Select
                size={"large"}
                showSearch
                placeholder="Select education"
                optionFilterProp="children"
                filterOption={filterOption}
                style={{
                  width: "100%",
                  borderRadius: "3px",
                }}
                options={educationItems}
                className="input border"
                required
              />
            </div> */}

              <div className="mb-3 col-12 col-lg-7">
                <Select
                  required
                  mode="multiple"
                  size={"large"}
                  style={{
                    width: "100%",
                    borderRadius: "0",
                    textAlign: "start",
                  }}
                  className="input border"
                  showSearch
                  placeholder=" Important skills"
                  defaultActiveFirstOption={false}
                  suffixIcon={null}
                  filterOption={false}
                  onSearch={handleSkillSearch}
                  onChange={handleSkillSelectChange}
                  notFoundContent={null}
                  options={(skillData || []).map((d) => ({
                    value: d,
                    label: CapitalizeFirstLetter(d),
                  }))}
                />
              </div>
              {selectedJobTitles.length > 0 &&
              selectedSkills.length > 0 &&
              location ? (
                <button type="submit" className="btn btn-primary mt-3 w-25">
                  Next
                </button>
              ) : (
                <button disabled className="btn btn-primary mt-3 w-25">
                  Next
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceAJob;

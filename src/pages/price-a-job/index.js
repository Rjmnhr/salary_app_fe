import React, { useEffect, useState } from "react";

import "./custom-style.css";
import { useNavigate } from "react-router-dom";
import { Input, InputNumber, Select } from "antd";
import { NavBarStyled } from "../../components/nav-bar/style";

// import { DistinctSkills } from "../../components/list-of-distinct-skills";
import AxiosInstance from "../../components/axios";

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
  "Product Management",
  "Engineer",
  "Business Analyst",
  "Data Engineer",
  "Data Scientist",
  "Project Management",
  "Digital Marketing",
];

const cities = [
  "Chandigarh",
  "New Delhi",
  "Hyderabad",
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Gurgaon",
  "Bangalore",
  "Kochi",
  "Indore",
  "Mumbai",
  "Mumbai Suburban",
  "Navi Mumbai",
  "Pune",
  "Jaipur",
  "Chennai",
  "Coimbatore",
  "Lucknow",
  "Noida",
  "Kolkata",
  "Thane",
  "Delhi",
  "Mumbai ",
];

items.sort();
cities.sort();

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

function formatColumnName(columnName) {
  return columnName?.replace(/[\s/]+/g, "_").toLowerCase();
}

const PriceAJob = () => {
  const [selectedJobTitles, setSelectedJobTitles] = useState([]);
  const [data, setData] = useState(cities);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // eslint-disable-next-line
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [jobsData, setJobsData] = useState(items);
  const [skillSet, setSkillSet] = useState([]);
  const [experience, setExperience] = useState("");
  const [isSupervise, setIsSupervise] = useState("");
  const [isManage, setIsManage] = useState("");

  sessionStorage.removeItem("saveTheReport");

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (isLoggedIn !== "true") {
      navigate("/login-app");
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  useEffect(() => {
    if (selectedJobTitles && selectedJobTitles.length > 0) {
      const fetchResponses = async () => {
        const retrievedSkillsData = await Promise.all(
          selectedJobTitles.map(async (jobTitle) => {
            const response = await AxiosInstance.post(
              "/api/skills/data",
              {
                job_title: formatColumnName(jobTitle),
              },
              {
                headers: {
                  "content-type": "application/json",
                },
              }
            );
            return response.data;
          })
        );
        const uniqueValues = new Set();

        retrievedSkillsData.forEach((innerArray) => {
          innerArray.forEach((obj) => {
            const value = Object.values(obj)[0];
            if (value !== null && value.trim() !== "" && value.length > 1) {
              uniqueValues.add(value);
            }
          });
        });

        const flattenedUniqueValues = [...uniqueValues];

        const sortedArr = flattenedUniqueValues.sort((a, b) => {
          const isSpecialA = /[^a-zA-Z]/.test(a[0]); // Check if a starts with a special character
          const isSpecialB = /[^a-zA-Z]/.test(b[0]); // Check if b starts with a special character

          if (isSpecialA && !isSpecialB) {
            return 1; // Move a to the end
          } else if (!isSpecialA && isSpecialB) {
            return -1; // Move b to the end
          } else {
            return a.localeCompare(b); // Sort alphabetically
          }
        });

        setSkillSet(sortedArr);

        setSkillData(sortedArr);
      };

      fetchResponses();
    }
  }, [selectedJobTitles]);

  // const skillSet = [...DistinctSkills];

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
      data?.toLowerCase().includes(newValue.toLowerCase())
    );
    setSkillData(filter);
  };
  const handleSkillSelectChange = (value) => {
    setSelectedSkills(value);
  };

  const handleSearch = (newValue) => {
    const filter = cities.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );
    setData(filter);
  };

  const handleJobSearch = (newValue) => {
    const filter = items.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );

    setJobsData(filter);
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
    sessionStorage.setItem("isSupervise", isSupervise);
    sessionStorage.setItem("isManage", isManage);

    navigate("/reports");
  };

  const handleExperience = (value) => {
    setExperience(value);
  };

  const handleManageSelect = (value) => {
    setIsManage(value);
  };

  const handleSuperviseSelect = (value) => {
    setIsSupervise(value);
  };

  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isLoggedIn");
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

                  {/* <li>
                    <a href="#contact">Contact</a>
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

      <div
        className="container-fluid mt-3 "
        style={{
          background: "gainsboro",
          height: "100vh",
          borderTop: "1px solid gray",
        }}
      >
        <div
          className="container container-fluid main-container "
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
                  value={selectedJobTitles}
                  onChange={setSelectedJobTitles}
                  onSearch={handleJobSearch}
                  style={{
                    width: "100%",
                    borderRadius: "3px",
                    textAlign: "start",
                  }}
                  options={(jobsData || []).map((item) => ({
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
                
              />
            </div> */}

              <div className="mb-3 col-12 col-lg-7 ">
                <Select
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
              <div className="mb-3 col-12 col-lg-7 ">
                <Input placeholder="Any other description" allowClear />
              </div>
              <div className="mb-3 col-12 col-lg-7">
                <Select
                  size={"large"}
                  placeholder="Does this role supervise employees?"
                  optionFilterProp="children"
                  style={{
                    width: "100%",
                    borderRadius: "3px",
                    textAlign: "start",
                  }}
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                    {
                      value: "No",
                      label: "No",
                    },
                  ]}
                  className="border text-start"
                  onChange={handleSuperviseSelect}
                />
              </div>

              <div className="mb-3 col-12 col-lg-7">
                <Select
                  size={"large"}
                  placeholder="Does this role manage or lead projects?"
                  optionFilterProp="children"
                  style={{
                    width: "100%",
                    borderRadius: "3px",
                    textAlign: "start",
                  }}
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                    {
                      value: "No",
                      label: "No",
                    },
                  ]}
                  className="border text-start"
                  onChange={handleManageSelect}
                />
              </div>

              {selectedJobTitles.length > 0 && location ? (
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

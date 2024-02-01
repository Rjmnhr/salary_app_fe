import React, { useEffect, useState } from "react";
import logo from "../../icons/logo192.png";
import "./custom-style.css";
import { useNavigate } from "react-router-dom";
import { Input, InputNumber, Select, Tag, Dropdown, Skeleton } from "antd";

// import { DistinctSkills } from "../../components/list-of-distinct-skills";
import AxiosInstance from "../../components/axios";

export const cities = [
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
  "Pune",
  "Jaipur",
  "Chennai",
  "Coimbatore",
  "Lucknow",
  "Noida",
  "Kolkata",
  "Thane",
  "Delhi",
];

cities.sort();

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
export function formatColumnName(columnName) {
  // Replace spaces and slashes with underscores
  columnName = columnName.replace(/[\s/]+/g, "_").toLowerCase();

  // Remove any characters other than letters, numbers, and underscores
  columnName = columnName.replace(/[^a-zA-Z0-9_]/g, "");

  // Replace consecutive underscores with a single underscore
  columnName = columnName.replace(/_+/g, "_");
  return columnName;
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
  const [jobsData, setJobsData] = useState([]);
  const [jobsDataFetched, setJobsDataFetched] = useState([]);
  const [skillSet, setSkillSet] = useState([]);
  const [experience, setExperience] = useState("");
  const [isSupervise, setIsSupervise] = useState("");
  const [isManage, setIsManage] = useState("");
  const [topSkills, setTopSkills] = useState([]);
  const [initialTopSkills, setInitialTopSkills] = useState([]);

  const { Option } = Select;
  // const [displayedSkills, setDisplayedSkills] = useState(6);

  sessionStorage.removeItem("saveTheReport");

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const locationURL = window.location.href;
  const userID = localStorage.getItem("user_id");
  useEffect(() => {
    AxiosInstance.post(
      `/api/track-data/store3`,
      { path: locationURL, id: userID },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        //eslint-disable-next-line
        const data = await response.data;
      })
      .catch((err) => console.log(err));

    //eslint-disable-next-line
  }, []);

  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    // Set start time when the component mounts
    setStartTime(Date.now());

    // Add an event listener for the beforeunload event
    const handleBeforeUnload = () => {
      // Calculate time spent
      const endTime = Date.now();
      const timeSpentInSeconds = (endTime - startTime) / 1000;

      // Send the data to your backend
      AxiosInstance.post(
        `/api/track-data/store2`,
        { path: location, id: userID, timeSpent: timeSpentInSeconds },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          //eslint-disable-next-line
          const data = await response.data;
        })
        .catch((err) => console.log(err));
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Specify the cleanup function to remove the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    //eslint-disable-next-line
  }, [location, userID]);

  useEffect(() => {
    AxiosInstance.get("/api/salary/roles")
      .then(async (res) => {
        const response = await res.data;
        console.log("🚀 ~ .then ~ response:", response);

        const jobRoles = response.map((item) => Object.values(item)[0]);

        // Create a new Set to store unique values
        const uniqueSet = new Set(jobRoles);

        // Convert the Set back to an array, sort it, and remove "unclassified" if present
        const uniqueArray = Array.from(uniqueSet)
          .filter((role) => role !== "unclassified")
          .sort();
        setJobsData(uniqueArray);
        setJobsDataFetched(uniqueArray);
      })
      .catch((err) => console.log(err));
  }, []);

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
      };

      fetchResponses();
    }
  }, [selectedJobTitles]);

  useEffect(() => {
    // Filter elements from topSkills that do not exist in selectedSkills
    const filteredTopSkills = topSkills.filter(
      (skill) => !selectedSkills.includes(skill)
    );

    setTopSkills(filteredTopSkills);
    //eslint-disable-next-line
  }, [selectedSkills]);

  useEffect(() => {
    if (selectedJobTitles && selectedJobTitles.length > 0) {
      AxiosInstance.post(
        "/api/skills/data/top-skills",
        { job_title: formatColumnName(selectedJobTitles[0]) },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then(async (response) => {
          const resultData = await response.data;

          const valuesArray = resultData
            .map((item) => Object.values(item))
            .flat();

          setTopSkills(valuesArray);
          setInitialTopSkills(valuesArray);
        })
        .catch((err) => console.log(err));
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
    if (newValue) {
      if (newValue.length > 0) {
        const filter = skillSet.filter((data) =>
          data.toLowerCase().includes(newValue.toLowerCase())
        );
        setSkillData(filter);
      } else {
        setSkillData([]);
      }
    } else {
      setSkillData([]);
    }
  };

  const handleSkillSelectChange = (value) => {
    // Check if a skill has been removed
    const removedSkills = selectedSkills.filter(
      (skill) => !value.includes(skill)
    );

    setSelectedSkills(value);
    setSkillData([]);

    const itIsTopSkill = initialTopSkills.filter(
      (skill) => skill === removedSkills[0]
    );

    // If a skill has been removed, add it back to topSkills
    if (itIsTopSkill.length > 0) {
      setTopSkills((prevTopSkills) => [...removedSkills, ...prevTopSkills]);
    }
  };

  const handleSearch = (newValue) => {
    const filter = cities.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );
    setData(filter);
  };

  const handleJobSearch = (newValue) => {
    const filter = jobsDataFetched.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );

    setJobsData(filter);
  };
  const handleSelectChange = (value) => {
    setLocation(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const handleSelectJob = (value) => {
    setSelectedJobTitles([value]);
    setJobsData(jobsDataFetched);
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

  const handleSkillButtonClick = (skill) => {
    // Add the selected skill to the Select input
    setSelectedSkills([...selectedSkills, skill]);
    // Remove the skill from topSkills
    setSkillData(skillData.filter((s) => s !== skill));
    setTopSkills(topSkills.filter((s) => s !== skill?.toLowerCase()));
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
    <>
      <body className={`${menuOpen ? "mobile-nav-active" : ""} `}>
        <button
          type="button"
          class="mobile-nav-toggle d-lg-none"
          onClick={handleMenuToggle}
          style={{ position: "absolute" }}
        >
          <i style={{ color: "black" }} class="icofont-navigation-menu"></i>
        </button>
        <header
          id="header"
          className={`navbar  ${scrolled ? "scrolled" : ""}`}
          style={{
            background: ` ${scrolled ? "#fff" : "#fff"}`,
            borderBottom: "1px solid gray",
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
                <li>
                  <a href="/">Home</a>
                </li>
                <li className="active">
                  <a href="/price-a-job">Price a Job</a>
                </li>
                <li>
                  <a href="/executive-compensation">Executive Compensation</a>
                </li>
                <li>
                  <a href="/salary-survey">Salary survey</a>
                </li>
                <li>
                  <a href="/training">Training</a>
                </li>
                <li>
                  <a href="/sales">Sales Incentive</a>
                </li>
                <li>
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
                      <li style={{ cursor: "pointer" }}>
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
      </body>

      {jobsDataFetched.length > 0 ? (
        <>
          {" "}
          <div className="container-fluid">
            <h2 className="fs-2 mt-3">Price a Job</h2>
            <h5 className="mt-3">
              Let's start building a profile with compensable factors to
              benchmark jobs.
            </h5>
            <div
              className="w-100 mt-5"
              style={{ display: "grid", placeItems: "center" }}
            >
              <div className="mb-3 col-12 col-lg-6">
                <Select
                  size={"large"}
                  showSearch
                  placeholder="Job Title"
                  value={selectedJobTitles}
                  onChange={handleSelectJob}
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

              <div className="mb-3 col-12 col-lg-6">
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

              <div className="mb-3 col-12 col-lg-6">
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

              <div className="mb-3 col-12 col-lg-6 ">
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
                  placeholder="Important skills"
                  defaultActiveFirstOption={false}
                  suffixIcon={null}
                  filterOption={false}
                  onSearch={handleSkillSearch}
                  onChange={handleSkillSelectChange}
                  notFoundContent={null}
                  value={selectedSkills}
                >
                  {(skillData || []).map((d) => (
                    <Option key={d} value={d}>
                      {d}
                    </Option>
                  ))}
                </Select>
              </div>
              <div
                style={{ transition: " all 0.3s ease" }}
                className="d-flex col-12 col-lg-6 flex-wrap justify-content-start align-items-center mt-1 mb-2"
              >
                {topSkills.map((skill, index) => {
                  return (
                    <Tag
                      onClick={() => handleSkillButtonClick(skill)}
                      key={index}
                      className=" skill-btn  m-1"
                    >
                      {skill}
                    </Tag>
                  );
                })}
                {/* 
            {displayedSkills < topSkills.length && (
              <div
                className="text-primary btn load-more-btn"
                onClick={() => setDisplayedSkills(topSkills.length)}
              >
                Load More...
              </div>
            )} */}
              </div>
              <div className="mb-3 col-12 col-lg-6 ">
                <Input
                  placeholder="Any other skills or additional information"
                  allowClear
                />
              </div>
              <div className="mb-3 col-12 col-lg-6">
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

              <div className="mb-3 col-12 col-lg-6">
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
            </div>
            <div className="mb-3">
              {selectedJobTitles.length > 0 && location && experience ? (
                <button
                  onClick={handleSubmit}
                  type="submit"
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
      ) : (
        <div className="container-fluid p-3">
          <Skeleton active />
          <Skeleton active />
        </div>
      )}
    </>
  );
};

export default PriceAJob;

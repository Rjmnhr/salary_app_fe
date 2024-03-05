import React, { useEffect, useState } from "react";

import "./custom-style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Select, Tag, Skeleton } from "antd";
import AxiosInstance from "../../config/axios";
import {
  CapitalizeFirstLetter,
  formatColumnName,
} from "../../utils/price-a-job-helper-functions";

import { login_app_path } from "../../config/constant";
import NavBar from "../layout/nav-bar";

// import { DistinctSkills } from "../../components/list-of-distinct-skills";

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

export const experienceOptions = ["0-2", "2-5", "5-8", "8-11", "11-14", "15+"];

cities.sort();

const PriceAJob = () => {
  const [selectedJobTitles, setSelectedJobTitles] = useState([]);
  const [data, setData] = useState(cities);
  const [location, setLocation] = useState("");
  const pathLocation = useLocation();
  const path = pathLocation.pathname;
  const navigate = useNavigate();

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
  const [sectorsOption, setSectorsOption] = useState([]);
  const [sector, setSector] = useState(null);
  const { Option } = Select;
  const accessToken = localStorage.getItem("accessToken");

  // const [displayedSkills, setDisplayedSkills] = useState(6);

  sessionStorage.removeItem("saveTheReport");

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
    AxiosInstance.get("/api/salary/titles", {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    })
      .then(async (res) => {
        const response = await res.data;

        if (res.status !== 200) {
          navigate(login_app_path + `?p=${path}`);
          return;
        }

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
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken, navigate, path]);

  useEffect(() => {
    AxiosInstance.post(
      "/api/salary/sectors",
      { title: selectedJobTitles[0] },
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    )
      .then(async (res) => {
        const response = await res.data;
        if (res.status !== 200) return navigate(login_app_path + `?p=${path}`);
        const sectors = response.map((item) => Object.values(item)[0]);

        // Create a new Set to store unique values
        const uniqueSet = new Set(sectors);

        // Convert the Set back to an array, sort it, and remove "unclassified" if present
        const uniqueArray = Array.from(uniqueSet)
          .filter((sector) => sector !== "Nan")
          .sort();
        setSectorsOption(uniqueArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedJobTitles, accessToken, navigate, path]);
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
                  token: `Bearer ${accessToken}`,
                },
              }
            );

            if (response.status !== 200)
              return navigate(login_app_path + `?p=${path}`);
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
  }, [selectedJobTitles, accessToken, navigate, path]);

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
            token: `Bearer ${accessToken}`,
          },
        }
      )
        .then(async (response) => {
          const resultData = await response.data;
          if (response.status !== 200)
            return navigate(login_app_path + `?p=${path}`);

          const valuesArray = resultData
            .map((item) => Object.values(item))
            .flat();

          setTopSkills(valuesArray);
          setInitialTopSkills(valuesArray);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedJobTitles, accessToken, navigate, path]);

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
  const handleSectorSearch = (newValue) => {
    const filter = sectorsOption.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );
    setSectorsOption(filter);
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
    sessionStorage.setItem("sector", sector ? sector : "");

    navigate("/reports");
  };

  const handleExperience = (value) => {
    setExperience(value);
  };

  const handleSelectJob = (value) => {
    setSelectedJobTitles([value]);
    setJobsData(jobsDataFetched);
    setSector(null);
    setSelectedSkills([]);
  };

  const handleManageSelect = (value) => {
    setIsManage(value);
  };

  const handleSuperviseSelect = (value) => {
    setIsSupervise(value);
  };

  const handleSkillButtonClick = (skill) => {
    // Add the selected skill to the Select input
    setSelectedSkills([...selectedSkills, skill]);
    // Remove the skill from topSkills
    setSkillData(skillData.filter((s) => s !== skill));
    setTopSkills(topSkills.filter((s) => s !== skill?.toLowerCase()));
  };

  return (
    <>
      <NavBar />
      <div style={{ marginTop: "100px" }}>
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
                  <Select
                    size={"large"}
                    style={{
                      width: "100%",
                      borderRadius: "0",
                      textAlign: "start",
                    }}
                    className="input border"
                    type={false}
                    placeholder="Years of experience"
                    defaultActiveFirstOption={false}
                    suffixIcon={null}
                    filterOption={false}
                    onChange={handleExperience}
                    notFoundContent={null}
                    options={(experienceOptions || []).map((e) => ({
                      value: e,
                      label: e,
                    }))}
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
                <div className="mb-3 col-12 col-lg-6">
                  <Select
                    size={"large"}
                    style={{
                      width: "100%",
                      borderRadius: "0",
                      textAlign: "start",
                    }}
                    value={sector}
                    className="input border"
                    showSearch
                    placeholder="Sector"
                    defaultActiveFirstOption={false}
                    suffixIcon={null}
                    filterOption={false}
                    onSearch={handleSectorSearch}
                    onChange={(value) => setSector(value)}
                    notFoundContent={null}
                    options={(sectorsOption || []).map((d) => ({
                      value: d,
                      label: CapitalizeFirstLetter(d),
                    }))}
                  />
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
      </div>
    </>
  );
};

export default PriceAJob;

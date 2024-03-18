import React, { useEffect, useState } from "react";

import "./custom-style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Select, Tag, Skeleton, Spin, Space } from "antd";
import AxiosInstance from "../../config/axios";
import { CapitalizeFirstLetter } from "../../utils/price-a-job-helper-functions";
import { login_app_path } from "../../config/constant";
import NavBar from "../layout/nav-bar";
import { CloseCircleOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import {
  api_pay_pulse_relevantSkills,
  api_pay_pulse_saveActivity,
  api_pay_pulse_titles,
  api_pay_pulse_topSkills,
  api_pay_pulse_validInputs,
  api_track_data_1,
  api_track_data_2,
} from "../../config/config";

export const experienceOptions = ["0-2", "2-5", "5-8", "8-11", "11-14", "15+"];

const PayPulseInput = () => {
  const [availableTitles, setAvailableTitles] = useState([]);
  const [availableTitlesFetched, setAvailableTitlesFetched] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedTitleID, setSelectedTitleID] = useState(0);
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [isSupervise, setIsSupervise] = useState(false);
  const [isManage, setIsManage] = useState(false);
  const [relevantSkills, setRelevantSkills] = useState([]);
  const [topSkills, setTopSkills] = useState([]);
  const [sector, setSector] = useState(null);

  const [initialTopSkills, setInitialTopSkills] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [validatedInputsArr, setValidatedInputsArr] = useState([]);
  const [validatedCityInputs, setValidatedCityInputs] = useState([]);
  const [validatedExpInputs, setValidatedExpInputs] = useState([]);
  const [validatedSectorInputs, setValidatedSectorInputs] = useState([]);
  const [validatedInputsArrWithSector, setValidatedInputsArrWithSector] =
    useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [loading, setLoading] = useState({
    city: false,
    experience: false,
    sector: false,
  }); // State to manage loading

  const pathLocation = useLocation();
  const path = pathLocation.pathname;
  const navigate = useNavigate();
  const { Option } = Select;
  const accessToken = Cookies.get("accessToken");
  sessionStorage.setItem("report-updated", false);
  sessionStorage.removeItem("activeIndex");
  sessionStorage.removeItem("saveTheReport");
  const locationURL = window.location.href;

  useEffect(() => {
    AxiosInstance.post(
      api_track_data_1,
      { path: locationURL },
      {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${accessToken}`,
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
        api_track_data_2,
        { path: location, timeSpent: timeSpentInSeconds },
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${accessToken}`,
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
  }, [location]);

  useEffect(() => {
    AxiosInstance.get(api_pay_pulse_titles, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    })
      .then(async (res) => {
        const response = await res.data;

        if (response.status !== 200) {
          navigate(login_app_path + `?p=${path}`);
          return;
        }
        setAvailableTitles(response?.data);
        setAvailableTitlesFetched(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken, navigate, path]);

  useEffect(() => {
    if (selectedTitleID !== 0 && selectedTitleID) {
      AxiosInstance.post(
        api_pay_pulse_relevantSkills,
        { title_id: selectedTitleID },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      )
        .then(async (res) => {
          const response = await res.data;
          if (response.status !== 200)
            return navigate(login_app_path + `?p=${path}`);
          const skills = response?.data.map((item) => Object.values(item)[0]);
          setRelevantSkills(skills);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedTitleID, accessToken, navigate, path]);

  useEffect(() => {
    if (selectedTitleID !== 0 && selectedTitleID) {
      if (selectedTitleID !== 0 && selectedTitleID) {
        AxiosInstance.post(
          api_pay_pulse_topSkills,
          { title_id: selectedTitleID },
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        )
          .then(async (res) => {
            const response = await res.data;
            if (response.status !== 200)
              return navigate(login_app_path + `?p=${path}`);
            const skills = response?.data.map((item) => Object.values(item)[0]);
            setTopSkills(skills);
            setInitialTopSkills(skills);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [selectedTitleID, accessToken, navigate, path]);

  // useEffect(() => {
  //   if (selectedTitleID !== 0 && selectedTitleID) {
  //     AxiosInstance.post(
  //       api_pay_pulse_sectors,
  //       { title_id: selectedTitleID },
  //       {
  //         headers: {
  //           token: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //       .then(async (res) => {
  //         const response = await res.data;
  //         if (response.status !== 200)
  //           return navigate(login_app_path + `?p=${path}`);

  //         const sectors = response?.data.map((item) => Object.values(item)[0]);

  //         setSectorsOption(sectors);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [selectedTitleID, accessToken, navigate, path]);

  const handleTitleSearch = (newValueId) => {
    const filter = availableTitlesFetched.filter((data) =>
      data?.id.includes(newValueId)
    );

    setAvailableTitles(filter);
  };
  const handleLocationChange = (value) => {
    setLocation(value);
  };

  const handleSectorSearch = (newValue) => {
    const filter = validatedSectorInputs.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );
    validatedSectorInputs(filter);
  };

  useEffect(() => {
    if (validatedInputsArr?.length > 0 && location) {
      setLoading({
        city: false,
        experience: true,
        sector: false,
      });
      // Extracting distinct locations
      const filterValidatedInputsArr = validatedInputsArr.filter(
        (d) => d.location === location
      );

      // Extracting distinct experiences
      const distinctExperiences = [
        ...new Set(filterValidatedInputsArr.map((item) => item.experience)),
      ];

      setValidatedExpInputs(distinctExperiences);
      setLoading({
        city: false,
        experience: false,
        sector: false,
      });
    }
  }, [validatedInputsArr, location]);

  useEffect(() => {
    if (validatedInputsArrWithSector?.length > 0 && location && experience) {
      // Extracting distinct locations
      const filterValidatedInputsArr = validatedInputsArrWithSector.filter(
        (d) => d.location === location
      );

      const filterValidatedInputsArrWithExp = filterValidatedInputsArr.filter(
        (d) => d.experience === experience
      );

      // Extracting distinct experiences
      const distinctSectors = [
        ...new Set(filterValidatedInputsArrWithExp?.map((item) => item.sector)),
      ];

      setValidatedSectorInputs(distinctSectors);
    }
  }, [validatedInputsArrWithSector, location, experience]);

  useEffect(() => {
    // Filter elements from topSkills that do not exist in selectedSkills
    const filteredTopSkills = topSkills.filter(
      (skill) => !selectedSkills.includes(skill)
    );

    setTopSkills(filteredTopSkills);
    //eslint-disable-next-line
  }, [selectedSkills]);

  useEffect(() => {
    if (selectedTitleID !== 0 && selectedTitleID) {
      setLoading({
        city: true,
        experience: false,
        sector: false,
      });
      AxiosInstance.post(
        api_pay_pulse_validInputs,
        { title_id: selectedTitleID },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      )
        .then(async (res) => {
          const response = await res.data;
          if (res.status === 200) {
            const result = response.result;
            const resultWithSector = response.sector_result;
            setLoading({
              city: false,
              experience: false,
              sector: false,
            });
            setValidatedInputsArr(result);
            setValidatedInputsArrWithSector(resultWithSector);

            const distinctLocations = [
              ...new Set(result?.map((item) => item.location)),
            ];

            setValidatedCityInputs(distinctLocations);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedTitleID, accessToken]);

  const handleSkillSearch = (newValue) => {
    if (newValue) {
      if (newValue.length > 0) {
        const filter = relevantSkills.filter((data) =>
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

  const handleLocationSearch = (newValue) => {
    const filter = validatedCityInputs.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );
    setValidatedCityInputs(filter);
  };

  const handleExperience = (value) => {
    setExperience(value);
  };

  const handleSelectTitle = (titleID, title) => {
    setSelectedTitle(title);
    setSelectedTitleID(titleID);
    setAvailableTitles(availableTitlesFetched);
    setSector(null);
    setSelectedSkills([]);
    setTopSkills([]);
    setLocation("");
    setValidatedCityInputs([]);
    setValidatedExpInputs([]);
    setValidatedSectorInputs([]);
    setSector(null);
    setExperience("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const reportID = Date.now() + Math.floor(Math.random() * 1000);
    saveReport(reportID);

    sessionStorage.setItem(
      "input-values",
      JSON.stringify({
        title: selectedTitle,
        title_id: selectedTitleID,
        location: location,
        experience: experience,
        skills: selectedSkills,
        sectors: sector ? sector : "",
        report_id: reportID,
      })
    );
    navigate("/reports");
  };

  const saveReport = async (reportID) => {
    const formData = new FormData();

    formData.append("title_id", selectedTitleID);
    formData.append("title", selectedTitle);
    formData.append("experience", experience);
    formData.append("skills", JSON.stringify(selectedSkills));
    formData.append("location ", location);
    formData.append("manage", isManage);
    formData.append("supervise", isSupervise);
    formData.append("sector", sector);
    formData.append("report_id", reportID);

    AxiosInstance.post(api_pay_pulse_saveActivity, formData, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${accessToken}`,
      },
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <NavBar />
      <div style={{ marginTop: "100px" }}>
        {availableTitlesFetched.length > 0 ? (
          <>
            {" "}
            <div className="container-fluid">
              <h2 className="fs-2 mt-3">PayPulse</h2>
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
                    value={selectedTitle}
                    onChange={(value, option) =>
                      handleSelectTitle(value, option.label)
                    }
                    onSearch={handleTitleSearch}
                    style={{
                      width: "100%",
                      borderRadius: "3px",
                      textAlign: "start",
                    }}
                    options={(availableTitles || []).map((item) => ({
                      value: item.id,
                      label: item.titles,
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
                    suffixIcon={loading?.city ? <Spin size="small" /> : null} // Conditionally render Spin component when loading is true
                    className="input border"
                    showSearch
                    value={location ? location : null}
                    placeholder="City"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    onSearch={handleLocationSearch}
                    onChange={handleLocationChange}
                    notFoundContent={null}
                    options={(validatedCityInputs || []).map((d) => ({
                      value: d,
                      label: d,
                    }))}
                    disabled={validatedCityInputs.length > 0 ? false : true}
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
                    value={experience ? experience : null}
                    type={false}
                    placeholder="Years of experience"
                    defaultActiveFirstOption={false}
                    suffixIcon={null}
                    filterOption={false}
                    onChange={handleExperience}
                    notFoundContent={null}
                    disabled={validatedExpInputs.length > 0 ? false : true}
                    optionLabelProp="label"
                  >
                    {experienceOptions.map((option) => (
                      <Select.Option
                        key={option}
                        value={option}
                        label={
                          <Space>
                            {validatedExpInputs.includes(option) ? null : (
                              <CloseCircleOutlined />
                            )}
                            {option}
                          </Space>
                        }
                        disabled={!validatedExpInputs.includes(option)}
                      >
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
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
                    disabled={
                      selectedTitle && location && experience ? false : true
                    }
                  >
                    {(skillData || []).map((d) => (
                      <Option key={d} value={d}>
                        {d}
                      </Option>
                    ))}
                  </Select>
                </div>

                {selectedTitle &&
                  location &&
                  experience &&
                  (topSkills.length > 0 ? (
                    <>
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
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        height: "5vh",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                      className="mb-3"
                    >
                      <Spin />
                      <span className="ml-2">Loading top skills</span>
                    </div>
                  ))}

                {validatedInputsArrWithSector.length > 0 && (
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
                      options={(validatedSectorInputs || []).map((d) => ({
                        value: d,
                        label: CapitalizeFirstLetter(d),
                      }))}
                      disabled={validatedSectorInputs.length > 0 ? false : true}
                    />
                  </div>
                )}

                <div className="mb-3 col-12 col-lg-6 ">
                  <Input
                    placeholder="Any other skills or additional information"
                    allowClear
                    disabled={
                      selectedTitle && location && experience ? false : true
                    }
                  />
                </div>

                <div className="mb-3 col-12 col-lg-6 d-none">
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

                <div className="mb-3 col-12 col-lg-6 d-none">
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
                {selectedTitle && location && experience ? (
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
          <div className="container-fluid p-3 plg-5">
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        )}
      </div>
    </>
  );
};

export default PayPulseInput;

import React, { useState, useEffect } from "react";
// import { Tabs } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import NavBar from "../../components/nav-bar/index";
import "./style.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AxiosInstance from "../../components/axios";
import GeneratedReport from "../../components/generate_report";
import { Button, InputNumber, Modal, Popconfirm, Select, Skeleton } from "antd";
import { cities, formatColumnName } from "../price-a-job";

import ReportLimitFallBack from "../../components/report-limit-fallback";
import { useLocation } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// const GenerateSalaryValue = (originalData, storedExperience) => {
//   if (originalData.length > 0) {
//     // Function to calculate the "calculated salary" based on the stored experience
//     const calculateCalculatedSalary = (
//       experienceRange,
//       salaryRange,
//       storedExperience
//     ) => {
//       const [experienceStart, experienceEnd] = experienceRange
//         .split(" ")[0]
//         .split("-")
//         .map(Number);

//       const [salaryStart, salaryEnd] = salaryRange
//         .split(" ")[0]
//         .split("-")
//         .map(Number);

//       if (storedExperience === experienceStart) {
//         return salaryStart;
//       } else if (storedExperience === experienceEnd) {
//         return salaryEnd;
//       } else if (
//         storedExperience > experienceStart &&
//         storedExperience < experienceEnd
//       ) {
//         const experienceRangeLength = experienceEnd - experienceStart;
//         const salaryRangeLength = salaryEnd - salaryStart;
//         const salaryPerYear = salaryRangeLength / experienceRangeLength;
//         return (
//           salaryStart + (storedExperience - experienceStart) * salaryPerYear
//         );
//       } else {
//         console.log(typeof storedExperience);
//         console.log("exception");
//         return null; // Handle cases where storedExperience is not within the experience range
//       }
//     };

//     // Modify the original 2D array to include "calculated salary"

//     const modifiedData = originalData.map((nestedArray) => {
//       return nestedArray.map((item) => {
//         const calculatedSalary = calculateCalculatedSalary(
//           item.experience,
//           item.salary,
//           storedExperience
//         );

//         if (calculatedSalary !== null) {
//           return {
//             ...item,
//             calculated_salary: calculatedSalary,
//           };
//         } else {
//           console.log(" adding exception");
//           // Handle cases where storedExperience is not within the experience range
//           return item;
//         }
//       });
//     });

//     return modifiedData;
//   }
// };

const ReportsPage = ({ userPlan }) => {
  const [salaryData, setSalaryData] = useState([]); // Store API responses here
  // const [calculatedSalaryData, setCalculatedSalaryData] = useState([]);
  // const [calculatedSalaryDataByRole, setCalculatedSalaryDataByRole] = useState(
  //   []
  // );

  const [filteredThroughSkill, setFilteredThroughSkill] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [duplicateDataArray, setDuplicateDataArray] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [salaryDataByRole, setSalaryDataByRole] = useState([]);
  const [salaryDataNoExp, setSalaryDataNoExp] = useState([]);
  const storedLocation = sessionStorage.getItem("location");
  const storedJobTitles = JSON.parse(
    sessionStorage.getItem("selectedJobTitles")
  );
  const storedExperience = sessionStorage.getItem("experience");
  const storedSkills = JSON.parse(sessionStorage.getItem("selected_skills"));
  const storedSupervise = sessionStorage.getItem("isSupervise");
  const storedManage = sessionStorage.getItem("isManage");
  const storedUserID = localStorage.getItem("user_id");

  const [showPreviousReports, setShowPreviousReports] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editableExperience, setEditableExperience] =
    useState(storedExperience);
  const [editableLocation, setEditableLocation] = useState("");
  const [editableJobTitle, setEditableJobTitle] = useState("");
  const [editableSkills, setEditableSkills] = useState([]);
  let saveTheReport = sessionStorage.getItem("saveTheReport") || "true";
  const [activeIndex, setActiveIndex] = useState(0);
  // const [jobsData, setJobsData] = useState(items);
  const [locationData, setLocationData] = useState(cities);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [skillSet, setSkillSet] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const { Option } = Select;
  const [isReportReady, setIsReportReady] = useState(false);
  const [isActiveIndexLimited, setIsActiveIndexLimited] = useState(false);

  const [reportLimit, setReportLimit] = useState(1); // Default to 1 report for Basic users

  const location = useLocation();

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
    // Fetch the user's subscription plan and set the report limit accordingly
    if (userPlan === "Standard") {
      setReportLimit(6);
    } else if (userPlan === "Premium") {
      setReportLimit(Infinity); // Unlimited reports
    }
  }, [userPlan]);

  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  // Create a new array by mapping the jobTitles array
  const CreateArr = () => {
    console.log("debug");
    const newArr = storedJobTitles?.map((jobTitle) => ({
      job_titles: jobTitle,
      location: storedLocation,
      experience: Number(storedExperience),
      skills: sessionStorage.getItem("selected_skills"),
      manage: storedManage,
      supervise: storedSupervise,
    }));

    return newArr;
  };

  useEffect(() => {
    let createdArray = "";
    if (location.pathname === "/reports-dashboard") {
      createdArray = "";
    } else {
      createdArray = CreateArr();
    }

    AxiosInstance.post(
      "/api/report/get",
      { user_id: storedUserID },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        const data = await response.data;

        const reversedData = [...data].reverse();
        // Use Set to store distinct objects
        const uniqueObjects = new Set(
          [...createdArray, ...reversedData].map(JSON.stringify)
        );

        // Convert Set back to an array of objects
        const distinctArray = [...uniqueObjects].map(JSON.parse);

        setDataArray(distinctArray);
        setDuplicateDataArray(distinctArray);
        setEditableJobTitle(distinctArray[0].job_titles);
        setEditableLocation(distinctArray[0].location);
        setEditableSkills(JSON.parse(distinctArray[0].skills));
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (location.pathname === "/reports#dashboard") {
      return;
    } else {
      if (saveTheReport === "true") {
        if (storedJobTitles && storedUserID) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          saveTheReport = "false";
          saveReport();
        }
      }
    }

    //eslint-disable-next-line
  }, []);

  const saveReport = async () => {
    if (storedJobTitles && storedJobTitles.length > 0) {
      await Promise.all(
        storedJobTitles.map(async (jobTitle) => {
          const formData = new FormData();
          formData.append("user_id", storedUserID);
          formData.append("job_titles", jobTitle);
          formData.append("experience", storedExperience);
          formData.append("skills", JSON.stringify(storedSkills));
          formData.append("location ", storedLocation);
          formData.append("manage", storedManage);
          formData.append("supervise", storedSupervise);

          const response = await AxiosInstance.post(
            "/api/report/save",
            formData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response.data);
        })
      );

      sessionStorage.setItem("saveTheReport", "false"); // Mark report as saved in localStorage
    }
  };

  useEffect(() => {
    if (dataArray && dataArray.length > 0) {
      setIsReportReady(false);
      const fetchResponse = async (index) => {
        if (index >= 0 && index < dataArray.length) {
          const data = dataArray[index];
          const response = await AxiosInstance.post(
            "/api/salary/data",
            {
              location: data.location,
              job_title: data.job_titles,
              skills: JSON.parse(data.skills),
              experience: data.experience,
            },
            {
              headers: {
                "content-type": "application/json",
              },
            }
          );
          return { data: response.data.data, bool: response.data.bool };
        } else {
          return null; // Handle out-of-bounds index
        }
      };

      const fetchDataForActiveIndex = async () => {
        const index = activeIndex; // Get the active index
        const response = await fetchResponse(index);
        if (response) {
          const { data, bool } = response;

          setFilteredThroughSkill(bool);
          setIsReportReady(true);
          setSalaryData(data);
        }
      };

      fetchDataForActiveIndex();
    }

    // eslint-disable-next-line
  }, [activeIndex, dataArray]);

  useEffect(() => {
    if (salaryData.length > 0) {
      const fetchResponseByRole = async (index) => {
        if (index >= 0 && index < dataArray.length) {
          const data = dataArray[index];
          const response = await AxiosInstance.post(
            "/api/salary/data/role",
            {
              job_title: data.job_titles,
              skills: JSON.parse(data.skills),
              experience: data.experience,
            },
            {
              headers: {
                "content-type": "application/json",
              },
            }
          );
          return response.data;
        } else {
          return null; // Handle out-of-bounds index
        }
      };

      const fetchDataForActiveIndexByRole = async () => {
        const index = activeIndex; // Get the active index
        const response = await fetchResponseByRole(index);
        if (response) {
          setSalaryDataByRole(response);
        }
      };

      fetchDataForActiveIndexByRole();
    }

    // eslint-disable-next-line
  }, [activeIndex, dataArray, salaryData]);

  useEffect(() => {
    if (salaryData.length > 0) {
      const fetchResponseNoExperience = async (index) => {
        if (index >= 0 && index < dataArray.length) {
          const data = dataArray[index];
          try {
            const response = await AxiosInstance.post(
              "/api/salary/data/role/no-experience",
              {
                job_title: data.job_titles,
                skills: JSON.parse(data.skills),
              },
              {
                headers: {
                  "content-type": "application/json",
                },
              }
            );
            return response.data;
          } catch (error) {
            console.error("API request failed:", error);
            return null; // Handle the error gracefully
          }
        } else {
          return null; // Handle out-of-bounds index
        }
      };

      const fetchDataForActiveIndexNoExperience = async () => {
        const index = activeIndex; // Get the active index
        const response = await fetchResponseNoExperience(index);
        if (response) {
          setSalaryDataNoExp(response);
        }
      };

      fetchDataForActiveIndexNoExperience();
    }

    // eslint-disable-next-line
  }, [activeIndex, dataArray, salaryData]);

  function SkillsList({ skills }) {
    return (
      <div>
        <p>
          <span>Skills :</span>{" "}
          <span style={{ fontSize: "14px" }}>
            {" "}
            {CapitalizeFirstLetter(skills.join(", "))}
          </span>
        </p>
      </div>
    );
  }

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

  const handleChangeEdit = () => {
    setIsEditing(!isEditing);

    if (!isEditing) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }

    if (isEditing) {
      setIsReportReady(false);
      // Create a new report object with the edited values
      const editedReport = {
        job_titles: editableJobTitle,
        location: editableLocation,
        experience: editableExperience,
        skills: JSON.stringify(editableSkills),
        manage: storedManage,
        supervise: storedSupervise,
      };

      // Update the first element of dataArray with the edited report
      const updatedDataArray = [...dataArray];
      updatedDataArray[0] = editedReport;

      // Update the state with the modified dataArray
      setDataArray(updatedDataArray);
    }
  };
  // useEffect(() => {
  //   if (salaryData.length > 0) {
  //     const data = GenerateSalaryValue(
  //       salaryData,
  //       parseInt(dataArray[activeIndex].experience)
  //     );

  //     setCalculatedSalaryData(data);
  //   }
  // }, [salaryData, dataArray, activeIndex]);
  // useEffect(() => {
  //   if (salaryDataByRole.length > 0) {
  //     const data = GenerateSalaryValue(
  //       salaryDataByRole,
  //       parseInt(dataArray[activeIndex].experience)
  //     );

  //     setCalculatedSalaryDataByRole(data);
  //   }
  // }, [salaryDataByRole, dataArray, activeIndex]);

  // const handleSelectEditableJob = (value) => {
  //   setEditableJobTitle(value);
  // };
  // const handleJobSearch = (newValue) => {
  //   const filter = items.filter((data) =>
  //     data?.toLowerCase().includes(newValue.toLowerCase())
  //   );

  //   setJobsData(filter);
  // };
  const handleSearch = (newValue) => {
    const filter = cities.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );
    setLocationData(filter);
  };

  const handleSelectEditableLocation = (value) => {
    setEditableLocation(value);
  };
  const handleSelectEditableExperience = (value) => {
    setEditableExperience(value);
  };
  const handleSelectEditableSkills = (value) => {
    setEditableSkills(value);
  };

  const handleSkillSearch = (newValue) => {
    const filter = skillSet.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );
    setSkillData(filter);
  };

  useEffect(() => {
    if (editableJobTitle) {
      AxiosInstance.post(
        "/api/skills/data",
        {
          job_title: formatColumnName(editableJobTitle),
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then(async (response) => {
          const retrievedSkillsData = await response.data;
          const nestedSkillsData = [retrievedSkillsData];

          const uniqueValues = new Set();

          nestedSkillsData.forEach((innerArray) => {
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
        })
        .catch((err) => console.log(err));
    }
  }, [editableJobTitle]);

  const modalFooter = (
    <div>
      <Button type="primary" onClick={handleChangeEdit}>
        Save
      </Button>
    </div>
  );
  useEffect(() => {
    if (dataArray.length > reportLimit) {
      setIsActiveIndexLimited(true);
    }
  }, [dataArray, reportLimit]);

  return (
    <>
      <NavBar />
      {salaryData.length > 0 &&
      salaryDataByRole.length > 0 &&
      salaryDataNoExp.length > 0 ? (
        <div
          className="container-fluid  d-lg-flex justify-content-center align-items-start 
         "
          style={{ padding: "0", marginTop: "90px" }}
        >
          <div
            className="container-fluid p-3 col-12 col-lg-3  reports-list scrollable-container"
            style={{
              overflowY: "scroll",
              maxHeight: "100vh",
              transform: "transition 0.3s all ease",
            }}
          >
            {/* <input className="form-control mb-3" placeholder="search" />
            <button
              onClick={() => navigate("/price-a-job")}
              className="btn btn-primary mb-3 w-100"
            >
              Get More Reports
            </button> */}
            {userPlan === "Premium" ? (
              <p>Unlimited Reports</p>
            ) : (
              <p>
                Remaining reports :{" "}
                {Math.max(reportLimit - dataArray.length, 0)}
              </p>
            )}

            <Modal visible={isModalVisible} footer={modalFooter}>
              <div>
                {/* <div className="mb-3  d-flex align-items-center">
                  <label className="col-3">Job title : </label>
                  <div className="col-8">
                    <Select
                      size={"large"}
                      showSearch
                      value={editableJobTitle}
                      onChange={handleSelectEditableJob}
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
                </div> */}

                <div className="mb-3  d-flex align-items-center">
                  <label className="col-3">Location : </label>
                  <div className="col-8">
                    <Select
                      size={"large"}
                      style={{
                        width: "100%",
                        borderRadius: "0",
                        textAlign: "start",
                      }}
                      className="input border"
                      showSearch
                      value={editableLocation}
                      defaultActiveFirstOption={false}
                      suffixIcon={null}
                      filterOption={false}
                      onSearch={handleSearch}
                      onChange={handleSelectEditableLocation}
                      notFoundContent={null}
                      options={(locationData || []).map((d) => ({
                        value: d,
                        label: d,
                      }))}
                    />
                  </div>
                </div>
                <div className="mb-3  d-flex align-items-center">
                  <label className="col-3">Experience : </label>
                  <div className="col-8">
                    <InputNumber
                      size={"large"}
                      placeholder="Years of experience"
                      style={{ width: "100%" }}
                      min={0} // Optional: Set a minimum value
                      max={100} // Optional: Set a maximum value
                      step={1} // Optional: Set the step increment/
                      value={editableExperience}
                      onChange={handleSelectEditableExperience}
                    />
                  </div>
                </div>

                <div className="mb-3  d-flex align-items-center">
                  <label className="col-3">Skills : </label>
                  <div className="col-8">
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
                      onChange={handleSelectEditableSkills}
                      notFoundContent={null}
                      value={editableSkills}
                    >
                      {(skillData || []).map((d) => (
                        <Option key={d} value={d}>
                          {CapitalizeFirstLetter(d)}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
            </Modal>
            <div>
              {dataArray && dataArray.length > 0 && (
                <Card
                  className={`card selectable-tab p-2 px-3 text-left mb-3 ${
                    activeIndex === 0 ? "selected-tab" : ""
                  }`}
                  key={dataArray[0]?.report_id}
                  onClick={() => {
                    setActiveIndex(0);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-content-center justify-content-between ">
                    <p
                      style={{ fontWeight: "500" }}
                      className="fw-b text-primary"
                    >
                      {dataArray[0]?.job_titles}
                    </p>

                    {isEditing ? (
                      <Popconfirm
                        title="Are you sure you want to save?"
                        onConfirm={handleChangeEdit}
                        okText="Yes"
                        cancelText="No"
                        placement="topRight" // Adjust the placement as needed
                      >
                        <div
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <SaveOutlined />{" "}
                        </div>
                      </Popconfirm>
                    ) : (
                      <Popconfirm
                        title="Are you sure you want to edit?"
                        onConfirm={handleChangeEdit}
                        okText="Yes"
                        cancelText="No"
                        placement="topRight" // Adjust the placement as needed
                      >
                        <div
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <EditOutlined />
                        </div>
                      </Popconfirm>
                    )}
                  </div>

                  <div className="d-flex justify-content-start align-items-center">
                    <p
                      className=" border-right px-2"
                      style={{
                        borderRight: "1px solid",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      <CalendarOutlined /> {editableExperience} years
                    </p>
                    <p
                      className=" border-right px-2"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      {" "}
                      <EnvironmentOutlined /> {editableLocation}
                    </p>
                  </div>

                  <CardActions disableSpacing>
                    <p style={{ margin: "0" }}>See More</p>
                    <ExpandMore
                      expand={expanded[0] || false}
                      onClick={() => handleExpandClick(0)}
                      aria-expanded={expanded[0] || false}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={expanded[0] || false}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div>
                      <SkillsList skills={JSON.parse(dataArray[0]?.skills)} />
                    </div>
                    <div>
                      <p>
                        Supervise employees :{" "}
                        <span style={{ fontSize: "14px" }}>
                          {dataArray[0]?.supervise}
                        </span>{" "}
                      </p>
                      <p>
                        Manage projects :{" "}
                        <span style={{ fontSize: "14px" }}>
                          {dataArray[0]?.manage}
                        </span>{" "}
                      </p>
                    </div>
                  </Collapse>
                </Card>
              )}
            </div>
            {dataArray.length > 1 ? (
              <button
                onClick={() => {
                  setShowPreviousReports(!showPreviousReports);

                  setActiveIndex(0);
                }}
                className="btn btn-primary mb-3 w-100"
              >
                {showPreviousReports
                  ? "Hide previous reports"
                  : "See previous reports"}
              </button>
            ) : (
              ""
            )}

            {showPreviousReports && (
              <div>
                {dataArray &&
                  dataArray.map((data, index) => {
                    // Check if the current index is not the first one (index 0)
                    if (index !== 0) {
                      return (
                        <Card
                          className={`card selectable-tab p-2 px-3 text-left mb-3 ${
                            activeIndex === index ? "selected-tab" : ""
                          }`}
                          key={data.report_id}
                          onClick={() => {
                            setActiveIndex(index);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <p
                            style={{ fontWeight: "500" }}
                            className="fw-b text-primary"
                          >
                            {data.job_titles}
                          </p>
                          <div className="d-flex justify-content-start align-items-center">
                            <p
                              className=" border-right px-2"
                              style={{
                                borderRight: "1px solid",
                                display: "flex",
                                alignItems: "center",
                                gap: "3px",
                              }}
                            >
                              <CalendarOutlined /> {data.experience} years
                            </p>
                            <p
                              className=" border-right px-2"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "3px",
                              }}
                            >
                              {" "}
                              <EnvironmentOutlined /> {data.location}
                            </p>
                          </div>

                          <CardActions disableSpacing>
                            <p>See More</p>
                            <ExpandMore
                              expand={expanded[index] || false}
                              onClick={() => handleExpandClick(index)}
                              aria-expanded={expanded[index] || false}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse
                            in={expanded[index] || false}
                            timeout="auto"
                            unmountOnExit
                          >
                            <div>
                              <SkillsList skills={JSON.parse(data.skills)} />
                            </div>
                            <div>
                              <p>
                                Supervise employees :{" "}
                                <span style={{ fontSize: "14px" }}>
                                  {data.supervise}
                                </span>{" "}
                              </p>
                              <p>
                                Manage projects :{" "}
                                <span style={{ fontSize: "14px" }}>
                                  {data.manage}
                                </span>{" "}
                              </p>
                            </div>
                          </Collapse>
                        </Card>
                      );
                    }
                    // If it's the first element, don't render anything or render something else.
                    return null; // or any other component/element you want
                  })}
              </div>
            )}
          </div>
          <div
            className="container-fluid col-12 col-lg-9  d-grid "
            style={{
              background: "rgba(0, 0, 0, 0.02)",
              height: "100vh",
              justifyItems: "center",
            }}
          >
            {isActiveIndexLimited ? (
              activeIndex > duplicateDataArray.length - (reportLimit + 1) ? (
                isReportReady ? (
                  <GeneratedReport
                    jobsData={salaryData}
                    location={dataArray[activeIndex].location}
                    experience={dataArray[activeIndex].experience}
                    jobsDataByRole={salaryDataByRole}
                    jobsDataNoExp={salaryDataNoExp}
                    selectedSkills={dataArray[activeIndex].skills}
                    skillsBool={filteredThroughSkill}
                  />
                ) : (
                  <div
                    style={{
                      height: "80vh",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <h3>
                      Your report is getting ready... <LoadingOutlined />{" "}
                    </h3>
                  </div>
                )
              ) : (
                <ReportLimitFallBack userPlan={userPlan} />
              )
            ) : // When isActiveIndexLimited is false, activeIndex condition doesn't apply
            isReportReady ? (
              <GeneratedReport
                jobsData={salaryData}
                location={dataArray[activeIndex].location}
                experience={dataArray[activeIndex].experience}
                jobsDataByRole={salaryDataByRole}
                jobsDataNoExp={salaryDataNoExp}
                selectedSkills={dataArray[activeIndex].skills}
                skillsBool={filteredThroughSkill}
              />
            ) : (
              <div
                style={{
                  height: "80vh",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <h3>
                  Your report is getting ready... <LoadingOutlined />{" "}
                </h3>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            className="container-fluid  d-lg-flex justify-content-center align-items-start 
         "
            style={{ padding: "0", marginTop: "90px" }}
          >
            <div
              className="container-fluid p-3 col-12 col-lg-3  reports-list scrollable-container"
              style={{
                overflowY: "scroll",
                maxHeight: "100vh",
                transform: "transition 0.3s all ease",
              }}
            >
              <div>
                <Card>
                  <div className="p-2">
                    <Skeleton active />
                  </div>
                </Card>
              </div>
            </div>
            <div
              className="container-fluid col-12 col-lg-9  d-grid "
              style={{
                background: "rgba(0, 0, 0, 0.02)",
                height: "100vh",
                justifyItems: "center",
              }}
            >
              <div
                className="container  col-lg-11 col-12 m-lg-3 m-2 p-1 text-left scrollable-container"
                style={{
                  background: "white",
                  height: "100vh",
                  overflowY: "scroll",
                }}
              >
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReportsPage;

import React, { useState, useEffect } from "react";
// import { Tabs } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
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
import { Skeleton } from "antd";

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

//eslint-disable-next-line
const GenerateSalaryValue = (originalData, storedExperience) => {
  if (originalData.length > 0) {
    // Function to calculate the "calculated salary" based on the stored experience
    const calculateCalculatedSalary = (
      experienceRange,
      salaryRange,
      storedExperience
    ) => {
      const [experienceStart, experienceEnd] = experienceRange
        .split(" ")[0]
        .split("-")
        .map(Number);

      const [salaryStart, salaryEnd] = salaryRange
        .split(" ")[0]
        .split("-")
        .map(Number);

      if (storedExperience === experienceStart) {
        console.log(
          "🚀 ~ file: index.js:58 ~ GenerateSalaryValue ~ salaryStart:",
          salaryStart
        );
        return salaryStart;
      } else if (storedExperience === experienceEnd) {
        return salaryEnd;
      } else if (
        storedExperience > experienceStart &&
        storedExperience < experienceEnd
      ) {
        const experienceRangeLength = experienceEnd - experienceStart;
        const salaryRangeLength = salaryEnd - salaryStart;
        const salaryPerYear = salaryRangeLength / experienceRangeLength;
        return (
          salaryStart + (storedExperience - experienceStart) * salaryPerYear
        );
      } else {
        return null; // Handle cases where storedExperience is not within the experience range
      }
    };

    // Modify the original 2D array to include "calculated salary"
    //eslint-disable-next-line
    const modifiedData = originalData.map((nestedArray) => {
      return nestedArray.map((item) => {
        const calculatedSalary = calculateCalculatedSalary(
          item.experience,
          item.salary,
          storedExperience
        );

        if (calculatedSalary !== null) {
          return {
            ...item,
            "calculated salary": calculatedSalary,
          };
        } else {
          // Handle cases where storedExperience is not within the experience range
          return item;
        }
      });
    });
  }
};

const ReportsPage = () => {
  const [salaryData, setSalaryData] = useState([]); // Store API responses here
  const [dataArray, setDataArray] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [salaryDataByRole, setSalaryDataByRole] = useState([]);
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

  let saveTheReport = sessionStorage.getItem("saveTheReport") || "true";
  const [activeIndex, setActiveIndex] = useState(0);

  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  // Create a new array by mapping the jobTitles array
  const CreateArr = () => {
    const newArr = storedJobTitles.map((jobTitle) => ({
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
    const createdArray = CreateArr();

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

        // Use Set to store distinct objects
        const uniqueObjects = new Set(
          [...createdArray, ...data].map(JSON.stringify)
        );

        // Convert Set back to an array of objects
        const distinctArray = [...uniqueObjects].map(JSON.parse);

        setDataArray(distinctArray);
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (saveTheReport === "true") {
      if (storedJobTitles && storedUserID) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        saveTheReport = "false";
        saveReport();
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
      const fetchResponses = async () => {
        const jobTitleResponses = await Promise.all(
          dataArray.map(async (data) => {
            const response = await AxiosInstance.post(
              "/api/salary/data/role",
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
          })
        );

        setSalaryDataByRole(jobTitleResponses);
      };

      fetchResponses();
    }

    //eslint-disable-next-line
  }, [dataArray]);

  useEffect(() => {
    if (dataArray && dataArray.length > 0) {
      const fetchResponses = async () => {
        const jobTitleResponses = await Promise.all(
          dataArray.map(async (data) => {
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
            return response.data;
          })
        );

        setSalaryData(jobTitleResponses);
        console.log(
          "🚀 ~ file: index.js:1240 ~ fetchResponses ~ jobTitleResponses:",
          jobTitleResponses
        );
      };

      fetchResponses();
    }

    //eslint-disable-next-line
  }, [dataArray]);

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

  // GenerateSalaryValue(salaryData, parseInt(storedExperience));
  return (
    <>
      <NavBar />
      {salaryData.length > 0 && salaryDataByRole.length > 0 ? (
        <div
          className="container-fluid  d-lg-flex justify-content-center align-items-start 
         "
          style={{ padding: "0", marginTop: "90px" }}
        >
          {/* <div
          className="container col-12 col-lg-2  side-bar border vh-5 vh-lg-100 "
          style={{ padding: "0" }}
        >
          <div className="container-fluid p-0 text-center">
            <Tabs
              style={{ width: "100%", textAlign: "center" }}
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Business",
                },
                {
                  key: "2",
                  label: "Personal",
                },
              ]}
            />
          </div>
          <div className="container-fluid d-none d-lg-block vh-100  p-0">
            <ul style={{ listStyle: "none", padding: "0" }}>
              <li className="p-3 border" style={{ background: "powderblue" }}>
                Reports
              </li>
            </ul>
          </div>
        </div> */}
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
            <div>
              {dataArray && dataArray.length > 0 && (
                <Card
                  className={`card selectable-tab p-2 px-3 text-left mb-3 ${
                    activeIndex === 0 ? "selected-tab" : ""
                  }`}
                  key={dataArray[0]?.report_id}
                  onClick={() => setActiveIndex(0)}
                  style={{ cursor: "pointer" }}
                >
                  <p
                    style={{ fontWeight: "500" }}
                    className="fw-b text-primary"
                  >
                    {dataArray[0]?.job_titles}
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
                      <CalendarOutlined /> {dataArray[0]?.experience} years
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
                      <EnvironmentOutlined /> {dataArray[0]?.location}
                    </p>
                  </div>

                  <CardActions disableSpacing>
                    <p>See More</p>
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
                          onClick={() => setActiveIndex(index)}
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
            {salaryData.length > 0 && salaryDataByRole.length > 0 ? (
              <GeneratedReport
                jobsData={salaryData[activeIndex]}
                location={dataArray[activeIndex].location}
                experience={dataArray[activeIndex].experience}
                jobsDataByRole={salaryDataByRole[activeIndex]}
                selectedSkills={dataArray[activeIndex].skills}
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
        <div
          className="container-fluid"
          style={{ padding: "0", marginTop: "90px" }}
        >
          {" "}
          <Skeleton active />
          <Skeleton active />
        </div>
      )}
    </>
  );
};

export default ReportsPage;

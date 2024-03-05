import React, { useState, useEffect } from "react";
// import { Tabs } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Modal, Popconfirm, Select, Skeleton } from "antd";
import { cities, experienceOptions } from "./input";
import { useLocation, useNavigate } from "react-router-dom";
import GeneratedReport from "./report";
import AxiosInstance from "../../config/axios";
import NavBar from "../layout/nav-bar";
import ReportLimitFallBack from "../misc/report-limit-fallback";
import { formatColumnName } from "../../utils/price-a-job-helper-functions";
import {
  login_app_path,
  price_a_job_input_path,
  price_a_job_profile_threshold,
} from "../../config/constant";

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



const ReportsPage = ({ userPlan }) => {
  const [salaryData, setSalaryData] = useState([]); // Store API responses here
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
  const storedSector = sessionStorage.getItem("sector");
  const storedManage = sessionStorage.getItem("isManage");
  const storedUserID = localStorage.getItem("user_id");
  const [showPreviousReports, setShowPreviousReports] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableExperience, setEditableExperience] = useState("");
  const [editableSector, setEditableSector] = useState("");
  const [editableLocation, setEditableLocation] = useState("");
  const [editableJobTitle, setEditableJobTitle] = useState("");
  const [editableSkills, setEditableSkills] = useState([]);
  const [currentReportID, setCurrentReportID] = useState("");
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
  const [sectorsOption, setSectorsOption] = useState([]);
  const [reportLimit, setReportLimit] = useState(1); // Default to 1 report for Basic users
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();
  const navigate = useNavigate();
  const locationURL = window.location.href;
  const userID = localStorage.getItem("user_id");
  const pathLocation = useLocation();
  const path = pathLocation.pathname;
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
    const newArr = storedJobTitles?.map((jobTitle) => ({
      job_titles: jobTitle,
      location: storedLocation,
      experience: storedExperience,
      skills: sessionStorage.getItem("selected_skills"),
      manage: storedManage,
      supervise: storedSupervise,
      sector: storedSector,
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
          token: `Bearer ${accessToken}`,
        },
      }
    )
      .then(async (response) => {
        const data = await response.data;

        if (response.status === 403 || response.status === 401)
          return navigate(login_app_path+`?p=${path}`);
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
        setEditableExperience(distinctArray[0].experience);
        setEditableSkills(JSON.parse(distinctArray[0].skills));
        setCurrentReportID(distinctArray[0].report_id);
        setEditableSector(distinctArray[0].sector);
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (location.pathname === "/reports#dashboard") {
      return;
    } else {
      if (saveTheReport === "true") {
        if (storedJobTitles) {
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

          formData.append("job_titles", jobTitle);
          formData.append("experience", storedExperience);
          formData.append("skills", JSON.stringify(storedSkills));
          formData.append("location ", storedLocation);
          formData.append("manage", storedManage);
          formData.append("supervise", storedSupervise);
          formData.append("sector", storedSector);

          const response = await AxiosInstance.post(
            "/api/report/save",
            formData,
            {
              headers: {
                "Content-Type": "application/json",
                token: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.status === 403 || response.status === 401)
            return navigate(login_app_path+`?p=${path}`);
        })
      );

      sessionStorage.setItem("saveTheReport", "false"); // Mark report as saved in localStorage
    }
  };
  const updateReport = () => {
    const formData = new FormData();

    formData.append("experience", editableExperience);
    formData.append("skills", JSON.stringify(editableSkills));
    formData.append("location ", editableLocation);
    formData.append("sector", editableSector);
    formData.append("id", currentReportID);

    AxiosInstance.post("api/report/update", formData, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${accessToken}`,
      },
    })
      .then(async (res) => {
        const response = await res.data;
        console.log("🚀 ~ updateReport ~ response:", response);
      })
      .catch((err) => console.log(err));
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
              threshold: price_a_job_profile_threshold,
              sector: data.sector,
            },
            {
              headers: {
                "content-type": "application/json",
                token: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.status === 403 || response.status === 401)
            return navigate(login_app_path+`?p=${path}`);

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
            "/api/salary/data/no-location",
            {
              job_title: data.job_titles,
              skills: JSON.parse(data.skills),
              experience: data.experience,
              threshold: price_a_job_profile_threshold,
              sector: data.sector,
            },
            {
              headers: {
                "content-type": "application/json",
                token: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.status !== 200) return navigate(login_app_path+`?p=${path}`);
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
              "/api/salary/data/no-experience",
              {
                job_title: data.job_titles,
                skills: JSON.parse(data.skills),
                threshold: price_a_job_profile_threshold,
                sector: data.sector,
              },
              {
                headers: {
                  "content-type": "application/json",
                  token: `Bearer ${accessToken}`,
                },
              }
            );
            if (response.status === 403 || response.status === 401)
              return navigate(login_app_path+`?p=${path}`);
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
        sector: editableSector,
      };

      // Update the first element of dataArray with the edited report
      const updatedDataArray = [...dataArray];
      updatedDataArray[0] = editedReport;

      // Update the state with the modified dataArray
      setDataArray(updatedDataArray);
    }
  };
  // useEffect(() => {

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

  const handleEditableSectorSearch = (newValue) => {
    const filter = sectorsOption.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );
    sectorsOption(filter);
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
            token: `Bearer ${accessToken}`,
          },
        }
      )
        .then(async (response) => {
          const retrievedSkillsData = await response.data;
          if (response.status !== 200) return navigate(login_app_path+`?p=${path}`);
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
  }, [editableJobTitle, accessToken, navigate,path]);

  useEffect(() => {
    if (dataArray.length > 0) {
      AxiosInstance.post(
        "/api/salary/sectors",
        {
          title: dataArray[activeIndex]?.job_titles,
        },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      )
        .then(async (res) => {
          const response = await res.data;

          if (res.status === 403 || res.status === 401)
            return navigate(login_app_path+`?p=${path}`);
          const sectors = response.map((item) => Object.values(item)[0]);

          // Create a new Set to store unique values
          const uniqueSet = new Set(sectors);
          // Convert the Set back to an array, sort it, and remove "unclassified" if present
          const uniqueArray = Array.from(uniqueSet)
            .filter((sector) => sector !== "Nan")
            .sort();

          setSectorsOption(uniqueArray);
        })
        .catch((err) => console.log(err));
    }

    //eslint-disable-next-line
  }, [dataArray]);

  const modalFooter = (
    <div>
      <Button
        type="primary"
        onClick={() => {
          handleChangeEdit();
          updateReport();
        }}
      >
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
      {salaryData && salaryDataByRole && salaryDataNoExp ? (
        <div
          className="container-fluid   d-lg-flex justify-content-center align-items-start 
         "
          style={{
            padding: "0",
            marginTop: "90px",
          }}
        >
          <div
            className="container-fluid p-3 col-12 col-lg-3  reports-list "
            style={{
              transform: "transition 0.3s all ease",
            }}
          >
            {userPlan === "Premium" ? (
              <p>Unlimited Reports</p>
            ) : (
              <p>
                Remaining reports :{" "}
                {Math.max(reportLimit - dataArray.length, 0)}
              </p>
            )}
            <Modal
              closable={false}
              visible={isModalVisible}
              footer={modalFooter}
            >
              <div>
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
                      value={editableExperience}
                      onChange={handleSelectEditableExperience}
                      notFoundContent={null}
                      options={(experienceOptions || []).map((e) => ({
                        value: e,
                        label: e,
                      }))}
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
                <div className="mb-3 d-flex align-items-center">
                  <label className="col-3">Sector : </label>
                  <div className="col-8 d-flex">
                    <Select
                      size={"large"}
                      style={{
                        width: "100%",
                        borderRadius: "0",
                        textAlign: "start",
                      }}
                      value={editableSector}
                      className="input border"
                      showSearch
                      placeholder="Sector"
                      defaultActiveFirstOption={false}
                      suffixIcon={null}
                      filterOption={false}
                      onSearch={handleEditableSectorSearch}
                      onChange={(value) => setEditableSector(value)}
                      notFoundContent={null}
                      options={[
                        { value: "", label: "Select Sector", disabled: true }, // Add this line for the empty and disabled option
                        ...(sectorsOption || []).map((d) => ({
                          value: d,
                          label: CapitalizeFirstLetter(d),
                        })),
                      ]}
                    />
                    <p
                      className="bg-primary text-light m-0 text-center ml-1 p-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => setEditableSector("")}
                    >
                      X
                    </p>
                  </div>
                </div>
              </div>
            </Modal>
            <a href={price_a_job_input_path}>
              {" "}
              <button className="btn btn-dark  w-100 mb-3">
                Generate more reports
              </button>
            </a>

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
            <div
              className="scrollable-container"
              style={{
                overflowY: "scroll",
                maxHeight: "50vh",
              }}
            >
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
                              <p style={{ margin: "0" }}>See More</p>
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
          </div>
          <div
            className="container-fluid col-12 col-lg-9  d-grid "
            style={{
              background: "rgba(0, 0, 0, 0.02)",

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

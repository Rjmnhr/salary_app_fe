import React, { useState, useEffect } from "react";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Modal, Popconfirm, Select } from "antd";
import { useLocation } from "react-router-dom";
import PayPulseReportComponent from "./report";
import NavBar from "../layout/nav-bar";
import {
  pay_pulse_dashboard_path,
  pay_pulse_input_path,
} from "../../config/constant";
import { demoData } from "./demo-data";

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

const PayPulseOutputDemo = ({ userPlan }) => {
  const [dataArray, setDataArray] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [showPreviousReports, setShowPreviousReports] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableExperience, setEditableExperience] = useState("");
  const [editableSector, setEditableSector] = useState("");
  const [editableLocation, setEditableLocation] = useState("");
  const [editableJobTitle, setEditableJobTitle] = useState("");
  const [editableSkills, setEditableSkills] = useState([]);
  const [activeIndex, setActiveIndex] = useState(
    parseInt(sessionStorage.getItem("activeIndex")) || 0
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [skillData, setSkillData] = useState([]);
  const { Option } = Select;
  const [reportLimit, setReportLimit] = useState(1); // Default to 1 report for Basic users
  const userInputOptions = JSON.parse(sessionStorage.getItem("input-options"));
  const [locationOptions, setLocationOptions] = useState(
    userInputOptions?.locationOptions
  );
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  //eslint-disable-next-line
  const [inDashboard, setInDashboard] = useState(false);
  const [validatedExpInputs, setValidatedExpInputs] = useState(
    userInputOptions?.experienceOptions || []
  );
  const [validatedSectorInputs, setValidatedSectorInputs] = useState(
    userInputOptions?.sectorsOptions || []
  );

  useEffect(() => {
    if (location.pathname === pay_pulse_dashboard_path) {
      setInDashboard(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Fetch the user's subscription plan and set the report limit accordingly
    if (userPlan === "Standard") {
      setReportLimit(6);
    } else if (userPlan === "Premium") {
      setReportLimit(Infinity); // Unlimited reports
    }
  }, [userPlan]);

  useEffect(() => {
    // Cleanup function to be executed when leaving the component
    return () => {
      // Remove items from session storage
      sessionStorage.removeItem("activeIndex");

      // Add more items as needed
    };
  }, []); // The empty dependency array ensures that the cleanup function runs only once on component unmount

  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

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
      // Create a new report object with the edited values
      const editedReport = {
        title: editableJobTitle,
        location: editableLocation,
        experience: editableExperience,
        skills: JSON.stringify(editableSkills),
        manage: "",
        supervise: "",
        sector: editableSector,
        title_id: dataArray[activeIndex].title_id,
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
    const filter = userInputOptions?.locationOptions.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );
    setLocationOptions(filter);
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

  const handleEditableSectorSearch = (newValue) => {
    const filter = validatedSectorInputs.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );
    setValidatedSectorInputs(filter);
  };

  const modalFooter = (
    <div>
      <Button
        type="primary"
        onClick={() => {
          handleChangeEdit();
        }}
      >
        Save
      </Button>
    </div>
  );

  return (
    <>
      <NavBar />
      <div
        className="container-fluid d-lg-flex justify-content-center align-items-start 
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
              Remaining reports : {Math.max(reportLimit - dataArray.length, 0)}
            </p>
          )}
          <Modal closable={false} visible={isModalVisible} footer={modalFooter}>
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
                    options={(locationOptions || []).map((d) => ({
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
                    options={(validatedExpInputs || []).map((e) => ({
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
              {validatedSectorInputs?.length > 0 && (
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
                        ...(validatedSectorInputs || []).map((d) => ({
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
              )}
            </div>
          </Modal>
          <a href={pay_pulse_input_path}>
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
                  sessionStorage.setItem("activeIndex", 0);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-content-center justify-content-between ">
                  <p
                    style={{ fontWeight: "500" }}
                    className="fw-b text-primary"
                  >
                    {dataArray[0]?.title}
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
                    onClick={() => {
                      handleExpandClick(0);
                      setIsExpanded(!isExpanded);
                    }}
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
                  <div></div>
                </Collapse>
              </Card>
            )}
          </div>
          {dataArray.length > 1 ? (
            <button
              onClick={() => {
                setShowPreviousReports(!showPreviousReports);

                setActiveIndex(0);
                sessionStorage.setItem("activeIndex", 0);
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
              maxHeight: isExpanded ? "30vh" : "45vh",
            }}
          >
            {showPreviousReports && (
              <div>
                {dataArray
                  ? dataArray.map((data, index) => {
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
                              sessionStorage.setItem("activeIndex", index);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <p
                              style={{ fontWeight: "500" }}
                              className="fw-b text-primary"
                            >
                              {data.title}
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
                              <div></div>
                            </Collapse>
                          </Card>
                        );
                      }
                      // If it's the first element, don't render anything or render something else.
                      return null; // or any other component/element you want
                    })
                  : "Loading...."}
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
          <PayPulseReportComponent
            demoData={demoData}
            demoDataNoExp={demoData}
            skillsBool={true}
          />
        </div>
      </div>
    </>
  );
};

export default PayPulseOutputDemo;

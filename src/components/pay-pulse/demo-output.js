import React, { useState, useEffect } from "react";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import Card from "@mui/material/Card";
import { Button, Modal, Popconfirm, Select } from "antd";
import NavBar from "../layout/nav-bar";
import { pay_pulse_input_path } from "../../config/constant";
import { demoData } from "./demo-data";
import PayPulseReportComponentDemo from "./demo-report";
import { useApplicationContext } from "../../context/app-context";

const PayPulseOutputDemo = ({ userPlan }) => {
  const userInputOptions = JSON.parse(sessionStorage.getItem("input-options"));
  const storedUserInputs = JSON.parse(sessionStorage.getItem("user-inputs"));
  const [isEditing, setIsEditing] = useState(false);
  const [editableExperience, setEditableExperience] = useState("");
  const [editableTitle, setEditableTitle] = useState("");
  const { userData } = useApplicationContext();
  const [editableSector, setEditableSector] = useState(
    storedUserInputs?.sector
  );
  const [editableLocation, setEditableLocation] = useState("");
  const [editableSkills, setEditableSkills] = useState(
    JSON.parse(storedUserInputs?.skills) || []
  );
  const [activeIndex, setActiveIndex] = useState(
    parseInt(sessionStorage.getItem("activeIndex")) || 0
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;
  //eslint-disable-next-line
  const [reportLimit, setReportLimit] = useState(1); // Default to 1 report for Basic users
  const [locationOptions, setLocationOptions] = useState(
    userInputOptions?.locationOptions
  );
  const [titleOptions, setTitleOptions] = useState(
    userInputOptions?.titleOptions
  );
  //eslint-disable-next-line
  const [expOptions, setExpOptions] = useState(
    userInputOptions?.experienceOptions
  );

  const [skillsOptions, setSkillsOptions] = useState(
    userInputOptions?.skills ? JSON.parse(userInputOptions?.skills) : []
  );
  const parsedSkills = userInputOptions?.skills
    ? JSON.parse(userInputOptions?.skills)
    : [];
  //eslint-disable-next-line
  const [sectorOptions, setSectorOptions] = useState([]);
  const [filteredDemoData, setFilteredDemoData] = useState([]);
  const [filteredDemoDataNoLoc, setFilteredDemoDataNoLoc] = useState([]);
  const [filteredDemoDataNoExp, setFilteredDemoDataNoExp] = useState([]);
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

  function SkillsList({ skills }) {
    return (
      <div>
        <p>
          <span>Skills :</span>{" "}
          <span style={{ fontSize: "14px" }}> {skills.join(", ")}</span>
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

      const filteredData = demoData.filter(
        (item) =>
          item.Title === editableTitle &&
          item.Experience === editableExperience &&
          item.location === editableLocation &&
          item.Industry === editableSector
      );

      const filteredDataNoLoc = demoData.filter(
        (item) =>
          item.Title === editableTitle &&
          item.Experience === editableExperience &&
          item.location === "Across India" &&
          item.Industry === editableSector
      );
      const filteredDataNoExp = demoData.filter(
        (item) =>
          item.Title === editableTitle &&
          item.location === editableLocation &&
          item.Industry === editableSector
      );

      setFilteredDemoData(filteredData);
      setFilteredDemoDataNoLoc(filteredDataNoLoc);
      setFilteredDemoDataNoExp(filteredDataNoExp);
      setEditableTitle(filteredData[0]?.Title);
      setEditableExperience(filteredData[0]?.Experience);
      setEditableLocation(filteredData[0]?.location);
    }
  };
  // useEffect(() => {

  const handleSearch = (newValue) => {
    const filter = userInputOptions?.locationOptions.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );
    setLocationOptions(filter);
  };
  const handleTitleSearch = (newValue) => {
    const filter = userInputOptions?.titleOptions.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );
    setTitleOptions(filter);
  };

  const handleSelectEditableLocation = (value) => {
    setEditableLocation(value);
  };

  const handleSelectEditableTitle = (value) => {
    setEditableTitle(value);
  };
  const handleSelectEditableExperience = (value) => {
    setEditableExperience(value);
  };
  const handleSelectEditableSkills = (value) => {
    setEditableSkills(value);
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

  useEffect(() => {
    if (storedUserInputs) {
      const filteredData = demoData.filter(
        (item) =>
          item.Title === storedUserInputs.title &&
          item.Experience === storedUserInputs.experience &&
          item.location === storedUserInputs.location &&
          item.Industry === storedUserInputs.sector
      );

      const filteredDataNoLoc = demoData.filter(
        (item) =>
          item.Title === storedUserInputs.title &&
          item.Experience === storedUserInputs.experience &&
          item.location === "Across India" &&
          item.Industry === storedUserInputs.sector
      );

      const filteredDataNoExp = demoData.filter(
        (item) =>
          item.Title === storedUserInputs.title &&
          item.location === storedUserInputs.location &&
          item.Industry === storedUserInputs.sector
      );

      setFilteredDemoData(filteredData);
      setFilteredDemoDataNoLoc(filteredDataNoLoc);
      setFilteredDemoDataNoExp(filteredDataNoExp);
      setEditableTitle(filteredData[0]?.Title);
      setEditableExperience(filteredData[0]?.Experience);
      setEditableLocation(filteredData[0]?.location);
    }
    //eslint-disable-next-line
  }, []);

  const handleSkillsSearch = (newValue) => {
    const filter = parsedSkills?.filter((data) =>
      data?.toLowerCase().includes(newValue.toLowerCase())
    );
    setSkillsOptions(filter);
  };

  useEffect(() => {
    const filteredArray = demoData.filter((item) =>
      item.Title.includes(editableTitle)
    );

    const uniqueIndustry = [
      ...new Set(filteredArray.map((item) => item.Industry)),
    ];

    setSectorOptions(uniqueIndustry);
    setEditableSector(uniqueIndustry[0]);
  }, [editableTitle]);
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
          <Modal closable={false} visible={isModalVisible} footer={modalFooter}>
            <div>
              <div className="mb-3  d-flex align-items-center">
                <label className="col-3">Job title : </label>
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
                    value={editableTitle}
                    defaultActiveFirstOption={false}
                    suffixIcon={null}
                    filterOption={false}
                    onSearch={handleTitleSearch}
                    onChange={handleSelectEditableTitle}
                    notFoundContent={null}
                    options={(titleOptions || []).map((d) => ({
                      value: d,
                      label: d,
                    }))}
                  />
                </div>
              </div>
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
                    options={(expOptions || []).map((e) => ({
                      value: e,
                      label: e,
                    }))}
                  />
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
                    placeholder="Sector"
                    defaultActiveFirstOption={false}
                    suffixIcon={null}
                    filterOption={false}
                    onChange={(value) => setEditableSector(value)}
                    notFoundContent={null}
                    options={[
                      { value: "", label: "Select Sector", disabled: true }, // Add this line for the empty and disabled option
                      ...sectorOptions?.map((d) => ({
                        value: d,
                        label: CapitalizeFirstLetter(d),
                      })),
                    ]}
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
                    onSearch={handleSkillsSearch}
                    notFoundContent={null}
                    value={editableSkills}
                  >
                    {skillsOptions?.map((d) => (
                      <Option key={d} value={d}>
                        {d}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </Modal>
          <a href={pay_pulse_input_path}>
            {" "}
            <button className="btn btn-dark  w-100 mb-3">
              Generate more reports
            </button>
          </a>

          <div>
            <Card
              className={`card selectable-tab p-2 px-3 text-left mb-3 ${
                activeIndex === 0 ? "selected-tab" : ""
              }`}
              onClick={() => {
                setActiveIndex(0);
                sessionStorage.setItem("activeIndex", 0);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-content-center justify-content-between ">
                <p className="fw-b text-primary">{editableTitle}</p>

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
                ) : userData?.user_type === "demo" ? (
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
                ) : (
                  ""
                )}
              </div>

              <div>
                <p>Experience : {editableExperience} years</p>
                <p> Location : {editableLocation}</p>
                <p> Sector : {editableSector}</p>
              </div>
              <div>
                {editableSkills?.length > 0 && (
                  <SkillsList skills={editableSkills} />
                )}
              </div>
            </Card>
          </div>
        </div>
        <div
          className="container-fluid col-12 col-lg-9  d-grid "
          style={{
            background: "rgba(0, 0, 0, 0.02)",

            justifyItems: "center",
          }}
        >
          <PayPulseReportComponentDemo
            demoData={filteredDemoData}
            demoDataNoLoc={filteredDemoDataNoLoc}
            demoDataNoExp={filteredDemoDataNoExp}
            skillsArray={editableSkills}
            skillsBool={true}
          />
        </div>
      </div>
    </>
  );
};

export default PayPulseOutputDemo;

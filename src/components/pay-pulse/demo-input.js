import React, { useEffect, useState } from "react";

import "./custom-style.css";
import { useNavigate } from "react-router-dom";
import { Input, Select, Tag, Modal } from "antd";
import { CapitalizeFirstLetter } from "../../utils/price-a-job-helper-functions";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useApplicationContext } from "../../context/app-context";
import { demoData } from "./demo-data";
import { api_pay_pulse_saveActivity_demo } from "../../config/config";
import AxiosInstance from "../../config/axios";

const PayPulseInputDemo = ({ prevReports }) => {
  const [availableTitles, setAvailableTitles] = useState([]);
  const [availableTitlesFetched, setAvailableTitlesFetched] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [topSkills, setTopSkills] = useState([]);
  const [sector, setSector] = useState(null);
  const [initialTopSkills, setInitialTopSkills] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [validatedCityInputs, setValidatedCityInputs] = useState([]);
  const [validatedExpInputs, setValidatedExpInputs] = useState([]);
  const [validatedSectorInputs, setValidatedSectorInputs] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [isTrailModalVisible, setIsTrailModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  sessionStorage.setItem("report-updated", false);
  sessionStorage.removeItem("activeIndex");
  sessionStorage.removeItem("saveTheReport");

  const [modalVisible, setModalVisible] = useState(false);
  const { isMobile, userData } = useApplicationContext();

  const closeTrialModal = () => {
    setIsTrailModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTitle(null);
  };

  const handleTitleSearch = (searchValue) => {
    const filter = availableTitlesFetched.filter((data) => {
      // Check if the titles property of the current object includes the searchValue
      return data.titles.toLowerCase().includes(searchValue.toLowerCase());
    });

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
    // Filter elements from topSkills that do not exist in selectedSkills
    const filteredTopSkills = topSkills.filter(
      (skill) => !selectedSkills.includes(skill)
    );

    setTopSkills(filteredTopSkills);
    //eslint-disable-next-line
  }, [selectedSkills]);

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

  const handleSelectTitle = (title) => {
    setSelectedTitle(title);
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

  const handleSkillButtonClick = (skill) => {
    // Add the selected skill to the Select input
    setSelectedSkills([...selectedSkills, skill]);
    // Remove the skill from topSkills
    setSkillData(skillData.filter((s) => s !== skill));
    setTopSkills(topSkills.filter((s) => s !== skill?.toLowerCase()));
  };

  const handleSubmit = (e) => {
    if (prevReports?.length > 0) {
      setIsTrailModalVisible(true);
      return;
    }
    setIsLoading(true);
    e.preventDefault();
    const reportID = Date.now() + Math.floor(Math.random() * 1000);

    sessionStorage.setItem(
      "user-inputs",
      JSON.stringify({
        experience: experience,
        location: location,
        title: selectedTitle,
        skills: JSON.stringify(selectedSkills),
        sector: sector,
      })
    );
    sessionStorage.setItem(
      "input-options",
      JSON.stringify({
        titleOptions: availableTitles,
        experienceOptions: validatedExpInputs,
        locationOptions: validatedCityInputs,
        skills: JSON.stringify(initialTopSkills),
        sector: validatedSectorInputs,
      })
    );

    if (userData?.user_type === "user") {
      saveReport(reportID);
    }

    navigate("/reports");
  };

  useEffect(() => {
    const uniqueTitles = [...new Set(demoData.map((item) => item.Title))];

    setAvailableTitles(uniqueTitles);
    setAvailableTitlesFetched(uniqueTitles);
  }, []);

  useEffect(() => {
    const filteredArray = demoData.filter((item) =>
      item.Title.includes(selectedTitle)
    );
    const filteredLocArray = demoData.filter(
      (item) =>
        item.Title.includes(selectedTitle) && item.location !== "Across India"
    );
    const uniqueLoc = [
      ...new Set(filteredLocArray.map((item) => item.location)),
    ];
    const uniqueExp = [
      ...new Set(filteredArray.map((item) => item.Experience)),
    ];
    const uniqueIndustry = [
      ...new Set(filteredArray.map((item) => item.Industry)),
    ];
    const uniqueSkills = [
      ...new Set(
        filteredArray.flatMap((item) => item.skills.map((skill) => skill.skill))
      ),
    ];

    setValidatedCityInputs(uniqueLoc);
    setValidatedExpInputs(uniqueExp);
    setTopSkills(uniqueSkills);
    setInitialTopSkills(uniqueSkills);
    setValidatedSectorInputs(uniqueIndustry);
  }, [selectedTitle]);

  const saveReport = async (reportID) => {
    const formData = new FormData();

    formData.append("title", selectedTitle);
    formData.append("experience", experience);
    formData.append("skills", JSON.stringify(selectedSkills));
    formData.append("location ", location);
    formData.append("sector", sector);
    formData.append("report_id", reportID);

    AxiosInstance.post(api_pay_pulse_saveActivity_demo, formData, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${accessToken}`,
      },
    })
      .then(async (res) => {
        const response = await res.data;
        if (response.status === 200) {
          navigate("/reports");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div>
        <div className="container-fluid">
          <h2 className="fs-2 mt-3">PayPulse</h2>
          <h5 className="mt-3">
            Let's start building a profile with compensable factors to benchmark
            jobs.
          </h5>

          <p className="text-primary">
            Options will be populated based on the availability of the data
          </p>
          <div
            className="w-100 mt-5"
            style={{ display: "grid", placeItems: "center" }}
          >
            <div className={`mb-3 col-12 col-lg-8`}>
              <Select
                size={"large"}
                showSearch
                placeholder="Job Title"
                value={selectedTitle}
                onChange={(value, option) => handleSelectTitle(value)}
                onSearch={handleTitleSearch}
                style={{
                  width: "100%",
                  borderRadius: "3px",
                  textAlign: "start",
                }}
                options={(availableTitles || []).map((item) => ({
                  value: item,
                  label: item,
                }))}
                className="border text-start"
              />
            </div>

            <DataAlertModal
              visible={modalVisible}
              onClose={closeModal}
              title={selectedTitle}
            />

            <div className={`mb-3 col-12 col-lg-8 `}>
              <Select
                size={"large"}
                style={{
                  width: "100%",
                  borderRadius: "0",
                  textAlign: "start",
                }}
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
                disabled={selectedTitle ? false : true}
              />
            </div>

            <div className={`mb-3 col-12 col-lg-8 `}>
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
                optionLabelProp="label"
                disabled={selectedTitle ? false : true}
              >
                {validatedExpInputs.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div className={`mb-3 col-12 col-lg-8  `}>
              <Select
                mode="multiple"
                size={"large"}
                style={{
                  width: "100%",
                  borderRadius: "0",
                  textAlign: "start",
                }}
                className="input border"
                placeholder="Important skills"
                defaultActiveFirstOption={false}
                suffixIcon={null}
                filterOption={false}
                onChange={handleSkillSelectChange}
                notFoundContent={null}
                value={selectedSkills}
                disabled={selectedTitle ? false : true}
              ></Select>
            </div>

            {selectedTitle &&
              (topSkills.length > 0 ? (
                <>
                  <div
                    style={{ transition: " all 0.3s ease" }}
                    className={`d-flex col-12 col-lg-8 flex-wrap justify-content-start align-items-center mt-1 mb-2`}
                  >
                    {topSkills.map((skill, index) => {
                      return (
                        <Tag
                          onClick={() => handleSkillButtonClick(skill)}
                          key={index}
                          className=" skill-btn  m-1 "
                        >
                          {skill}
                        </Tag>
                      );
                    })}
                  </div>
                </>
              ) : (
                ""
              ))}

            {validatedSectorInputs.length > 0 && (
              <div className={`mb-3 col-12 col-lg-8 `}>
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
                  disabled={selectedTitle ? false : true}
                />
              </div>
            )}

            <div className={`mb-3 col-12 col-lg-8 `}>
              <Input
                placeholder="Any other skills or additional information"
                allowClear
                disabled={
                  selectedTitle && location && experience ? false : true
                }
              />
            </div>
          </div>
          <div className="mb-3">
            <button
              onClick={handleSubmit}
              type="submit"
              className={`btn btn-primary  mt-3 mb-3  shadow ${
                isMobile ? "w-75" : "w-25 "
              } `}
              disabled={
                !(
                  selectedTitle &&
                  location &&
                  experience &&
                  sector &&
                  selectedSkills?.length > 0
                )
              }
            >
              {isLoading ? (
                <span>
                  Generate Report <LoadingOutlined />
                </span>
              ) : (
                "Generate Report"
              )}
            </button>
          </div>
        </div>
      </div>
      <TrialEndedModalContainer
        visible={isTrailModalVisible}
        onClose={closeTrialModal}
      />
    </>
  );
};

export default PayPulseInputDemo;

const DataAlertModal = ({ visible, onClose, title }) => {
  return (
    <Modal visible={visible} onCancel={onClose} footer={null} centered>
      <div className="p-3">
        <div style={{ display: "grid", placeItems: "center" }} className="mb-3">
          <ExclamationCircleOutlined
            style={{ fontSize: "30px", color: "orange" }}
          />
        </div>

        <p>
          Sorry, there isn't enough data for {title} at the moment. We're
          working on gathering more information. Please check back soon or
          select a different job role.
        </p>
      </div>
    </Modal>
  );
};

const TrialEndedModalContainer = ({ visible, onClose }) => {
  const navigate = useNavigate();
  return (
    <Modal visible={visible} centered footer={null} onCancel={onClose}>
      <div className="text-center">
        <img
          width={60}
          src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1713340051/warning_hrr1ip.png"
          alt=""
          className="mb-3"
        />
        <h5>Your free trial has ended</h5>
        <p>
          Please contact us to discuss our packages and upgrade your account.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/contact")}
        >
          Contact now
        </button>
      </div>
    </Modal>
  );
};

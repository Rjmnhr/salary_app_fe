import React, { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import { InputNumber, Select } from "antd";
// import TagInput from "../../components/skill-input";
import { Radio } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const educationItems = [
  {
    value: "No degree",
    label: "No degree",
  },
  {
    value: "Associates",
    label: "Associates",
  },
  {
    value: "Bachelors",
    label: "Bachelors",
  },
  {
    value: "High School Diploma or GED ",
    label: "High School Diploma or GED ",
  },
  {
    value: "Non-Degree Certificate Program",
    label: "Non-Degree Certificate Program",
  },
  {
    value: "Masters Degree (non-MBA)",
    label: "Masters Degree (non-MBA)",
  },
  {
    value: "Master of Business Administration (MBA)",
    label: "Master of Business Administration (MBA)",
  },
  {
    value: "Law Degree (JD, LLM)",
    label: "Law Degree (JD, LLM)",
  },
  {
    value: "Doctorate (PhD)",
    label: "Doctorate (PhD)",
  },
  {
    value: "Health Professional Doctorate (MD, DMD, DVM, DPT, etc.)",
    label: "Health Professional Doctorate (MD, DMD, DVM, DPT, etc.)",
  },
];

const AddDetails = () => {
  const [isSupervise, setIsSupervise] = useState(false);
  //eslint-disable-next-line
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [data, setData] = useState([]);
  const [skillSet, setSkillSet] = useState([]);
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();

  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    checkbox8: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes({
      ...checkboxes,
      [name]: checked,
    });
  };

  // const filteredOptions = skillSet.filter(
  //   (o) => !selectedJobTitles.includes(o)
  // );

  const handleSearch = (newValue) => {
    const filter = skillSet.filter((data) =>
      data.toLowerCase().includes(newValue.toLowerCase())
    );
    setData(filter);
  };
  const handleSelectChange = (value) => {
    setSelectedSkills(value);
  };

  useEffect(() => {
    axios
      .post(
        "https://auth.emsicloud.com/connect/token",
        {
          client_id: "bdqzoc3y3d36h59j",
          client_secret: "W4KYdc2L",
          grant_type: "client_credentials",
          scope: "emsi_open",
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        getSkills(response.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getSkills = (accessToken) => {
    axios
      .get("https://emsiservices.com/skills/versions/latest/skills", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        const skillArr = response.data.data;
        const skillNamesArr = skillArr.map((item) => item.name);
        setSkillSet(skillNamesArr);
        setData(skillNamesArr);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleSubmit = () => {};

  return (
    <>
      <NavBar />
      <div
        className="container-fluid  "
        style={{ background: "gainsboro", height: "100vh", marginTop: "80px" }}
      >
        <div
          className="container main-container px-5 col-12 col-lg-8 "
          style={{
            background: "white",
            height: "100vh",
            overflowY: "scroll",
            display: "grid",
            placeItems: "center",
          }}
        >
          <p className="mb-3">
            We looks at lots of compensable factors to benchmark jobs.
          </p>

          <form
            className="mt-5 text-left col-12"
            style={{ display: "grid", placeItems: "center" }}
            onSubmit={handleSubmit}
          >
            <div className="mb-3 col-12 col-lg-12">
              <label>
                Minimum years of experience to be fully proficient for this role
              </label>

              <InputNumber
                size={"large"}
                placeholder="Enter"
                style={{ width: "100%" }}
                min={0} // Optional: Set a minimum value
                max={100} // Optional: Set a maximum value
                step={1} // Optional: Set the step increment/
                onClick={(e) => setExperience(e.target.value)}
                required
              />
            </div>

            {/* <div className="mb-3 col-12 col-lg-12">
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
                required
              />
            </div> */}

            <div className="mb-3 col-12 col-lg-12">
              <label>
                Choose the most important skills and specialties for this job
              </label>
              <Select
                required
                mode="multiple"
                size={"large"}
                style={{
                  width: "100%",
                  borderRadius: "0",
                  textAlign: "start",
                }}
                className="input border"
                showSearch
                placeholder="Skills"
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

            <button type="submit" className="btn btn-primary mb-3 w-75 w-lg-10">
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDetails;

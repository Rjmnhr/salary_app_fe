import React, { useEffect, useState } from "react";

// import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import "../../pages/add-details/style.css";
import { Select } from "antd";
import axios from "axios";

const TagInput = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [value, setValue] = useState();
  const [data, setData] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [allSkillData, setAllSkillData] = useState([]);

  const selectedJob = sessionStorage.getItem("job_title");

  useEffect(() => {
    axios
      .get("https://salaryappbackend-renjithcmrenju.b4a.run/api/salary/data")
      .then(async (response) => {
        const result = await response.data;
        console.log("🚀 ~ file: index.js:23 ~ .then ~ result:", result);
        setSalaryData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!salaryData) return;
    // Find the job data that matches the selected job title
    const selectedJobData = salaryData.find((job) =>
      job.job_title.toLowerCase().includes(selectedJob.toLowerCase())
    );
    console.log(
      "🚀 ~ file: index.js:36 ~ useEffect ~ selectedJobData:",
      selectedJobData
    );

    if (selectedJobData) {
      // Extract skills from the selected job data
      const skills = Object.keys(selectedJobData)
        .filter((key) => key.startsWith("skill"))
        .map((key) => selectedJobData[key]);
      setFilteredSkills(skills);
    } else {
      // Clear the skills if the job title is not found
      setFilteredSkills([]);
    }
    // eslint-disable-next-line
  }, [salaryData]);

  useEffect(() => {
    // Initialize a Set to collect distinct skills
    const uniqueSkills = new Set();

    // Iterate through jobData and collect distinct skills
    salaryData.forEach((job) => {
      for (let i = 1; i <= 8; i++) {
        const skillKey = `skill${i}`;
        const skillValue = job[skillKey].trim();

        // Check if the skillValue is not empty and add it to the Set
        if (skillValue !== "") {
          uniqueSkills.add(skillValue);
        }
      }
    });

    // Convert the Set to an array if needed
    const allSkills = Array.from(uniqueSkills);
    // Filter the skills to remove those present in filteredSkills
    const finalSkills = allSkills.filter(
      (skill) => !filteredSkills.includes(skill)
    );

    setAllSkillData(finalSkills);
  }, [salaryData, filteredSkills]);

  // Function to handle tag removal
  const handleRemoveTag = (removedTag) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== removedTag));
    // Check if the removed tag was originally from allSkillData or filteredSkills

    setFilteredSkills([...filteredSkills, removedTag]);
  };

  const handleSearch = (newValue) => {
    if (newValue) {
      if (newValue.length > 2) {
        const filter = allSkillData.filter((data) =>
          data.toLowerCase().includes(newValue.toLowerCase())
        );
        setData(filter);
      } else {
        setData([]);
      }
    } else {
      setData([]);
    }
  };

  const handleChangeSelect = (skill) => {
    if (!selectedTags.includes(skill)) {
      setSelectedTags([...selectedTags, skill]);
      const filterTags = allSkillData.filter((tag) => tag !== skill);
      setAllSkillData(filterTags);
      setValue("Add skill");
      document.querySelector("input").placeholder = "Add skill";
      setData([]);
    }
  };

  return (
    <div
      className="container col-7  text-start"
      style={{ width: "100%", padding: "0" }}
    >
      {/* <TagsInput
        value={selectedTags}
        onChange={handleChange}
        inputProps={{ placeholder: "Add a tag" }}
      /> */}

      <div className="container form-control p-2 d-flex flex-wrap">
        {selectedTags.map((skill) => (
          <div
            key={skill}
            onClick={() => {
              if (!selectedTags.includes(skill)) {
                setSelectedTags([...selectedTags, skill]);
                const filterTags = filteredSkills.filter(
                  (tag) => tag !== skill
                );
                setFilteredSkills(filterTags);
              }
            }}
            className="react-tagsinput-tag  text-center"
          >
            {skill}
            <span
              className="tag-remove-button"
              onClick={() => handleRemoveTag(skill)}
              style={{ color: "gainsboro", cursor: "pointer" }}
            >
              {" "}
              x
            </span>
          </div>
        ))}

        <Select
          value={value}
          size={"large"}
          style={{
            width: "50%",
            borderRadius: "0",
            textAlign: "start",
          }}
          className="input"
          showSearch
          placeholder="Add skill"
          defaultActiveFirstOption={false}
          suffixIcon={null}
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleChangeSelect}
          notFoundContent={null}
          options={(data || []).map((d) => ({
            value: d,
            label: d,
          }))}
        />
      </div>

      <div className="py-3 ">
        {filteredSkills.map((skill) => (
          <div
            key={skill}
            onClick={() => {
              if (!selectedTags.includes(skill)) {
                setSelectedTags([...selectedTags, skill]);
                const filterTags = filteredSkills.filter(
                  (tag) => tag !== skill
                );
                setFilteredSkills(filterTags);
              }
            }}
            className="TagsInput-tag border text-center"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;

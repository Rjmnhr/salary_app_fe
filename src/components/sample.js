import React, { useState } from "react";

const jobData = [
  {
    job_title: "Aws Devops Engineer",
    skill1: "Terraform",
    skill2: "devops",
    skill3: "kubernete",
    skill4: "aws",
    skill5: "ansible",
    skill6: "AWS Devops",
    skill7: "Kubernetes",
    skill8: "",
  },
  {
    job_title:
      "Hiring B. Tech Freshers || Hyderabad || Excellent Comms | Night Shifts",
    skill1: "Excellent Communication",
    skill2: "HTML",
    skill3: "Technical support",
    skill4: "Java",
    skill5: "Night Shifts",
    skill6: "Python",
    skill7: "Technical analysis",
    skill8: "Communication skills",
  },
  // Add more job data entries here
];

const FilterSkills = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);

  const handleJobSelection = (event) => {
    const selectedTitle = event.target.value;
    setSelectedJob(selectedTitle);

    // Find the job data that matches the selected job title
    const selectedJobData = jobData.find(
      (job) => job.job_title === selectedTitle
    );

    if (selectedJobData) {
      // Extract skills from the selected job data
      const skills = Object.values(selectedJobData).slice(1); // Exclude job_title
      setFilteredSkills(skills);
    } else {
      // Clear the skills if the job title is not found
      setFilteredSkills([]);
    }
  };

  return (
    <div>
      <label>Select a job title:</label>
      <select value={selectedJob} onChange={handleJobSelection}>
        <option value="">Select a job</option>
        {jobData.map((job) => (
          <option key={job.job_title} value={job.job_title}>
            {job.job_title}
          </option>
        ))}
      </select>

      <h2>Skills:</h2>
      <ul>
        {filteredSkills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSkills;

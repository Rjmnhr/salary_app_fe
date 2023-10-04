import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  LineChart,
  Line,
} from "recharts";

function JobReport() {
  const [jobsData, setJobsData] = useState([]); // Store job data

  useEffect(() => {
    // Simulate fetching job data (Replace with actual data fetching)
    const fetchData = async () => {
      // Example: const response = await fetch('your-api-endpoint');
      // const data = await response.json();
      // setJobsData(data);

      const simulatedData = [
        {
          job_title: "Aws Devops Engineer",
          company_name: "tech mahindra",
          experience: "5-8 Yrs",
          salary: "16-22.5 Lacs PA",
          location:
            "Hybrid - Hyderabad/ Secunderabad, Telangana, Bangalore/ Bengaluru, Karnataka, Gurgaon/ Gurugram, Haryana",
          description:
            "As a key member of the team, ensure success in designing, building and migrating applic...",
          posted_on: "1 Day Ago",
          current_date: "2023-08-22",
          skill1: "Terraform",
          skill2: "devops",
          skill3: "kubernete",
          skill4: "aws",
          skill5: "ansible",
          skill6: "AWS Devops",
          skill7: "Kubernetes",
          mapped_average_sal: 19.25,
          mapped_company_name: "tech mahindra",
          "avg experience": 6.5,
          mapped_job_title: "aws devops engineer",
          common_category: "Software Development",
        },
        {
          job_title:
            "Hiring B. Tech Freshers || Hyderabad || Excellent Comms | Night Shifts",
          company_name: "hcltech",
          experience: "0-0 Yrs",
          salary: "50,000-2.5 Lacs PA",
          location: "Hyderabad/ Secunderabad, Telangana",
          description:
            "Profile: Technical troubleshooting Responsibilities: Ensure that all requests from the ...",
          posted_on: "1 Day Ago",
          current_date: "2023-08-22",
          skill1: "Excellent Communication",
          skill2: "HTML",
          skill3: "Technical support",
          skill4: "Java",
          skill5: "Night Shifts",
          skill6: "Python",
          skill7: "Technical analysis",
          skill8: "Communication skills",
          mapped_average_sal: 1.5,
          mapped_company_name: "hcltech",
          "avg experience": 0,
          comp_industry: "it services and it consulting",
          comp_emp_count: 235113,
          common_category: "Software Development",
        },
        {
          job_title:
            "Front End Engineer/ Front End Engineer Lead - Bangalore/Hybrid/Remote",
          company_name: "tech platform",
          experience: "6-11 Yrs",
          salary: "30 Lacs PA",
          location: "Bangalore/ Bengaluru, Karnataka",
          description:
            "Demonstrated experience developing high-traffic web application front ends . Notice Per...",
          posted_on: "1 Day Ago",
          current_date: "2023-08-22",
          skill1: "nextjs",
          skill2: "javascript",
          skill3: "react.js",
          skill4: "Front End Engineer",
          skill5: "front end",
          skill6: "css",
          skill7: "web application",
          skill8: "express",
          mapped_average_sal: 30,
          "avg experience": 8.5,
          mapped_job_title: "front end engineer lead",
          common_category: "Software Development",
        },
        {
          job_title: "Day shift - Hindi Voice Process - 3L CTC",
          company_name: "oxilum technologies",
          experience: "0-3 Yrs",
          salary: "2.5-3 Lacs PA",
          location: "Bangalore/Bengaluru",
          description:
            "Shift . Day Shift & Rotational Week OFF Qualification . Any (Graduation is not mandator...",
          posted_on: "1 Day Ago",
          current_date: "2023-08-22",
          skill1: "BPO",
          skill2: "Hindi Voice Process",
          skill3: "Day shift",
          skill4: "Customer Support",
          skill5: "Domestic BPO",
          skill6: "No broker",
          skill7: "Customer Service",
          skill8: "Altruist",
          mapped_average_sal: 2.75,
          "avg experience": 1.5,
          comp_industry: "construction",
          comp_emp_count: 2710,
          mapped_job_title: "voice process",
          common_category: "Software Development",
        },
        {
          job_title:
            "Great Salaries For Tech Support in Bangalore - Semi Voice",
          company_name: "jobshop",
          experience: "4-9 Yrs",
          salary: "4-5.5 Lacs PA",
          location: "Bangalore/Bengaluru",
          description:
            "This is a 24 / 7 support mostly evening and night shifts . Greetings from JobShop, We a...",
          posted_on: "Just Now",
          current_date: "2023-08-22",
          skill1: "storyboarding",
          skill2: "dreamweaver",
          skill3: "articulate storyline",
          skill4: "articulate",
          skill5: "photoshop",
          skill6: "instructional design",
          skill7: "sound forge",
          skill8: "captivate",
          mapped_average_sal: 4.75,
          mapped_company_name: "jobshop consulting",
          "avg experience": 6.5,
          mapped_job_title: "tech support semi voice",
          common_category: "Software Development",
        },
        {
          job_title: "Customer Support Executive",
          company_name: "outlook hr solutions",
          experience: "0-2 Yrs",
          salary: "2.25-4 Lacs PA",
          location: "Hyderabad/Secunderabad(Bahadurpally)",
          description:
            "Tech.Mahindra International Non-Voice Process Good typing skills Fluent in written and ...",
          posted_on: "1 Day Ago",
          current_date: "2023-08-22",
          skill1: "Email Support",
          skill2: "Good Communication In English",
          skill3: "Typing Speed",
          skill4: "Social Media",
          skill5: "Web Chat",
          skill6: "Chat",
          skill7: "Customer support",
          skill8: "Media",
          mapped_average_sal: 3.125,
          "avg experience": 1,
          mapped_job_title: "customer support executive",
          common_category: "Software Development",
        },
        {
          job_title: "Rehost Migrations Consultant",
          company_name: "tech mahindra",
          experience: "5-10 Yrs",
          salary: "10-20 Lacs PA",
          location:
            "Bangalore/ Bengaluru, Karnataka, Pune, Maharashtra, Delhi / NCR",
          description:
            "Hi, One of my direct client is looking for Rehost Migrations Consultant in Delhi / Bang...",
          posted_on: "Just Now",
          current_date: "2023-08-22",
          skill1: "Rehost",
          skill2: "AWS",
          skill3: "server migration",
          skill4: "IT infrastructure migration",
          skill5: "Migration",
          skill6: "IT infrastructure",
          skill7: "Serv",
          skill8: "Infrastructure",
          mapped_average_sal: 15,
          mapped_company_name: "tech mahindra",
          "avg experience": 7.5,
          mapped_job_title: "rehost migrations consultant",
          common_category: "Software Development",
        },
        {
          job_title: "Opening For Customer Research Analyst",
          company_name: "jaypee brothers medical publishers",
          experience: "0-5 Yrs",
          salary: "2-6 Lacs PA",
          location:
            "Bangalore/Bengaluru, Chennai, Tamil Nadu, Delhi / NCR, Mumbai (All Areas)",
          description:
            "The successful candidate will be responsible for collecting feedback from existing cust...",
          posted_on: "1 Day Ago",
          current_date: "2023-08-22",
          skill1: "Research Analysis",
          skill2: "communication skills",
          skill3: "Data Research",
          skill4: "analytical",
          skill5: "data collection",
          skill6: "Collections",
          skill7: "Analysis",
          skill8: "Research",
          mapped_average_sal: 4,
          "avg experience": 2.5,
          mapped_job_title: "customer research analyst",
          common_category: "Software Development",
        },
        {
          job_title:
            "Opening For Desktop Support - International Voice Support",
          company_name: "tech mahindra",
          experience: "1-6 Yrs",
          salary: "3.5-6.5 Lacs PA",
          location: "Hyderabad/ Secunderabad, Telangana, Pune, Maharashtra",
          description:
            "Should Good Communication. . Exposure to retail industry devices such as Point-of-Sale ...",
          posted_on: "Just Now",
          current_date: "2023-08-22",
          skill1: "Good Communication In English",
          skill2: "Technical Support",
          skill3: "desktop support",
          skill4: "International Voice",
          skill5: "Proxy Server",
          skill6: "desktop",
          skill7: "vpn",
          skill8: "Remote Support",
          mapped_average_sal: 5,
          mapped_company_name: "tech mahindra",
          "avg experience": 3.5,
          mapped_job_title: "desktop international voice support",
          common_category: "Software Development",
        },
        {
          job_title: "international chat support",
          company_name: "tech mahindra",
          salary: "1-3.5 Lacs PA",
          description:
            "Preferred candidate profile INTERNATIONAL CHAT EXPERIENCE) UG / Any Grad with min 12 mo...",
          posted_on: "1 Day Ago",
          current_date: "2023-08-22",
          skill1: "international chat process",
          skill2: "Blended Process",
          skill3: "Chat Support",
          skill4: "Chat Process",
          skill5: "Expression blend",
          skill6: "International",
          skill7: "Process",
          skill8: "Chat",
          mapped_average_sal: 2.25,
          mapped_company_name: "tech mahindra",
          mapped_job_title: "international chat support",
          common_category: "Software Development",
        },
        {
          job_title: "Aws Devops Engineer",
          company_name: "tech mahindra",
          experience: "5-8 Yrs",
          salary: "16-22.5 Lacs PA",
          location:
            "Hybrid - Hyderabad/ Secunderabad, Telangana, Bangalore/ Bengaluru, Karnataka, Gurgaon/ Gurugram, Haryana",
          description:
            "As a key member of the team, ensure success in designing, building and migrating applic...",
          posted_on: "1 Day Ago",
          current_date: "2023-08-22",
          skill1: "Terraform",
          skill2: "devops",
          skill3: "kubernete",
          skill4: "aws",
          skill5: "ansible",
          skill6: "AWS Devops",
          skill7: "Kubernetes",
          mapped_average_sal: 19.25,
          mapped_company_name: "tech mahindra",
          "avg experience": 6.5,
          mapped_job_title: "aws devops engineer",
          common_category: "Software Development",
        },
        {
          job_title:
            "Hiring B. Tech Freshers || Hyderabad || Excellent Comms | Night Shifts",
          company_name: "hcltech",
          experience: "0-0 Yrs",
          salary: "50,000-2.5 Lacs PA",
          location: "Hyderabad/ Secunderabad, Telangana",
          description:
            "Profile: Technical troubleshooting Responsibilities: Ensure that all requests from the ...",
          posted_on: "1 Day Ago",
          current_date: "2023-08-22",
          skill1: "Excellent Communication",
          skill2: "HTML",
          skill3: "Technical support",
          skill4: "Java",
          skill5: "Night Shifts",
          skill6: "Python",
          skill7: "Technical analysis",
          skill8: "Communication skills",
          mapped_average_sal: 1.5,
          mapped_company_name: "hcltech",
          "avg experience": 0,
          comp_industry: "it services and it consulting",
          comp_emp_count: 235113,
          common_category: "Software Development",
        },
        {
          job_title:
            "Front End Engineer/ Front End Engineer Lead - Bangalore/Hybrid/Remote",
          company_name: "tech platform",
          experience: "6-11 Yrs",
          salary: "30 Lacs PA",
          location: "Bangalore/ Bengaluru, Karnataka",
          description:
            "Demonstrated experience developing high-traffic web application front ends . Notice Per...",
          posted_on: "1 Day Ago",
          current_date: "2023-08-22",
          skill1: "nextjs",
          skill2: "javascript",
          skill3: "react.js",
          skill4: "Front End Engineer",
          skill5: "front end",
          skill6: "css",
          skill7: "web application",
          skill8: "express",
          mapped_average_sal: 30,
          "avg experience": 8.5,
          mapped_job_title: "front end engineer lead",
          common_category: "Software Development",
        },
        {
          job_title: "Day shift - Hindi Voice Process - 3L CTC",
          company_name: "oxilum technologies",
          experience: "0-3 Yrs",
          salary: "2.5-3 Lacs PA",
          location: "Bangalore/Bengaluru",
          description:
            "Shift . Day Shift & Rotational Week OFF Qualification . Any (Graduation is not mandator...",
          posted_on: "1 Day Ago",
          current_date: "2023-08-22",
          skill1: "BPO",
          skill2: "Hindi Voice Process",
          skill3: "Day shift",
          skill4: "Customer Support",
          skill5: "Domestic BPO",
          skill6: "No broker",
          skill7: "Customer Service",
          skill8: "Altruist",
          mapped_average_sal: 2.75,
          "avg experience": 1.5,
          comp_industry: "construction",
          comp_emp_count: 2710,
          mapped_job_title: "voice process",
          common_category: "Software Development",
        },
        {
          job_title:
            "Great Salaries For Tech Support in Bangalore - Semi Voice",
          company_name: "jobshop",
          experience: "4-9 Yrs",
          salary: "4-5.5 Lacs PA",
          location: "Bangalore/Bengaluru",
          description:
            "This is a 24 / 7 support mostly evening and night shifts . Greetings from JobShop, We a...",
          posted_on: "Just Now",
          current_date: "2023-08-22",
          skill1: "storyboarding",
          skill2: "dreamweaver",
          skill3: "articulate storyline",
          skill4: "articulate",
          skill5: "photoshop",
          skill6: "instructional design",
          skill7: "sound forge",
          skill8: "captivate",
          mapped_average_sal: 4.75,
          mapped_company_name: "jobshop consulting",
          "avg experience": 6.5,
          mapped_job_title: "tech support semi voice",
          common_category: "Software Development",
        },
        {
          job_title: "Customer Support Executive",
          company_name: "outlook hr solutions",
          experience: "0-2 Yrs",
          salary: "2.25-4 Lacs PA",
          location: "Hyderabad/Secunderabad(Bahadurpally)",
          description:
            "Tech.Mahindra International Non-Voice Process Good typing skills Fluent in written and ...",
          posted_on: "1 Day Ago",
          current_date: "2023-08-22",
          skill1: "Email Support",
          skill2: "Good Communication In English",
          skill3: "Typing Speed",
          skill4: "Social Media",
          skill5: "Web Chat",
          skill6: "Chat",
          skill7: "Customer support",
          skill8: "Media",
          mapped_average_sal: 3.125,
          "avg experience": 1,
          mapped_job_title: "customer support executive",
          common_category: "Software Development",
        },
        {
          job_title: "Rehost Migrations Consultant",
          company_name: "tech mahindra",
          experience: "5-10 Yrs",
          salary: "10-20 Lacs PA",
          location:
            "Bangalore/ Bengaluru, Karnataka, Pune, Maharashtra, Delhi / NCR",
          description:
            "Hi, One of my direct client is looking for Rehost Migrations Consultant in Delhi / Bang...",
          posted_on: "Just Now",
          current_date: "2023-08-22",
          skill1: "Rehost",
          skill2: "AWS",
          skill3: "server migration",
          skill4: "IT infrastructure migration",
          skill5: "Migration",
          skill6: "IT infrastructure",
          skill7: "Serv",
          skill8: "Infrastructure",
          mapped_average_sal: 15,
          mapped_company_name: "tech mahindra",
          "avg experience": 7.5,
          mapped_job_title: "rehost migrations consultant",
          common_category: "Software Development",
        },
        {
          job_title: "Opening For Customer Research Analyst",
          company_name: "jaypee brothers medical publishers",
          experience: "0-5 Yrs",
          salary: "2-6 Lacs PA",
          location:
            "Bangalore/Bengaluru, Chennai, Tamil Nadu, Delhi / NCR, Mumbai (All Areas)",
          description:
            "The successful candidate will be responsible for collecting feedback from existing cust...",
          posted_on: "1 Day Ago",
          current_date: "2023-08-22",
          skill1: "Research Analysis",
          skill2: "communication skills",
          skill3: "Data Research",
          skill4: "analytical",
          skill5: "data collection",
          skill6: "Collections",
          skill7: "Analysis",
          skill8: "Research",
          mapped_average_sal: 4,
          "avg experience": 2.5,
          mapped_job_title: "customer research analyst",
          common_category: "Software Development",
        },
        {
          job_title:
            "Opening For Desktop Support - International Voice Support",
          company_name: "tech mahindra",
          experience: "1-6 Yrs",
          salary: "3.5-6.5 Lacs PA",
          location: "Hyderabad/ Secunderabad, Telangana, Pune, Maharashtra",
          description:
            "Should Good Communication. . Exposure to retail industry devices such as Point-of-Sale ...",
          posted_on: "Just Now",
          current_date: "2023-08-22",
          skill1: "Good Communication In English",
          skill2: "Technical Support",
          skill3: "desktop support",
          skill4: "International Voice",
          skill5: "Proxy Server",
          skill6: "desktop",
          skill7: "vpn",
          skill8: "Remote Support",
          mapped_average_sal: 5,
          mapped_company_name: "tech mahindra",
          "avg experience": 3.5,
          mapped_job_title: "desktop international voice support",
          common_category: "Software Development",
        },
        {
          job_title: "international chat support",
          company_name: "tech mahindra",
          salary: "1-3.5 Lacs PA",
          description:
            "Preferred candidate profile INTERNATIONAL CHAT EXPERIENCE) UG / Any Grad with min 12 mo...",
          posted_on: "1 Day Ago",
          current_date: "2023-08-22",
          skill1: "international chat process",
          skill2: "Blended Process",
          skill3: "Chat Support",
          skill4: "Chat Process",
          skill5: "Expression blend",
          skill6: "International",
          skill7: "Process",
          skill8: "Chat",
          mapped_average_sal: 2.25,
          mapped_company_name: "tech mahindra",
          mapped_job_title: "international chat support",
          common_category: "Software Development",
        },
      ];
      setJobsData(simulatedData);
    };

    fetchData();
  }, []);

  // Calculate average salary
  const salaries = jobsData.map((job) => job.mapped_average_sal);
  const totalSalary = salaries.reduce((acc, val) => acc + val, 0);
  const averageSalary = totalSalary / salaries.length;

  // Calculate median salary
  const sortedSalaries = [...salaries].sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedSalaries.length / 2);
  const medianSalary =
    sortedSalaries.length % 2 === 0
      ? (sortedSalaries[middleIndex - 1] + sortedSalaries[middleIndex]) / 2
      : sortedSalaries[middleIndex];

  // Calculate minimum and maximum salary
  const minSalary = Math.min(...salaries);
  const maxSalary = Math.max(...salaries);

  // Create data for the salary increment chart
  // const salaryIncrementData = jobsData.map((job, index) => ({
  //   job: job.mapped_job_title,
  //   increment: job.mapped_average_sal - averageSalary,
  // }));

  // Create data for the line chart (salary vs. experience)
  const lineChartData = jobsData.map((job) => ({
    experience: job["avg experience"],
    salary: job.mapped_average_sal,
  }));

  return (
    <div>
      <h2>Software Development Job Statistics Report</h2>
      <div>
        <h3>Salary Statistics</h3>
        <p>Average Salary: ${averageSalary.toFixed(2)}</p>
        <p>Median Salary: ${medianSalary.toFixed(2)}</p>
        <p>Minimum Salary: ${minSalary.toFixed(2)}</p>
        <p>Maximum Salary: ${maxSalary.toFixed(2)}</p>
        {/* Render other salary statistics as needed */}
        <h4>Salary Chart</h4>
        <BarChart width={600} height={300} data={jobsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mapped_job_title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="mapped_average_sal" fill="#8884d8" />
          {/* Add reference lines for minimum, median, and maximum salaries */}
          <ReferenceLine
            y={averageSalary}
            stroke="green"
            strokeDasharray="3 3"
            label="Average"
          />
          <ReferenceLine
            y={medianSalary}
            stroke="blue"
            strokeDasharray="3 3"
            label="Median"
          />
          <ReferenceLine
            y={minSalary}
            stroke="red"
            strokeDasharray="3 3"
            label="Minimum"
          />
          <ReferenceLine
            y={maxSalary}
            stroke="orange"
            strokeDasharray="3 3"
            label="Maximum"
          />
        </BarChart>
        {/* Render other report components */}
      </div>
      <div>
        <h4>Line Chart (Salary vs. Experience)</h4>
        <LineChart width={600} height={300} data={lineChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="experience"
            type="number"
            label="Experience (Years)"
          />
          <YAxis dataKey="salary" type="number" label="Salary ($)" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="salary"
            stroke="#8884d8"
            name="Salary"
          />
        </LineChart>
      </div>
    </div>
  );
}

export default JobReport;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { CarouselComponentStyled } from "./style";

const CarouseItem = ({ item }) => {
  console.log("🚀 ~ file: index.js:5 ~ CarouseItem ~ item:", item.job_title);

  const [selectedTab, setSelectedTab] = useState(null);

  const showActive = (currentTab) => {
    setSelectedTab(currentTab);
    console.log(currentTab);
    sessionStorage.setItem("job_title", currentTab);
  };
  return (
    <div className="item-carousel">
      <div
        style={{ width: "300px", border: "1px solid " }}
        className={
          selectedTab === item.job_title
            ? "Btn-container selected-tab-container"
            : "Btn-container"
        }
        onClick={() => showActive(item.job_title)}
      >
        <div className="container-fluid p-2 ">
          <p
            style={{
              fontWeight: "bold",
              color: "#1a6cb6",
            }}
          >
            {item.job_title}
          </p>
        </div>
        <div
          className="container-fluid d-grid justify-items-center p-2"
          style={{
            background: "rgba(0, 0, 0, 0.02)",
          }}
        >
          <p
            className="m-0"
            style={{
              fontSize: "14px",
              fontWeight: "bolder",
            }}
          >
            {item.salary}
          </p>
          <div
            style={{ height: "60px", width: "100%" }}
            className="d-flex align-items-center justify-content-center"
          >
            <div
              style={{
                height: "30px",
                width: "25%",
                background: "#235090",
              }}
            ></div>
            <div
              style={{
                height: "30px",
                width: "25%",
                background: "#5389d5",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CarouselComponent = ({ jobTitle }) => {
  const [salaryData, setSalaryData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://salaryappbackend-renjithcmrenju.b4a.run/api/salary/data")
      .then(async (response) => {
        const result = await response.data;
        setSalaryData(result);
        console.log(JSON.stringify(result));
      })
      .catch((err) => console.log(err));
  }, []);

  const filterJobs = (data) => {
    return data.map((job) => {
      // Use regex to split the job title based on '/' or '||' characters
      const jobTitleParts = job.job_title.split(/\/|\|\|/);

      // Take the first part (before the '/' or '||' character)
      const filteredTitle = jobTitleParts[0].trim();

      return { ...job, job_title: filteredTitle };
    });
  };

  useEffect(() => {
    if (jobTitle) {
      const filteredData = filterJobs(salaryData);

      const inputFilteredData = filteredData.filter((data) =>
        data.job_title.toLowerCase().includes(jobTitle.toLowerCase())
      );
      setFilteredItems(inputFilteredData);
    }
  }, [jobTitle, salaryData]);
  console.log(
    "🚀 ~ file: index.js:109 ~ useEffect ~ setFilteredItems:",
    filteredItems
  );

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= filteredItems.length) {
      newIndex = filteredItems.length - 1;
    }

    setActiveIndex(newIndex);
  };

  return (
    <>
      <CarouselComponentStyled>
        <div
          className="carousel"
          style={{ width: "300px", overflow: "hidden" }}
        >
          <div
            className="inner"
            style={{ transform: `translate(-${activeIndex * 100}%)` }}
          >
            {filteredItems.map((job) => {
              return <CarouseItem item={job} />;
            })}
          </div>
          <div className="carousel-buttons">
            <button onClick={() => updateIndex(activeIndex - 1)}>
              arrow_left
            </button>
            <button onClick={() => updateIndex(activeIndex + 1)}>
              arrow_right
            </button>
          </div>
        </div>
      </CarouselComponentStyled>
    </>
  );
};

export default CarouselComponent;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { CarouselComponentStyled } from "./style";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const CarouseItem = ({ item }) => {
  const [selectedTab, setSelectedTab] = useState(null);

  const showActive = (currentTab) => {
    setSelectedTab(currentTab);

    console.log(currentTab);
    sessionStorage.setItem("job_title", currentTab);
  };
  return (
    <div className="item-carousel">
      {/* {isSelected && <div className="tick-mark">✓</div>} */}
      <div
        style={{ width: "300px", border: "1px solid " }}
        className={
          selectedTab === item.mapped_job_title
            ? "Btn-container selected-tab-container"
            : "Btn-container"
        }
        onClick={() => showActive(item.mapped_job_title)}
      >
        <div className="container-fluid p-2 ">
          <p
            style={{
              fontWeight: "bold",
              color: "#1a6cb6",
              width: "280px",
            }}
          >
            {item.mapped_job_title}
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
      .get("http://localhost:8003/api/salary/data")
      .then(async (response) => {
        const result = await response.data;
        setSalaryData(result);
        console.log(JSON.stringify(result));
      })
      .catch((err) => console.log(err));
  }, []);

  function fuzzyMatch(input, jobTitle) {
    const inputWords = input.toLowerCase().split(" ");
    return inputWords.every((word) => jobTitle?.toLowerCase().includes(word));
  }

  useEffect(() => {
    if (jobTitle) {
      // const filteredData = filterJobs(salaryData);

      const filteredJobTitles = salaryData.filter((data) =>
        fuzzyMatch(jobTitle, data.mapped_job_title)
      );

      setFilteredItems(filteredJobTitles);
    }
  }, [jobTitle, salaryData]);

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
        <div className="d-flex align-items-center">
          <div className="carousel-buttons">
            {activeIndex > 0 && (
              <div onClick={() => updateIndex(activeIndex - 1)}>
                <LeftOutlined />
              </div>
            )}
          </div>
          <div
            className="carousel"
            style={{ width: "300px", overflow: "hidden", margin: "10px" }}
          >
            <div
              className="inner"
              style={{ transform: `translate(-${activeIndex * 100}%)` }}
            >
              {filteredItems.map((job) => {
                return <CarouseItem item={job} />;
              })}
            </div>
          </div>
          <div className="carousel-buttons">
            {filteredItems ? (
              activeIndex < filteredItems.length - 1 ? (
                <div onClick={() => updateIndex(activeIndex + 1)}>
                  <RightOutlined />
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </CarouselComponentStyled>
    </>
  );
};

export default CarouselComponent;

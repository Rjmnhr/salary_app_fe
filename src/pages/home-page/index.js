import React, { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import axios from "axios";
import { Carousel } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import "./style.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [dotPosition, setDotPosition] = useState("top");
  const [carouselRef, setCarouselRef] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [jobTitle, setJobTitle] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const navigate = useNavigate();
  const [location, setLocation] = useState("");

  const showActive = (currentTab) => {
    setSelectedTab(currentTab);
    console.log(currentTab);
    sessionStorage.setItem("job_title", currentTab);
  };
  // eslint-disable-next-line
  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };

  const handleNext = () => {
    if (carouselRef) {
      carouselRef.next();
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (carouselRef && currentSlide > 0) {
      carouselRef.prev();
      setCurrentSlide(currentSlide - 1);
    }
  };

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
      setDisplayData(inputFilteredData);
    }
  }, [jobTitle, salaryData]);

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };

  // const handleSearch = (newValue) => {
  //   const filter = suggestions.filter((data) =>
  //     data.toLowerCase().includes(newValue.toLowerCase())
  //   );
  //   setData(filter);
  // };

  return (
    <>
      <NavBar />
      <div
        className="container-fluid "
        style={{ background: "gainsboro", height: "100vh" }}
      >
        <div
          className="container main-container "
          style={{ background: "white", height: "100vh", overflowY: "scroll" }}
        >
          <div className="container p-3">
            <p className="fs-2">Price a Job</p>
            <p>Let's start building a profile with a job title and location.</p>
            <form
              className="w-100"
              style={{ display: "grid", placeItems: "center" }}
            >
              <div className="col-7">
                <input
                  className="form-control form-control-lg mb-3"
                  placeholder="Job Title"
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div className="mb-3 col-7">
                {/* <Select
                    size={"large"}
                    style={{
                      width: "100%",
                      borderRadius: "0",
                      textAlign: "start",
                    }}
                    showSearch
                    value={value}
                    placeholder="City"
                    defaultActiveFirstOption={false}
                    suffixIcon={null}
                    filterOption={false}
                    onSearch={handleSearch}
                    onChange={handleChange}
                    notFoundContent={null}
                    options={(data || []).map((d) => ({
                      value: d,
                      label: d,
                    }))}
                  /> */}
                <input
                  placeholder="City"
                  required
                  className="form-control"
                  onChange={(e) => {
                    setLocation(e.target.value);
                    sessionStorage.setItem("location", e.target.value);
                    console.log(location);
                  }}
                />
              </div>
            </form>
          </div>
          {displayData ? (
            <>
              <p className="fs-2">Suggested Titles</p>
              <p>Select the closest match to the job you want to benchmark.</p>
              <div className="container mt-3 col-4 d-flex align-items-center">
                {currentSlide > 0 && (
                  <div onClick={handlePrev}>
                    <LeftOutlined />
                  </div>
                )}

                <div className="container">
                  <div>
                    <Carousel
                      dotPosition={dotPosition}
                      ref={setCarouselRef}
                      style={{ height: "250px" }}
                    >
                      {displayData
                        ? displayData.map((job, index) => {
                            return (
                              <>
                                <div
                                  style={{ padding: "0" }}
                                  className={
                                    selectedTab === job.job_title
                                      ? "Btn-container selected-tab-container"
                                      : "Btn-container"
                                  }
                                  onClick={() => showActive(job.job_title)}
                                >
                                  <div className="container-fluid p-2 ">
                                    <p
                                      key={index}
                                      style={{
                                        fontWeight: "bold",
                                        color: "#1a6cb6",
                                      }}
                                    >
                                      {job.job_title}
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
                                      {job.salary}
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
                                  <svg
                                    class="jobcard__checkmark"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 52 52"
                                  >
                                    <circle
                                      class="jobcard__checkmark__circle"
                                      cx="26"
                                      cy="26"
                                      r="25"
                                      fill="none"
                                    ></circle>
                                    <path
                                      class="jobcard__checkmark__check"
                                      fill="none"
                                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                    ></path>
                                  </svg>
                                </div>
                              </>
                            );
                          })
                        : ""}
                    </Carousel>
                  </div>
                </div>
                {displayData ? (
                  currentSlide < displayData.length ? (
                    <div>
                      <RightOutlined onClick={handleNext} />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            ""
          )}

          {selectedTab ? (
            <button
              onClick={() => navigate("/add-details")}
              className="btn btn-primary mt-3 w-25"
            >
              Next
            </button>
          ) : (
            <button disabled className="btn btn-primary mt-3 w-25">
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BgVideo from "../../video/demo.mp4";
import { Helmet } from "react-helmet";
import AxiosInstance from "../../config/axios";
import NavBar from "../../components/layout/nav-bar";
import FooterComponent from "../../components/layout/footer";
import { login_app_path, pay_pulse_input_path } from "../../config/constant";
import { PayPulsePageStyled } from "./style";
import { useApplicationContext } from "../../context/app-context";
import { ArrowRightOutlined } from "@ant-design/icons";
import laptopBg from "../../icons/laptop-image.png";
import { DemoRegisterComponent } from "../../components/pay-pulse/demo-register";
import { DatePicker, Modal, Select, Switch, TimePicker } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import Contact from "../../components/contact";
import { goToExternalURL } from "../../utils/price-a-job-helper-functions";

const PayPulseLandingPage = () => {
  const navigate = useNavigate();
  const { userData, isTrailActive } = useApplicationContext();
  const location = window.location.href;
  const userID = localStorage.getItem("user_id");
  sessionStorage.removeItem("activeIndex");
  const [selectedDates, setSelectedDates] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("4:00 PM");
  const [datePicker, setDatePicker] = useState(null);
  const { Option } = Select;
  const [isCustomizationEnabled, setIsCustomizationEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCustomizationSwitch = (checked) => {
    setIsCustomizationEnabled(checked);
    setSelectedDates(null);
  };

  const handleDatesSelect = (date, bool) => {
    if (date && bool) {
      // Extract only the date part using moment.js
      const selectedDate = dayjs(date).startOf("day"); // This sets the time to 00:00:00

      setFormattedDate(selectedDate.format("YYYY-MM-DD"));
      setDatePicker(date);
    }
    setSelectedDates(date);
    setSelectedTime("4:00 PM");
  };
  const handleTimeSelect = (time, timeString) => {
    // Check if timeString is not null or undefined
    if (timeString) {
      setSelectedTime(timeString);
      // You can use timeString or any other format as needed
    }
    // Handle other cases if needed
  };

  // Function to generate date options
  const generateDateOptions = () => {
    const dates = [];
    let currentDate = moment().startOf("isoWeek").add(2, "days"); // Start from next Wednesday
    const endDate = moment().add(6, "months");

    while (currentDate.isSameOrBefore(endDate, "day")) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(7, "days"); // Move to the next Wednesday
    }

    return dates;
  };

  useEffect(() => {
    AxiosInstance.post(
      `/api/track-data/store3`,
      { path: location, id: userID },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        //eslint-disable-next-line
        const data = await response.data;
      })
      .catch((err) => console.log(err));

    //eslint-disable-next-line
  }, []);

  const [startTime, setStartTime] = useState(Date.now());
  useEffect(() => {
    // Set start time when the component mounts
    setStartTime(Date.now());

    // Add an event listener for the beforeunload event
    const handleBeforeUnload = () => {
      // Calculate time spent
      const endTime = Date.now();
      const timeSpentInSeconds = (endTime - startTime) / 1000;

      // Send the data to your backend
      AxiosInstance.post(
        `/api/track-data/store2`,
        { path: location, id: userID, timeSpent: timeSpentInSeconds },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          //eslint-disable-next-line
          const data = await response.data;
        })
        .catch((err) => console.log(err));
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Specify the cleanup function to remove the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    //eslint-disable-next-line
  }, [location, userID]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 15000); // Open modal after 15 seconds

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, []);

  const handleScrollTo = () => {
    setModalVisible(false);
    // Scroll to the demo section
    const demoSection = document.getElementById("demoSection");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Helmet>
        <title>PayPulse | Equipay Partners</title>
        <meta
          name="description"
          content="Refine pay strategies with Equipay's PayPulse, ensuring precise and competitive compensation for every role."
        />
        <meta
          property="og:description"
          content="Refine pay strategies with Equipay's PayPulse, ensuring precise and competitive compensation for every role."
        />
      </Helmet>
      <NavBar />
      <PayPulsePageStyled>
        <div
          className="container-fluid "
          style={{
            background: "#daf0f5",

            marginTop: "65px",
          }}
        >
          <section id="about" className="about ">
            <div className="container" data-aos="fade-up">
              <div className="row no-gutters">
                <div className="content col-xl-5 d-flex align-items-stretch">
                  <div className="content">
                    <h1
                      style={{
                        textAlign: "start",
                        fontSize: "80px",
                        fontWeight: "bold",
                      }}
                    >
                      PayPulse
                    </h1>
                    <div className="w-100 text-left">
                      <button
                        onClick={() => {
                          if (userData) {
                            goToExternalURL(
                              pay_pulse_input_path,
                              userData?.user_type,
                              isTrailActive
                            );
                          } else {
                            navigate(login_app_path);
                          }
                        }}
                        className="custom-demo-btn mt-3 mb-3 shadow p-3"
                      >
                        <span className="mr-3">One time trial</span>{" "}
                        <ArrowRightOutlined />
                      </button>
                      <br />
                      <button
                        onClick={handleScrollTo}
                        className="custom-download-btn mt-3 mb-3 shadow p-3"
                      >
                        Register for Demo
                      </button>
                      {/* 
                      <DownloadSamplePDF /> */}
                    </div>

                    {/* <a href="#contact" className="btn-get-started scrollto">
                    Use Free Profile Evaluator
                  </a> */}

                    {/* <a href="#contact" className="btn-get-started scrollto">
                    Use Free Profile Evaluator
                  </a> */}
                  </div>
                </div>
                <div className="col-xl-7 d-flex align-items-stretch">
                  <div className="icon-boxes d-flex flex-column justify-content-center">
                    <div className="video-main">
                      <a href="/pay-pulse-video">
                        <video
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          src={BgVideo}
                          autoPlay
                          loop
                          muted
                        />{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="about container  text-left px-2" id="className">
            <div className="section-title">
              <h2>About PayPulse</h2>
            </div>
            <div className="row">
              <div className="col-lg-6" style={{ fontSize: "18px" }}>
                <p>
                  Paypulse was created as a response to our clients constantly
                  complaining that salary surveys are too expensive and doesn’t
                  provide any real time salary data. Other sources like
                  glassdoor are largely unverified data and can’t be reliably
                  used for any salary benchmarking.
                </p>
                <p>
                  Paypulse is an AI based salary aggregator tool which sources
                  data from thousands of jobs that are posted everyday and the
                  salaries that are posted along with the jobs.
                </p>
                <p>
                  Paypulse allows organisations to create custom peer groups
                  capturing their competitors and can view all salaries for the
                  jobs posted by their competitors real-time, filter by skill
                  and location.
                </p>
              </div>
              <div className="col-lg-6">
                <div className="laptop-bg">
                  <img src={laptopBg} alt="career insights" />
                </div>
              </div>
            </div>
          </section>
          <section className="about col-xl-12 d-flex align-items-stretch mt-5 container">
            <div className="icon-boxes d-flex flex-column justify-content-center container">
              <div className="section-title">
                <h2>pay pulse features</h2>
              </div>
              <div className="row">
                <div
                  className="col-md-6 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <i className="bx bx-receipt"></i>
                  <h4>Real Time</h4>
                  <p className="text-left">
                    This is completely real-time – no more waiting for 6 months
                    to 12 months to get most recent data from Salary surveys.
                    Our data gets uploaded each week.
                  </p>
                </div>
                <div
                  className="col-md-6 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <i className="bx bx-cube-alt"></i>
                  <h4>Instant Response</h4>
                  <p className="text-left">
                    You don’t need to spend weeks on submitting data in salary
                    surveys – just access our tool anytime.
                  </p>
                </div>

                <div
                  className="col-md-6 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <i className="bx bx-images"></i>
                  <h4>See Market Movement</h4>
                  <p className="text-left">
                    You don’t need to spend weeks on submitting data in salary
                    surveys – just access our tool anytime.
                  </p>
                </div>

                <div
                  className="col-md-6 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <i className="bx bx-receipt"></i>
                  <h4>Affordable Package</h4>
                  <p className="text-left">
                    The best part, accessing our tool is about a third the cost
                    you pay for Salary survey.
                  </p>
                </div>
                <div
                  className="col-md-6 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <i className="bx bx-receipt"></i>
                  <h4>Search by Location</h4>
                  <p className="text-left">
                    Salary surveys very rarely give you information about
                    city/location premiums – our proprietary tool will give you
                    salary data by city and locations. This is completely
                    real-time – no more waiting for 6 months to 12 months to get
                    most recent data from Salary surveys. Our data gets uploaded
                    each week.
                  </p>
                </div>
                <div
                  className="col-md-6 icon-box"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <i className="bx bx-shield"></i>
                  <h4>Search by Skill</h4>
                  <p className="text-left">
                    Salary surveys don’t tell you salaries by skills required
                    for the job. Our tool allows you to see which skills are
                    more in demand and how much you should be paying for that
                    salary.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            className="product-demo text-left container"
            id="demoSection"
          >
            <div className="section-title">
              <h2>PRODUCT DEMO</h2>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <h3>
                  Join us for a live demonstration of our product, Pay Pulse!
                </h3>
                <p className="my-3">
                  <strong>Event Details:</strong>
                </p>
                <ul>
                  <li>
                    <strong>Time:</strong> 4:00 PM (IST)
                  </li>
                  <li>
                    <strong>Location:</strong> Online - Register to receive the
                    meeting link
                  </li>
                </ul>
                <p>You can choose to attend the following sessions.</p>
                <div class=" form-group">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select dates"
                    onChange={(value) => handleDatesSelect(value, false)}
                    value={selectedDates}
                    className="form-control primary-input "
                    disabled={isCustomizationEnabled}
                  >
                    {generateDateOptions().map((date) => (
                      <Option key={date} value={date}>
                        {moment(date).format("MMM DD, YYYY")}
                      </Option>
                    ))}
                  </Select>
                </div>
                <p className="">
                  You can also choose a customized time if you prefer{" "}
                  <Switch
                    className="ml-2"
                    // checkedChildren="Customize"
                    // unCheckedChildren="Customize"
                    onChange={handleCustomizationSwitch}
                  />
                </p>{" "}
                <div className="row">
                  <div class=" form-group col-lg-6">
                    <DatePicker
                      value={datePicker}
                      style={{ width: "100%", marginTop: "10px" }}
                      placeholder="Select custom date"
                      onChange={(value) => handleDatesSelect(value, true)}
                      disabled={!isCustomizationEnabled}
                      className=" form-control primary-input"
                      showTime={false}
                    />
                  </div>
                  <div class=" form-group col-lg-6 ">
                    <TimePicker
                      style={{ width: "100%", marginTop: "10px" }}
                      placeholder="Select custom time"
                      disabled={!isCustomizationEnabled}
                      className="mb-2 form-control primary-input "
                      onChange={handleTimeSelect}
                      format="HH:mm"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <DemoRegisterComponent
                  date={formattedDate ? formattedDate : selectedDates}
                  time={selectedTime}
                  setDate={setSelectedDates}
                  setTime={setSelectedTime}
                />
              </div>
            </div>
          </section>

          <div>
            <Contact />
          </div>
        </div>
      </PayPulsePageStyled>
      <FooterComponent />
      <Modal
        visible={modalVisible}
        centered
        footer={null}
        onCancel={handleCloseModal}
      >
        <div className="p-3 ">
          <p style={{ fontSize: "18px" }}>
            Join us for a live demonstration of our product, Pay Pulse! We host
            a demo every Wednesday. Click the button below to register.
          </p>
          <div className="d-flex justify-content-center mt-5">
            <button
              className="btn  btn-primary rounded-0"
              onClick={handleScrollTo}
            >
              Register for Demo
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PayPulseLandingPage;

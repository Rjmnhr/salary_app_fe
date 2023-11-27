import React, { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import AxiosInstance from "../../components/axios";
import YouTube from "react-youtube";
import { TrainingPageStyled } from "./style";
import { useNavigate } from "react-router-dom";

export const VideoPlayer = ({ videoId }) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0, // 1 for autoplay
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

const TrainingPage = () => {
  const location = window.location.href;
  const userID = localStorage.getItem("user_id");
  const [startTime, setStartTime] = useState(Date.now());
  const videoId = "GQbg_Ris93Y";

  const navigate = useNavigate();
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

  const [selectedTrainings, setSelectedTrainings] = useState([]);

  const toggleTrainingSelection = (training) => {
    if (selectedTrainings.includes(training)) {
      setSelectedTrainings(selectedTrainings.filter((t) => t !== training));
    } else {
      setSelectedTrainings([...selectedTrainings, training]);
    }
  };

  const registerSelected = () => {
    navigate("/fill-form");
    // Implement your registration logic here
    sessionStorage.setItem("training", JSON.stringify(selectedTrainings));
  };
  return (
    <>
      <NavBar />
      <TrainingPageStyled>
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            justifyItems: "center",
            alignContent: "center",
            marginTop: "100px",
          }}
        >
          <div
            style={{
              padding: "5px 10px",
              background: "powderblue",
              fontWeight: "bold",
            }}
            class="marquee-container"
          >
            <div class="marquee-text">
              <p>
                🚀 Upcoming Trainings on December 3: Executive Compensation,
                Short Term Incentive, Long Term Incentive! 🌟 Don't miss the
                opportunity to enhance your knowledge and skills. Register now!
              </p>
            </div>
          </div>

          <div class="training-section ">
            <div className="col-12 section-title ">
              <h2 class="training-title">
                Upcoming Trainings - December{" "}
                <span
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    fontFamily: "arial",
                  }}
                >
                  3
                </span>
              </h2>
            </div>

            <p
              style={{
                fontSize: "18px",
                color: "#333",
                marginBottom: "10px",
              }}
            >
              Select the trainings you want to attend.
            </p>
            <div
              style={{ display: "grid", placeItems: "center" }}
              className="container mb-2"
            ></div>

            <div class="training-options text-left  ">
              <div class="training-card col-lg-3 col-12">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    className="training-checkbox"
                    onChange={() => toggleTrainingSelection("Executive")}
                  />
                </div>
                <h2>Executive Compensation</h2>
                <p style={{ fontSize: "14px" }}>
                  Join our Executive Compensation training session to stay
                  updated on the latest trends and strategies in executive pay
                  structures.
                </p>
                <p>
                  Timing : <span className="text-primary">11 AM</span> to{" "}
                  <span className="text-primary">1 PM</span> (IST)
                </p>
                <p style={{ fontWeight: "bold" }}>₹2,500 + 10% GST</p>
              </div>

              <div class="training-card col-lg-3 col-12">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    className="training-checkbox"
                    onChange={() => toggleTrainingSelection("Short")}
                  />
                </div>
                <h2>Short Term Incentive</h2>
                <p style={{ fontSize: "14px" }}>
                  Explore the world of Short-Term Incentives and discover how
                  they can drive performance and motivate your team.
                </p>
                <p>
                  Timing : <span className="text-primary">1:15 PM </span>to{" "}
                  <span className="text-primary">3:15 PM</span> (IST )
                </p>
                <p style={{ fontWeight: "bold" }}>₹2,500 + 10% GST</p>
              </div>

              <div class="training-card col-lg-3 col-12">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    className="training-checkbox"
                    onChange={() => toggleTrainingSelection("Long")}
                  />
                </div>
                <h2>Long Term Incentive</h2>
                <p style={{ fontSize: "14px" }}>
                  Dive into the complexities of Long-Term Incentive plans and
                  understand how they can contribute to long-term organizational
                  success.
                </p>
                <p>
                  Timing : <span className="text-primary">3:30 PM</span> to{" "}
                  <span className="text-primary">5:30 PM</span> (IST)
                </p>
                <p style={{ fontWeight: "bold" }}>₹2,500 + 10% GST</p>
              </div>
            </div>
            <button
              className=" btn btn-primary btn-lg mt-3"
              onClick={registerSelected}
              disabled={selectedTrainings.length > 0 ? false : true}
            >
              Register Now!
            </button>
          </div>
          <div className="col-12 section-title ">
            <h2 style={{ width: "100%" }} className="col-12 ">
              Your Training Partner
            </h2>
          </div>
          <div className="text-left p-3">
            <h5 className="mb-2">
              {" "}
              Our training program is unlike other training programs in the
              market. We don't discuss basic theories about compensation or
              information that is readily found on google/youtube.{" "}
            </h5>
            <h5 className="mb-2">
              Our training program has been designed keeping the pragmatic
              compensation professional in mind. The primary focus of our
              training program are to:
            </h5>
            <div class="container col-12 container-fluid   bg-light rounded-3 p-3 p-lg-5 mt-3  ">
              <ul style={{ fontWeight: "bold" }}>
                <li className="mb-2">
                  <span style={{ fontWeight: "bold" }}>
                    Make you more strategic
                  </span>{" "}
                  - we help you understand how compensation programs are built
                  and how they align with corporate goals and business
                  objectives
                </li>
                <li className="mb-2">
                  Make you understand business drivers and how to link various
                  HR functions together with well designed compensation programs
                </li>
                <li className="mb-2">
                  Provide you with a framework and real-life case studies that
                  will help you determine if your programs are working and is
                  best practice
                </li>
                <li className="mb-2">
                  Make you 360 degree leader with an understanding of business
                  strategy, finance, sales and marketing and HR
                </li>
                <li className="mb-2">
                  Discuss first principles of design and implementation of
                  various incentive plans
                </li>
                <li className="mb-2">
                  Learn about emerging trends in compensation and executive
                  compensation including Combined Incentive Plans and executive
                  benchmarking
                </li>
              </ul>
            </div>

            <h5 className="mt-3">
              Most importantly, you will also learn from fellow practitioners
              about how their business operates and how compensation programs
              vary among sectors and stage of maturity
            </h5>
            <h5>
              There are multiple training programs we run. Please enquire with
              us to discuss your specific needs.
            </h5>
            <div class="container col-12 container-fluid   bg-light rounded-3  p-3 p-lg-5 mt-3 ">
              <ul style={{ fontWeight: "bold" }}>
                <li className="mb-2">Compensation masterclass</li>
                <li className="mb-2">Long Term Incentive design</li>
                <li className="mb-2">
                  Compensation principles for line managers
                </li>
                <li className="mb-2">Effective Sales Incentive Plan design</li>
                <li className="mb-2">Executive Compensation</li>
              </ul>
            </div>
          </div>
          <div className="col-12 mt-3 section-title ">
            <h2 style={{ width: "100%" }} className="col-12 ">
              Training Videos
            </h2>
          </div>
          <div className="d-lg-flex">
            <div className="col-6 mb-3">
              <VideoPlayer videoId={videoId} />
            </div>
            <div className="col-6 mb-3">
              <VideoPlayer videoId={"jISQ7nHLzms"} />
            </div>
          </div>
        </div>
      </TrainingPageStyled>
    </>
  );
};

export default TrainingPage;

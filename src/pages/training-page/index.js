import React, { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import AxiosInstance from "../../components/axios";
// import YouTube from "react-youtube";
import { TrainingPageStyled } from "./style";
import { Helmet } from "react-helmet";

// export const VideoPlayer = ({ videoId }) => {
//   const opts = {
//     height: "390",
//     width: "640",
//     playerVars: {
//       autoplay: 0, // 1 for autoplay
//     },
//   };

//   return <YouTube videoId={videoId} opts={opts} />;
// };

const TrainingPage = () => {
  const location = window.location.href;
  const userID = localStorage.getItem("user_id");
  const [startTime, setStartTime] = useState(Date.now());
  // const videoId = "GQbg_Ris93Y";
  // const [selectedOption, setSelectedOption] = useState("3");

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

  // const [selectedTrainings, setSelectedTrainings] = useState([]);

  // const toggleTrainingSelection = (training) => {
  //   if (selectedTrainings.includes(training)) {
  //     setSelectedTrainings(selectedTrainings.filter((t) => t !== training));
  //   } else {
  //     setSelectedTrainings([...selectedTrainings, training]);
  //   }
  // };

  // const registerSelected = () => {
  //   sessionStorage.setItem("training", JSON.stringify(selectedTrainings));
  //   sessionStorage.setItem("date", 9);
  //   navigate("/fill-form");
  //   // Implement your registration logic here
  // };

  // const handleRadioChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  return (
    <>
       <Helmet>
        <title>Training | Equipay Partners</title>
        <meta
      name="description"
      content="Elevate skills, align compensation, stay ahead with EquiPay training."
    />
    <meta
      property="og:description"
      content="Elevate skills, align compensation, stay ahead with EquiPay training."
    />
        {/* Add other meta tags, link tags, etc. as needed */}
      </Helmet>
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
          {/* <div
            style={{
              padding: "5px 10px",
              background: "powderblue",
              fontWeight: "bold",
            }}
            class="marquee-container"
          >
            <div class="marquee-text">
              <p>
                🚀 Upcoming Trainings on December 9: Executive Compensation,
                Short Term Incentive, Long Term Incentive! 🌟 Don't miss the
                opportunity to enhance your knowledge and skills. Register now!
              </p>
            </div>
          </div> */}

          {/* <div class="training-section ">
            <div className="col-12 section-title ">
              <h2 class="training-title">
                Upcoming Trainings - December 9th
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
           <h5>Choose the date</h5>
            <div
              style={{ gap: "15px" }}
              className="w-100 mt-3 d-flex justify-content-center col-lg-12"
            >
              <div className="mb-3">
                <input
                  type="radio"
                  value={"3"}
                  checked={selectedOption === "3"}
                  onChange={handleRadioChange}
                  style={{ marginRight: "8px" }}
                />
                <label>On December 3rd</label>
              </div>
              <div>
                <input
                  type="radio"
                  value={"9"}
                  checked={selectedOption === "9"}
                  onChange={handleRadioChange}
                  style={{ marginRight: "8px" }}
                />
                <label>On December 9th</label>
              </div>
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
              <div
                class="training-card col-lg-3 col-12"
                onClick={() => toggleTrainingSelection("Executive")}
              >
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    className="training-checkbox"
                    onChange={() => toggleTrainingSelection("Executive")}
                    checked={selectedTrainings.includes("Executive")}
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

              <div
                class="training-card col-lg-3 col-12"
                onClick={() => toggleTrainingSelection("Short")}
              >
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    className="training-checkbox"
                    onChange={() => toggleTrainingSelection("Short")}
                    checked={selectedTrainings.includes("Short")}
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

              <div
                class="training-card col-lg-3 col-12"
                onClick={() => toggleTrainingSelection("Long")}
              >
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    className="training-checkbox"
                    onChange={() => toggleTrainingSelection("Long")}
                    checked={selectedTrainings.includes("Long")}
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
              onClick={() => registerSelected()}
              disabled={selectedTrainings.length > 0 ? false : true}
            >
              Register Now!
            </button>
          </div> */}

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
            <div class="container col-12 container-fluid   bg-light rounded-3 mb-3 p-3 p-lg-5 mt-3 ">
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
          {/* <div className="col-12 mt-3 section-title ">
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
          </div> */}
        </div>
        <footer id="footer">
        <div class="footer-top">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-6 footer-contact text-left">
                <h3>
                 Equipay Partners<span>.</span>
                </h3>

                <p>
                  <strong>Indian Headquarter:</strong>
                  <br />
                  11th Main Road, HAL 2nd Stage <br />
                  Indira Nagar, Bangalore,
                  <br />
                  Karnataka-560038
                  <br />
                  <strong>Email:</strong> team@equipaypartners.com
                  <br />
                </p>
              </div>

              <div class="col-lg-2 col-md-6 footer-links text-left">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i class="bx bx-chevron-right"></i> <a href="/#">Home</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="#about">About us</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="#services">Services</a>
                  </li>
                
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="#faq">Frequently Asked Questions</a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-3 col-md-6 footer-links text-left">
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="/price-a-job">Price a job</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="/executive-compensation">Executive compensation</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="sales-incentive">Sales incentive</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="/training">Training</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="/blog">Blog</a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-4 col-md-6 footer-newsletter text-left">
                <h4>Join Our Newsletter</h4>
                <p>
                  Please enter your email if you are interested to read about
                  our regular work, live case studies, what's happening in
                  businesses around and some interesting trends
                </p>
                <form action="" method="post">
                  <input type="email" name="email" />
                  <input type="submit" value="Subscribe" />
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="container d-md-flex py-4">
          <div class="me-md-auto text-center text-md-left"></div>
          <div class="social-links text-center text-md-right pt-3 pt-md-0">
            {/* <a href="/#" class="twitter">
              <i class="bx bxl-twitter"></i>
            </a> */}
            <a href="https://www.facebook.com/profile.php?id=61554618998649" class="facebook" target="_blank"  rel="noreferrer">
              <i class="bx bxl-facebook"></i>
            </a>
            {/* <a href="/#" class="instagram">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="/#" class="google-plus">
              <i class="bx bxl-skype"></i>
            </a> */}
            <a href="https://www.linkedin.com/company/equipay-partners" class="linkedin" target="_blank"  rel="noreferrer">
              <i class="bx bxl-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
      </TrainingPageStyled>
    </>
  );
};

export default TrainingPage;

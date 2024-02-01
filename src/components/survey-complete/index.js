import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../nav-bar";

const SurveyComplete = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div
        className="SurveyCompleter container p-3 "
        style={{
          display: "grid",
          justifyItems: "center",
          alignContent: "center",
          height: "100vh",
        }}
      >
        <div className="survey-container ">
          <img
            width={100}
            className="mb-3"
            src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1704898405/xad03vnvqtkswznqasgd.png"
            alt="salary survey"
          />
          <h1>Thank you for participating in the salary survey</h1>
          <h3>We will send you general market result by 15th March</h3>
        </div>

        <div style={{ gap: "10px" }} className="d-lg-flex mt-5">
          <button onClick={() => navigate("/")} className="btn btn-lg border">
            Home
          </button>
          <button
            onClick={() => navigate("/salary-survey")}
            className="btn btn-lg border"
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default SurveyComplete;

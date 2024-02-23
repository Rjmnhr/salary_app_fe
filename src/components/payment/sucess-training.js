import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


import successTick from "../../icons/check-soft-bg.svg";
import { ArrowLeftOutlined } from "@mui/icons-material";
import AxiosInstance from "../../config/axios";

const SuccessTraining = () => {
  //eslint-disable-next-line
  const [session, setSession] = useState({});
  const location = useLocation();
  const sessionId = location.search.replace("?session_id=", "");
  const storedEmailId = sessionStorage.getItem("userEmail");
  const storedPhone = sessionStorage.getItem("userPhone");
  const storedCompany = sessionStorage.getItem("userCompany");
  const storedTitle = sessionStorage.getItem("userTitle");
  const storedProduct = sessionStorage.getItem("training");
  const storedDate = sessionStorage.getItem("date");
  const [isSuccess, setIsSuccess] = useState(false);
  const [seconds, setSeconds] = useState(5);

  let training = "";
  let timing = "";

  if (storedProduct.includes("Executive")) {
    training += "Executive Compensation";
    timing += "Executive Compensation Timing: 11 AM to 1 PM (IST)";
  }

  if (storedProduct.includes("Short")) {
    if (training !== "") {
      training += ", ";
      timing += " | ";
    }
    training += "Short Term Incentive";
    timing += "Short Term Incentive Timing: 1:15 PM to 3:15 PM (IST)";
  }

  if (storedProduct.includes("Long")) {
    if (training !== "") {
      training += ", ";
      timing += " | ";
    }
    training += "Long Term Incentive";
    timing += "Long Term Incentive Timing: 3:30 PM to 5:30 PM (IST)";
  }

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSession() {
      await AxiosInstance.get("/checkout-session?sessionId=" + sessionId).then(
        async (res) => {
          const response = await res.data;
          setSession(response);

          const product = response.metadata.training_product;
          const status = response.payment_status;
          const email = response.customer_details.email;

          if (status === "paid") {
            RedirectToDownload(email, product);
          }
        }
      );
    }

    if (sessionId) {
      fetchSession();
    }

    //eslint-disable-next-line
  }, [sessionId]);

  const RedirectToDownload = () => {
    AxiosInstance.post(
      "/payment-success-training",
      {
        sessionId: sessionId,
        email: storedEmailId,
        product: storedProduct,
        company: storedCompany,
        title: storedTitle,
        phone: storedPhone,
        date: storedDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        await res.data;
      })
      .catch((err) => console.log(err));

    setIsSuccess(true);
  };

  useEffect(() => {
    if (isSuccess) {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          clearInterval(countdown);
          navigate("/training");
        }
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [seconds, navigate, isSuccess]);

  return (
    <>
      {sessionId ? (
        <div
          className="sr-root"
          style={{
            display: "grid",
            justifyItems: "center",
            height: "100vh",
            alignContent: "center",
          }}
        >
          {/* <div className="sr-section completed-view">
        <div className="sr-callout">
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      </div> */}

          <div className="sr-content p-3 col-12 col-lg-8">
            <div>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                <h1>Thank You for Your Registration!</h1>
                <img
                  style={{ marginLeft: "10px" }}
                  src={successTick}
                  alt=""
                  width={50}
                  height={50}
                />{" "}
              </div>
              <h5>
                Your payment was successful, and we appreciate your interest in
                our training programs
              </h5>
              <h5>
                Your have registered for the{" "}
                <span className="text-primary">{training}</span>
              </h5>
              <h5>
                On December {storedDate}, {timing}{" "}
              </h5>
              <h5>
                {" "}
                we'll send you a reminder 1 or 2 days before the training.
              </h5>
              <p>
                if you have any questions or encounter any issues, please don't
                hesitate to contact our customer support team at
                <span className="text-primary">
                  {" "}
                  team@equipaypartners.com{" "}
                </span>{" "}
                or <span className="text-primary"> +91 6361421365.</span>
              </p>
              <p>Thank you for choosing Equipay Partners.</p>
              <p className="mt-3">
                You will be redirecting automatically in {seconds} seconds
              </p>{" "}
              <button
                onClick={() => navigate("/")}
                style={{
                  fontSize: "20px",
                  margin: "10px",
                  background: "black",
                  color: "white",
                }}
                className="btn "
              >
                <span>
                  <ArrowLeftOutlined />
                </span>
                Go back
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SuccessTraining;

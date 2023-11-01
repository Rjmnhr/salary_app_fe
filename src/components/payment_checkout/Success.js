import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AxiosInstance from "../../components/axios";
import successTick from "../../check-soft-bg.svg";
import { ArrowLeftOutlined } from "@mui/icons-material";

const Success = () => {
  //eslint-disable-next-line
  const [session, setSession] = useState({});
  const location = useLocation();
  const sessionId = location.search.replace("?session_id=", "");

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, [sessionId]);

  useEffect(() => {
    async function fetchSession() {
      await AxiosInstance.get("/checkout-session?sessionId=" + sessionId).then(
        async (res) => {
          const response = await res.data;
          setSession(response);

          const reportProduct = response.metadata.report_product;
          const status = response.payment_status;
          const email = response.customer_details.email;

          if (status === "paid") {
            RedirectToDownload(email, reportProduct);
          }
        }
      );
    }

    if (sessionId) {
      fetchSession();
    }

    //eslint-disable-next-line
  }, [sessionId]);

  const RedirectToDownload = (email, product) => {
    AxiosInstance.post(
      "/payment-success",
      { sessionId: sessionId, email: email, product: product },
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
  };

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
                <h1>Thank You for Your Purchase!</h1>
                <img
                  style={{ marginLeft: "10px" }}
                  src={successTick}
                  alt=""
                  width={50}
                  height={50}
                />{" "}
              </div>

              <h5>
                Your payment was successful, and we appreciate your order of our
                PDF report
              </h5>
              <h5 className="text-primary">
                Your PDF report will be prepared and sent to your email shortly.
              </h5>
              <p>
                Please keep an eye on your inbox for an email from Equipay
                Partners with the subject: "Your Purchased Product"
              </p>
              <p>
                If you don't receive the email within a few minutes, please
                check your spam or promotions folder, as sometimes legitimate
                emails can be filtered there.
              </p>

              <p>
                In the meantime, if you have any questions or encounter any
                issues, please don't hesitate to contact our customer support
                team at
                <span className="text-primary">
                  {" "}
                  team@equipaypartners.com{" "}
                </span>{" "}
                or <span className="text-primary"> +91 6361421365.</span>
              </p>
              <p>
                Thank you for choosing Equipay Partners. We hope you find the
                report valuable and informative.
              </p>

              <button
                onClick={() => navigate("/executive-reports")}
                style={{
                  fontSize: "20px",
                  margin: "10px",
                  background: "linear-gradient(90deg,#2d67b9,#235090)",
                  color: "white",
                }}
                className="btn "
                m
              >
                Purchase More
              </button>
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
                Go to Home
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

export default Success;

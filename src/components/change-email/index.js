import React from "react";
import shieldIcon from "../../icons/encrypted.png";
import emailIcon from "../../icons/gmail.png";
import { ArrowRightOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ChangeEmail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          display: "grid",
          justifyItems: "center",
          alignContent: "center",
          minHeight: "100vh",
        }}
      >
        <img src={shieldIcon} height={100} width={100} alt="" />

        <h1 className="action-headline" data-uia="action-headline">
          <span id="" data-uia="">
            First, let's confirm your identity.
          </span>
        </h1>
        <p className="explanation-text" data-uia="explanation-text">
          <span id="" data-uia="">
            Before you make any changes, we'll just need to make sure it's you.
          </span>
        </p>

        <div
          className="btn border d-flex col-12 w-50"
          onClick={() => navigate("/verification-code")}
        >
          <div className="col-3">
            <img src={emailIcon} height={50} width={50} alt="" />
          </div>
          <div className="d-flex justify-contents-between align-items-center col-9">
            <div>
              <h3>Email a code</h3>

              <p className="factor-button-secondary-text">
                renjithcm.renju@gmail.com
              </p>
            </div>
            <ArrowRightOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmail;

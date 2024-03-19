import React, { useEffect, useState } from "react";
import NavBar from "../layout/nav-bar";
import { Helmet } from "react-helmet";
import PayPulseInput from "./input";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { styled } from "@mui/material/styles";
import { useApplicationContext } from "../../context/app-context";
import { pay_pulse_dashboard_path } from "../../config/constant";
import { useNavigate } from "react-router-dom";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PayPulseInputPage = () => {
  const isPreviousReports = false;

  return (
    <div>
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
        {/* Add other meta tags, link tags, etc. as needed */}
      </Helmet>
      <NavBar />

      <div style={{ marginTop: "100px" }} className="container p-0 ">
        <div className="d-lg-flex justify-content-between align-items-center">
          {isPreviousReports && (
            <div
              className="col-lg-4 d-lg-block d-md-none scrollable-container"
              style={{
                height: "85vh",
                overflowY: "scroll",
                borderRight: "2px solid blue",
              }}
            >
              <PreviousReportComponent />
            </div>
          )}

          <div
            className={` ${
              isPreviousReports ? "col-lg-9" : "col-lg-12"
            } p-0   `}
          >
            <PayPulseInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPulseInputPage;

const PreviousReportComponent = () => {
  const { payPulsePrevReports } = useApplicationContext();
  const navigate = useNavigate();
  const [dataArray, setDataArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(
    parseInt(sessionStorage.getItem("activeIndex")) || 0
  );
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  useEffect(() => {
    setDataArray(payPulsePrevReports);
  }, [payPulsePrevReports]);

  return (
    <div className="p-3">
      <h3 className="mb-3">Previous Reports</h3>
      {dataArray
        ? dataArray.map((data, index) => {
            // Check if the current index is not the first one (index 0)
            if (index !== 0) {
              return (
                <Card
                  className={`card selectable-tab p-2 px-3 text-left mb-3 ${
                    activeIndex === index ? "selected-tab" : ""
                  }`}
                  key={data.report_id}
                  onClick={() => {
                    setActiveIndex(index);
                    sessionStorage.setItem("activeIndex", index);
                    navigate(pay_pulse_dashboard_path);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <p
                    style={{ fontWeight: "500" }}
                    className="fw-b text-primary"
                  >
                    {data.title}
                  </p>
                  <div className="d-flex justify-content-start align-items-center">
                    <p
                      className=" border-right px-2"
                      style={{
                        borderRight: "1px solid",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      <CalendarOutlined /> {data.experience} years
                    </p>
                    <p
                      className=" border-right px-2"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      {" "}
                      <EnvironmentOutlined /> {data.location}
                    </p>
                  </div>

                  <CardActions disableSpacing>
                    <p style={{ margin: "0" }}>See More</p>
                    <ExpandMore
                      expand={expanded[index] || false}
                      onClick={() => handleExpandClick(index)}
                      aria-expanded={expanded[index] || false}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={expanded[index] || false}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div></div>
                  </Collapse>
                </Card>
              );
            }
            // If it's the first element, don't render anything or render something else.
            return null; // or any other component/element you want
          })
        : "Loading...."}
    </div>
  );
};

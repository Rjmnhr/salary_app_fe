import React, { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../reports-page/style.css";
import AxiosInstance from "../../components/axios";
import { Skeleton } from "antd";
import KPIReportComponent from "../../components/KPI-client/report";

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

function SectorList({ data }) {
  return (
    <div>
      <p>
        <span>Sectors :</span>{" "}
        <span className="text-primary" style={{ fontSize: "14px" }}> {data.join(", ")}</span>
      </p>
    </div>
  );
}

const KPIClientOutput = () => {
  const [resultData, setResultData] = useState(null);

  const [expanded, setExpanded] = React.useState(false);
  const role = sessionStorage.getItem("role");

  const storedSectors = JSON.parse(sessionStorage.getItem("sectors-selected"));

  useEffect(() => {
    const formData = new FormData();

    formData.append("role", role);
    formData.append("sectors", storedSectors?.join(","));
    AxiosInstance.post("api/kpi/report", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;

        setResultData(response);
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, []);

  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };
  return (
    <>
      <NavBar />
      {resultData ? (
        <div
          className="container-fluid  d-lg-flex justify-content-center align-items-start"
          style={{ padding: "0", marginTop: "90px" }}
        >
          <div
            className="container-fluid p-3 col-12 col-lg-3  reports-list scrollable-container"
            style={{
              overflowY: "scroll",
              maxHeight: "90vh",
              transform: "transition 0.3s all ease",
            }}
          >
            <Card
              className={`card selectable-tab p-2 px-3 text-left mb-3 selected-tab
                         
                          `}
              style={{ cursor: "pointer" }}
            >
              <p style={{ fontWeight: "500" }} className="fw-b ">
                Role : <span className="text-primary">{role}</span>
              </p>

              <CardActions sx={{ padding: "0" }} disableSpacing>
                <p style={{ margin: "0" }}>See More</p>
                <ExpandMore
                  expand={expanded[0] || false}
                  onClick={() => handleExpandClick(0)}
                  aria-expanded={expanded[0] || false}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded[0] || false} timeout="auto" unmountOnExit>
                <div>
                  <SectorList data={storedSectors} />
                </div>
              </Collapse>
            </Card>
          </div>

          <div
            className="container-fluid col-12 col-lg-9  d-grid "
            style={{
              background: "rgba(0, 0, 0, 0.02)",
              height: "88vh",
              justifyItems: "center",
            }}
          >
            <KPIReportComponent resultData={resultData} role={role} />
          </div>
        </div>
      ) : (
        <>
          <div
            className="container-fluid  d-lg-flex justify-content-center align-items-start"
            style={{
              padding: "0",
              marginTop: "100px",
            }}
          >
            <div
              className="container-fluid p-3 col-12 col-lg-3  reports-list scrollable-container"
              style={{
                overflowY: "scroll",
                height: "90vh",
                transform: "transition 0.3s all ease",
              }}
            >
              <div>
                <Card>
                  <div className="p-2">
                    <Skeleton active />
                  </div>
                </Card>
              </div>
            </div>
            <div
              className="container-fluid col-12 col-lg-9  d-grid "
              style={{
                background: "rgba(0, 0, 0, 0.02)",
                height: "100vh",
                justifyItems: "center",
              }}
            >
              <div
                className="container  col-lg-11 col-12 m-lg-3 m-2 p-1 text-left scrollable-container"
                style={{
                  background: "white",
                  height: "100vh",
                  overflowY: "scroll",
                }}
              >
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default KPIClientOutput;

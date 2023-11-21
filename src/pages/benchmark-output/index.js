import React, { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AimOutlined } from "@ant-design/icons";
import "../reports-page/style.css";

import AxiosInstance from "../../components/axios";

import GenerateBenchmarkReport from "../../components/generate-benchmark-report";
import { Skeleton } from "antd";

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

function CompaniesList({ data }) {
  const companyNames = data.map((company) => company.company_name);

  return (
    <div>
      <p>
        <span>Companies :</span>{" "}
        <span style={{ fontSize: "14px" }}> {companyNames.join(", ")}</span>
      </p>
    </div>
  );
}

const BenchmarkOutput = () => {
  const [resultData, setResultData] = useState([]);
  const [resultData2021, setResultData2021] = useState([]);
  const [resultData2022, setResultData2022] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const role = sessionStorage.getItem("role");
  const storedOption = sessionStorage.getItem("option");
  const roleType = sessionStorage.getItem("roleType");
  const storedCompanies = JSON.parse(
    sessionStorage.getItem("companies-selected")
  );
  const filteredCompanyList = storedCompanies.map((data) => data.company_name);

  useEffect(() => {
    const formData = new FormData();

    formData.append("role", role);
    formData.append("companies", filteredCompanyList?.join(","));
    AxiosInstance.post("api/benchmark/data", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;
        get2021Data();
        get2022Data();
        setResultData(response);
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, []);

  const get2021Data = () => {
    const filteredSymbolList = storedCompanies.map((data) => data.nse_symbol);
    const formData = new FormData();

    formData.append("role", role);
    formData.append("symbols", filteredSymbolList?.join(","));
    formData.append("companies", filteredCompanyList?.join(","));
    AxiosInstance.post("api/benchmark/data/2021", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;
        setResultData2021(response);
      })
      .catch((err) => console.log(err));
  };
  const get2022Data = () => {
    const filteredSymbolList = storedCompanies.map((data) => data.nse_symbol);
    const formData = new FormData();

    formData.append("role", role);
    formData.append("symbols", filteredSymbolList?.join(","));
    formData.append("companies", filteredCompanyList?.join(","));
    AxiosInstance.post("api/benchmark/data/2022", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;
        setResultData2022(response);
      })
      .catch((err) => console.log(err));
  };

  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };
  return (
    <>
      <NavBar />
      {resultData.length > 0 ? (
        <div
          className="container-fluid  d-lg-flex justify-content-center align-items-start 
         "
          style={{ padding: "0", marginTop: "90px" }}
        >
          <div
            className="container-fluid p-3 col-12 col-lg-3  reports-list scrollable-container"
            style={{
              overflowY: "scroll",
              maxHeight: "100vh",
              transform: "transition 0.3s all ease",
            }}
          >
            <Card
              className={`card selectable-tab p-2 px-3 text-left mb-3 selected-tab
                         
                          `}
              style={{ cursor: "pointer" }}
            >
              <p style={{ fontWeight: "500" }} className="fw-b text-primary">
                {role}
              </p>

              {storedOption === "index" ? (
                <p
                  className="border-right px-2"
                  style={{
                    borderRight: "1px solid",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <AimOutlined /> Based on index
                </p>
              ) : storedOption === "size" ? (
                <p
                  className="border-right px-2"
                  style={{
                    borderRight: "1px solid",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <AimOutlined /> Based on size and sector
                </p>
              ) : (
                <p
                  className="border-right px-2"
                  style={{
                    borderRight: "1px solid",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <AimOutlined /> Hand selected
                </p>
              )}

              <p className="px-2">{roleType}</p>

              <CardActions disableSpacing>
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
                  <CompaniesList data={storedCompanies} />
                </div>
              </Collapse>
            </Card>
          </div>

          <div
            className="container-fluid col-12 col-lg-9  d-grid "
            style={{
              background: "rgba(0, 0, 0, 0.02)",
              height: "100vh",
              justifyItems: "center",
            }}
          >
            <GenerateBenchmarkReport
              resultData={resultData}
              resultData2021={resultData2021}
              resultData2022={resultData2022}
              role={role}
            />
          </div>
        </div>
      ) : (
        <>
          <div
            className="container-fluid  d-lg-flex justify-content-center align-items-start 
         "
            style={{ padding: "0", marginTop: "90px" }}
          >
            <div
              className="container-fluid p-3 col-12 col-lg-3  reports-list scrollable-container"
              style={{
                overflowY: "scroll",
                maxHeight: "100vh",
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

export default BenchmarkOutput;

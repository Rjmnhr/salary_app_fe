import React, { useEffect, useState } from "react";
import AxiosInstance from "../axios";
import { Select, message } from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import CurrencyInput from "react-currency-input-field";
import { useNavigate } from "react-router-dom";

const SurveyRegisterComponent = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [sector, setSector] = useState("");
  const [revenue, setRevenue] = useState("");
  const [geographies, setGeographies] = useState("");
  const { Option } = Select;
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const location = window.location.href;
  const userID = localStorage.getItem("user_id");
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

  const [messageApi, contextHolder] = message.useMessage();

  const alertMessage = (content) => {
    messageApi.open({
      type: "error",
      content: content,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!revenue) {
      alertMessage("Revenue is required");
      document.querySelector(".revenue-input").style.border = "1px solid red";
      return;
    }

    if (phone?.length !== 10) {
      alertMessage("Phone number is invalid");
      document.querySelector(".phone-input").style.border = "1px solid red";
      return;
    }

    setIsLoading(true);
    // Assuming formData is an instance of FormData

    sessionStorage.setItem("name", name);
    sessionStorage.setItem("organization", organization);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("title", title);
    sessionStorage.setItem("sector", sector);
    sessionStorage.setItem("revenue", revenue);
    sessionStorage.setItem("geographies", geographies);
    const formData = new FormData();

    formData.append("name", name);
    formData.append("organization", organization);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("title", title);
    formData.append("sector", sector);
    formData.append("revenue", revenue);
    formData.append("geographies", geographies);

    AxiosInstance.post("/api/survey/register", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        //eslint-disable-next-line
        const data = await response.data;

        setIsLoading(false);
      })
      .catch((err) => {
        alert("Message sending Failed");
        console.log("error", err);
      });

    navigate("/survey-upload");
  };

  const handleRevenueChange = (data) => {
    const newValue = data?.replace(/[$,]/g, "");

    const value = parseFloat(newValue);
    setRevenue(value);
  };

  return (
    <div>
      {contextHolder}
      <section id="contact" class="contact p-0">
        <div class="container" data-aos="fade-up">
          <div class="row" data-aos="fade-up" data-aos-delay="100">
            <div class="col-lg-12">
              <form class="php-email-form" onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col form-group">
                    <input
                      required
                      type="text"
                      name="name"
                      class="form-control"
                      id="name"
                      placeholder="Name"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div class="validate"></div>
                  </div>
                  <div class="col form-group">
                    <input
                      required
                      type="email"
                      class="form-control"
                      name="email"
                      id="email"
                      placeholder="Email"
                      data-rule="email"
                      data-msg="Please enter a valid email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div class="validate"></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col form-group">
                    <input
                      required
                      type="text"
                      name="Phone"
                      className="form-control phone-input"
                      id="Phone"
                      placeholder="Phone number"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <div class="validate"></div>
                  </div>
                  <div class="col form-group">
                    <input
                      required
                      type="Title"
                      class="form-control"
                      name="Title"
                      id="Title"
                      placeholder="Title"
                      data-rule="Title"
                      data-msg="Please enter a valid Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <div class="validate"></div>
                  </div>
                </div>

                <div class="form-group">
                  <input
                    required
                    type="text"
                    class="form-control"
                    name="organization"
                    id="organization"
                    placeholder="Organization"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 8 chars of organization"
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                  <div class="validate"></div>
                </div>
                <div className="col form-group border ">
                  <Select
                    className="text-left rounded-1"
                    required
                    showSearch
                    style={{
                      width: "100%",
                      height: "42px",
                      outline: "none",
                      placeholder: "red",
                    }}
                    placeholder="Sector"
                    optionFilterProp="children"
                    onChange={(value) => setSector(value)}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="Information Technology">
                      Information Technology
                    </Option>
                    <Option value="Healthcare">Healthcare</Option>
                    <Option value="Finance and Banking">
                      Finance and Banking
                    </Option>
                    <Option value="Manufacturing">Manufacturing</Option>
                    <Option value="Retail">Retail</Option>
                    <Option value="Education">Education</Option>
                    <Option value="Hospitality and Tourism">
                      Hospitality and Tourism
                    </Option>
                    <Option value="Energy and Utilities">
                      Energy and Utilities
                    </Option>
                    <Option value="Media and Entertainment">
                      Media and Entertainment
                    </Option>
                    <Option value="Non-profit / NGO">Non-profit / NGO</Option>
                    <Option value="Government">Government</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                  <div className="validate"></div>
                </div>
                <div class="row">
                  <div class="col form-group">
                    <CurrencyInput
                      className="revenue-input form-control"
                      placeholder="Revenue"
                      style={{
                        width: "100%",
                        paddingLeft: "10px",
                        border: "1px solid #ced4da",
                        borderRadius: "0.25rem",
                        outline: "none",
                      }}
                      prefix="₹"
                      onValueChange={handleRevenueChange}
                      decimalsLimit={0}
                    />{" "}
                    <div class="validate"></div>
                  </div>
                </div>
                <div class="form-group">
                  <input
                    required
                    type="text"
                    class="form-control"
                    name="geographies"
                    id="geographies"
                    placeholder="Which geographies do you have employees in?"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 8 chars of geographies"
                    onChange={(e) => setGeographies(e.target.value)}
                  />
                  <div class="validate"></div>
                </div>
                <div class="text-center mt-3">
                  <button className="w-75" type="submit">
                    {" "}
                    {isLoading ? <LoadingOutlined /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SurveyRegisterComponent;

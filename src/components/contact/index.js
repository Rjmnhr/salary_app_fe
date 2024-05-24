import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { CheckCircleOutlineRounded } from "@mui/icons-material";
import { LoadingOutlined } from "@ant-design/icons";
import AxiosInstance from "../../config/axios";

const Contact = () => {
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    formData.append("name", name);

    formData.append("subject", subject);

    formData.append("email", email);

    formData.append("details", query);

    AxiosInstance.post("/api/enquiry/send-enquiry", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        //eslint-disable-next-line
        const data = await response.data;

        setIsLoading(false);

        setModalVisible(true);
        e.target.reset();

        setName("");
        setSubject("");
        setEmail("");
        setQuery("");
      })
      .catch((err) => {
        alert("Message sending Failed");
        console.log("error", err);
      });
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <section id="contact" className="contact ">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Contact</h2>
          </div>

          <div className="row " data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-12">
              <form className="php-email-form bg-white" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col form-group">
                    <input
                      required
                      type="text"
                      name="name"
                      className="form-control "
                      id="name"
                      placeholder="Name"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className="validate"></div>
                  </div>
                  <div className="col form-group">
                    <input
                      required
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Email"
                      data-rule="email"
                      data-msg="Please enter a valid email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="validate"></div>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 8 chars of subject"
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <div className="validate"></div>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="message"
                    rows="5"
                    data-msg="Please write something for us"
                    placeholder="Message"
                    onChange={(e) => setQuery(e.target.value)}
                  ></textarea>
                  <div className="validate"></div>
                </div>

                <div className="text-center">
                  <button className="w-75" type="submit">
                    {" "}
                    {isLoading ? <LoadingOutlined /> : " Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Modal
        visible={modalVisible}
        onCancel={handleModalClose}
        onOk={handleModalClose}
      >
        <div className="container p-3 d-flex-column align-items-center">
          <p className="d-flex align-items-center gap-1 ">
            Your enquiry has been sent successfully
            <CheckCircleOutlineRounded sx={{ color: "green" }} />{" "}
          </p>
          <p>We will get back to you soon.</p>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;

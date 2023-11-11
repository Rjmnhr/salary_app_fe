import React, { useEffect, useState } from "react";
import AxiosInstance from "../axios";
import { Modal } from "antd";
import { CheckCircleOutlineRounded } from "@mui/icons-material";
import { LoadingOutlined } from "@ant-design/icons";

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
      <section id="contact" class="contact">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Contact</h2>
          </div>

          <div class="row" data-aos="fade-up" data-aos-delay="100">
            <div class="col-lg-6">
              <div class="row">
                <div class="col-md-12">
                  <div class="info-box">
                    <i class="bx bx-map"></i>
                    <h3>Our Address</h3>
                    <p>Bangalore India</p>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="info-box mt-4">
                    <i class="bx bx-envelope"></i>
                    <h3>Email Us</h3>
                    <p>partner@equipaypartners.com</p>
                  </div>
                </div>
                {/* <div class="col-md-6">
                  <div class="info-box mt-4">
                    <i class="bx bx-phone-call"></i>
                    <h3>Call Us</h3>
                    <p>+61 424 853 384</p>
                  </div>
                </div> */}
              </div>
            </div>

            <div class="col-lg-6">
              <form class="php-email-form" onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col form-group">
                    <input
                      required
                      type="text"
                      name="name"
                      class="form-control"
                      id="name"
                      placeholder="Your Name"
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
                      placeholder="Your Email"
                      data-rule="email"
                      data-msg="Please enter a valid email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div class="validate"></div>
                  </div>
                </div>
                <div class="form-group">
                  <input
                    required
                    type="text"
                    class="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 8 chars of subject"
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <div class="validate"></div>
                </div>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    name="message"
                    rows="5"
                    data-msg="Please write something for us"
                    placeholder="Message"
                    onChange={(e) => setQuery(e.target.value)}
                  ></textarea>
                  <div class="validate"></div>
                </div>

                <div class="text-center">
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

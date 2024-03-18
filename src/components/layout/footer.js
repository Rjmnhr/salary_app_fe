import { Modal } from "antd";
import React, { useState } from "react";
import {
  advisory_page_path,
  blog_page_path,
  pay_pulse_landing_path,
  salary_survey,
  sales_incentive_page_path,
  training_page_path,
} from "../../config/constant";

const FooterComponent = ({ setTrigger, trigger }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [subscriptionEmail, setSubscriptionEmail] = useState("");

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <footer id="footer">
      <div class="footer-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 footer-contact text-left">
              <h3>
                Equipay Partners<span>.</span>
              </h3>

              <p>
                <strong>Indian Headquarter:</strong>
                <br />
                Bangalore, India
                <br />
                <strong>Email:</strong> team@equipaypartners.com
                <br />
              </p>
            </div>

            <div class="col-lg-2 col-md-6 footer-links text-left">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i class="bx bx-chevron-right"></i> <a href="/#">Home</a>
                </li>

                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href="/#services">Services</a>
                </li>

                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href="/#products">Products</a>
                </li>

                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href="/#testimonials">Testimonials</a>
                </li>
              </ul>
            </div>

            <div class="col-lg-3 col-md-6 footer-links text-left">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href={pay_pulse_landing_path}>PayPulse</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href={salary_survey}>Salary survey</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href={training_page_path}>Training</a>
                </li>

                {/* <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href="/executive-compensation">Executive compensation</a>
                </li> */}
                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href={sales_incentive_page_path}>Sales incentive</a>
                </li>
                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href={advisory_page_path}>Advisory</a>
                </li>

                <li>
                  <i class="bx bx-chevron-right"></i>{" "}
                  <a href={blog_page_path}>Blogs</a>
                </li>
              </ul>
            </div>

            <div class="col-lg-4 col-md-6 footer-newsletter text-left">
              <h4>Join Our Newsletter</h4>
              <p>
                Please enter your email if you are interested to read about our
                regular work, live case studies, what's happening in businesses
                around and some interesting trends
              </p>
              <form onSubmit={() => setModalVisible(true)}>
                <SubscriptionModal
                  visible={modalVisible}
                  onClose={closeModal}
                />
                <input
                  type="email"
                  onChange={(e) => setSubscriptionEmail(e.target.value)}
                />
                <input type="submit" disabled={!subscriptionEmail} />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="container d-md-flex py-4">
        <div class="me-md-auto text-center text-md-left"></div>
        <div class="social-links text-center text-md-right pt-3 pt-md-0">
          {/* <a href="/#" class="twitter">
              <i class="bx bxl-twitter"></i>
            </a> */}
          <a
            href="https://www.facebook.com/profile.php?id=61554618998649"
            class="facebook"
            target="_blank"
            rel="noreferrer"
          >
            <i class="bx bxl-facebook"></i>
          </a>
          {/* <a href="/#" class="instagram">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="/#" class="google-plus">
              <i class="bx bxl-skype"></i>
            </a> */}
          <a
            href="https://www.linkedin.com/company/equipay-partners"
            class="linkedin"
            target="_blank"
            rel="noreferrer"
          >
            <i class="bx bxl-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;

const SubscriptionModal = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      title="Thank you for subscribing!"
      onCancel={onClose}
      footer={null}
    >
      <p>
        You're all set to receive our updates and insights. Stay tuned for our
        next newsletter!
      </p>
    </Modal>
  );
};

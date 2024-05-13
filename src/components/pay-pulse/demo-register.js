import { Modal, Form, Input, Button, InputNumber } from "antd";
import { useEffect, useState } from "react";
import AxiosInstance from "../../config/axios";
import { LoadingOutlined } from "@ant-design/icons";

export const DemoRegisterComponent = ({ date, time, setDate, setTime }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true);
  };

  useEffect(() => {
    if (showMessage) {
      if (date && time) {
        setShowMessage(false);
      }
    }
  }, [showMessage, date, time]);

  const onFinish = async (values) => {
    if (!date || !time) {
      setShowMessage(true);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const formData = new FormData();

    formData.append("first_name", values.firstName);
    formData.append("last_name", values.lastName);
    formData.append("organization", values.organization);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("title", values.title);
    formData.append("industry", values.industry);
    formData.append("time", time);
    formData.append("date", date);

    try {
      const response = await AxiosInstance.post(
        "/api/demo/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //eslint-disable-next-line
      const data = await response.data;

      setIsLoading(false);
      handleRegistrationSuccess();
      form.resetFields();
      setDate(null);
      setTime("");
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div>
      <section id="contact" className="contact p-0 ">
        <div className="container p-0" data-aos="fade-up">
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-12">
              <Form form={form} name="register" onFinish={onFinish}>
                <div className="row">
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                    ]}
                    className="col-6"
                  >
                    <Input placeholder="First name" className="primary-input" />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                    className="col-6"
                  >
                    <Input placeholder="Last name" className="primary-input" />
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item
                    name="phone"
                    className="col-6"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Phone"
                      className="primary-input"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                    className="col-6"
                  >
                    <Input placeholder="Email" className="primary-input" />
                  </Form.Item>
                </div>

                <Form.Item
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input your designation!",
                    },
                  ]}
                >
                  <Input placeholder="Designation" className="primary-input" />
                </Form.Item>
                <Form.Item
                  name="organization"
                  rules={[
                    {
                      required: true,
                      message: "Please input your organization!",
                    },
                  ]}
                >
                  <Input placeholder="Organization" className="primary-input" />
                </Form.Item>
                <Form.Item
                  name="industry"
                  rules={[
                    {
                      required: true,
                      message: "Please input your industry!",
                    },
                  ]}
                >
                  <Input placeholder="Industry" className="primary-input" />
                </Form.Item>
                {showMessage && (
                  <p className="text-danger">
                    Please select a date to register!
                  </p>
                )}

                <Form.Item>
                  <div className="text-center">
                    <Button
                      className="primary-btn"
                      htmlType="submit"
                      style={{
                        width: "70%",
                      }}
                    >
                      {isLoading ? <LoadingOutlined /> : "Register"}
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <Modal
        centered
        title="Registration Successful"
        visible={registrationSuccess}
        onCancel={() => setRegistrationSuccess(false)}
        footer={null}
      >
        <p>
          You will receive an email confirmation shortly to the registered email
          address.
        </p>
      </Modal>
    </div>
  );
};

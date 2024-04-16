import { Modal, Select } from "antd";
import { useState } from "react";
import AxiosInstance from "../../config/axios";
import { LoadingOutlined } from "@ant-design/icons";

export const DemoRegisterComponent = ({
  date,
  time,
  setSelectedDates,
  setSelectedTime,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const { Option } = Select;
  const [organization, setOrganization] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    // Assuming formData is an instance of FormData

    const formData = new FormData();

    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("organization", organization);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("title", title);
    formData.append("industry", industry);
    formData.append("time", time);
    formData.append("date", date);

    AxiosInstance.post("/api/demo/register", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        //eslint-disable-next-line
        const data = await response.data;

        setIsLoading(false);
        handleRegistrationSuccess();
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setOrganization("");
        setIndustry("");
        setSelectedDates(null);
        setSelectedTime("");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div>
      <section id="contact" class="contact p-0 ">
        <div class="container" data-aos="fade-up">
          <div class="row" data-aos="fade-up" data-aos-delay="100">
            <div class="col-lg-12">
              <form class="php-email-form bg-white" onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col form-group">
                    <input
                      value={firstName}
                      required
                      type="text"
                      name="first name"
                      class="form-control"
                      id="first name"
                      placeholder="First name"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <div class="validate"></div>
                  </div>
                  <div class="col form-group">
                    <input
                      value={lastName}
                      required
                      type="text"
                      class="form-control"
                      id="last name"
                      placeholder="Last name"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <div class="validate"></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col form-group">
                    <input
                      value={phone}
                      type="text"
                      name="Phone"
                      className="form-control phone-input"
                      id="Phone"
                      placeholder="Phone "
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <div class="validate"></div>
                  </div>

                  <div class="col form-group">
                    <input
                      value={email}
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
                <div class=" form-group">
                  <input
                    value={title}
                    type="Title"
                    class="form-control"
                    name="Title"
                    id="Title"
                    placeholder="Designation"
                    data-rule="Title"
                    data-msg="Please enter a valid Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div class="validate"></div>
                </div>
                <div class="form-group">
                  <input
                    value={organization}
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
                    value={industry}
                    className="text-left rounded-1"
                    showSearch
                    style={{
                      width: "100%",
                    }}
                    placeholder="Industry"
                    optionFilterProp="children"
                    onChange={(value) => setIndustry(value)}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="" disabled>
                      Select Industry
                    </Option>
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

                <div class="text-center mt-3">
                  <button
                    className="w-75"
                    type="submit"
                    disabled={date ? false : true}
                  >
                    {" "}
                    {isLoading ? <LoadingOutlined /> : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Modal
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

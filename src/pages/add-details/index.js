import React, { useState } from "react";
import NavBar from "../../components/nav-bar";
import { Select } from "antd";
import TagInput from "../../components/skill-input";
import { Radio } from "antd";
import { useNavigate } from "react-router-dom";

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const items = [
  {
    value: "No degree",
    label: "No degree",
  },
  {
    value: "Associates",
    label: "Associates",
  },
  {
    value: "Bachelors",
    label: "Bachelors",
  },
  {
    value: "High School Diploma or GED ",
    label: "High School Diploma or GED ",
  },
  {
    value: "Non-Degree Certificate Program",
    label: "Non-Degree Certificate Program",
  },
  {
    value: "Masters Degree (non-MBA)",
    label: "Masters Degree (non-MBA)",
  },
  {
    value: "Master of Business Administration (MBA)",
    label: "Master of Business Administration (MBA)",
  },
  {
    value: "Law Degree (JD, LLM)",
    label: "Law Degree (JD, LLM)",
  },
  {
    value: "Doctorate (PhD)",
    label: "Doctorate (PhD)",
  },
  {
    value: "Health Professional Doctorate (MD, DMD, DVM, DPT, etc.)",
    label: "Health Professional Doctorate (MD, DMD, DVM, DPT, etc.)",
  },
];

const AddDetails = () => {
  const [isSupervise, setIsSupervise] = useState(false);
  const navigate = useNavigate();

  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    checkbox8: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes({
      ...checkboxes,
      [name]: checked,
    });
  };

  return (
    <>
      <NavBar />
      <div
        className="container-fluid  "
        style={{ background: "gainsboro", height: "100vh" }}
      >
        <div
          className="container main-container px-5 col-12 col-lg-8 "
          style={{
            background: "white",
            height: "100vh",
            overflowY: "scroll",
            display: "grid",
            placeItems: "center",
          }}
        >
          <h1>Add details</h1>
          <p className="mb-3">
            We looks at lots of compensable factors to benchmark jobs.
          </p>

          <form
            className="mt-5 text-start"
            style={{ display: "grid", placeItems: "center" }}
          >
            <div className="mb-3 col-12 col-lg-7">
              <label>
                Years of experience typical for someone at full proficiency for
                this role
              </label>

              <input
                type="number"
                className="form-control form-control-lg "
                placeholder="Enter"
              />
            </div>

            <div className="mb-3 col-12 col-lg-7">
              <label>
                Minimum years of experience to be fully proficient for this role
              </label>
              <input
                type="number"
                className="form-control form-control-lg  "
                placeholder="Enter"
              />
            </div>

            <div className="mb-3 col-12 col-lg-7">
              <label>Education</label>
              <br />
              <div className=" form-control px-0 py-1">
                <Select
                  size={"large"}
                  showSearch
                  placeholder="Select education"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  style={{
                    width: "100%",
                    borderRadius: "3px",
                  }}
                  options={items}
                />
              </div>
            </div>

            <div className="mb-3 col-12 col-lg-7">
              <label>
                Choose the most important skills and specialties for this job
              </label>
              <TagInput />
            </div>

            <div className="mb-3 col-12 col-lg-7">
              <label>Will this job supervise employees?</label>
              <br />
              <Radio.Group>
                <Radio.Button
                  onClick={() => setIsSupervise(true)}
                  value="large"
                >
                  Yes
                </Radio.Button>
                <Radio.Button
                  onClick={() => setIsSupervise(false)}
                  value="default"
                >
                  No
                </Radio.Button>
              </Radio.Group>
            </div>

            {isSupervise ? (
              <>
                <div
                  className=" text-start"
                  // style={{ display: "grid", placeItems: "center" }}
                >
                  <div className="mb-3 col-12">
                    <label>
                      Number of people this job will manage both directly and
                      indirectly
                    </label>
                    <input
                      className="form-control form-control-lg  "
                      placeholder="Enter"
                    />
                  </div>
                  <div className="mb-3 col-12">
                    <label>
                      Highest level of employees this job will manage
                    </label>
                    <br />
                    <div className=" form-control px-0 py-1">
                      <Select
                        size={"large"}
                        showSearch
                        placeholder="Select "
                        optionFilterProp="children"
                        filterOption={filterOption}
                        style={{
                          width: "100%",
                          borderRadius: "3px",
                        }}
                        options={[
                          {
                            value: "None",
                            label: "None",
                          },
                          {
                            value: "Individual/Professional Level",
                            label: "Individual/Professional Level",
                          },
                          {
                            value: "Supervisory/Professional Level",
                            label: "Supervisory/Professional Level",
                          },
                          {
                            value: "Middle Management Level ",
                            label: "Middle Management Level ",
                          },
                          {
                            value: "Senior Management Level",
                            label: "Senior Management Level",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="mb-3 col-12">
                    <label>People management tasks</label>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="checkbox1"
                          checked={checkboxes.checkbox1}
                          onChange={handleCheckboxChange}
                        />
                        None
                      </label>
                      <br />

                      <label>
                        <input
                          type="checkbox"
                          name="checkbox2"
                          checked={checkboxes.checkbox2}
                          onChange={handleCheckboxChange}
                        />
                        Hire employees
                      </label>
                      <br />

                      <label>
                        <input
                          type="checkbox"
                          name="checkbox3"
                          checked={checkboxes.checkbox3}
                          onChange={handleCheckboxChange}
                        />
                        Mentor and advise
                      </label>
                      <br />

                      <label>
                        <input
                          type="checkbox"
                          name="checkbox4"
                          checked={checkboxes.checkbox4}
                          onChange={handleCheckboxChange}
                        />
                        Promote employees
                      </label>
                      <br />

                      <label>
                        <input
                          type="checkbox"
                          name="checkbox5"
                          checked={checkboxes.checkbox5}
                          onChange={handleCheckboxChange}
                        />
                        Assign and evaluate work
                      </label>
                      <br />

                      <label>
                        <input
                          type="checkbox"
                          name="checkbox6"
                          checked={checkboxes.checkbox6}
                          onChange={handleCheckboxChange}
                        />
                        Terminate employees
                      </label>
                      <br />

                      <label>
                        <input
                          type="checkbox"
                          name="checkbox7"
                          checked={checkboxes.checkbox7}
                          onChange={handleCheckboxChange}
                        />
                        Review performance annually
                      </label>
                      <br />

                      <label>
                        <input
                          type="checkbox"
                          name="checkbox8"
                          checked={checkboxes.checkbox8}
                          onChange={handleCheckboxChange}
                        />
                        Set pay
                      </label>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </form>

          <button
            onClick={() => navigate("/reports")}
            className="btn btn-primary mb-3 w-75 w-lg-25"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AddDetails;

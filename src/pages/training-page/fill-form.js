import React, { useEffect, useState } from "react";
import CheckoutComponent from "../../components/payment/Checkout";


const FillForm = () => {
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(true);
  const storedTraining = JSON.parse(sessionStorage.getItem("training"));

  let priceTag = "";

  if (storedTraining.length === 1) {
    if (storedTraining.includes("Executive")) {
      priceTag = "price_1OH3grDNZni9rE7FjkBwtY57";
    } else if (storedTraining.includes("Short")) {
      priceTag = "price_1OH3glDNZni9rE7Fmei75z9D";
    } else if (storedTraining.includes("Long")) {
      priceTag = "price_1OH3ggDNZni9rE7Fqby3UmOv";
    }
  } else if (storedTraining.length === 2) {
    if (
      storedTraining.includes("Executive") &&
      storedTraining.includes("Short")
    ) {
      priceTag = "price_1OH3gWDNZni9rE7FE3l8lmYV";
    } else if (
      storedTraining.includes("Executive") &&
      storedTraining.includes("Long")
    ) {
      priceTag = "price_1OH3gMDNZni9rE7FNky1RJ1X";
    } else if (
      storedTraining.includes("Short") &&
      storedTraining.includes("Long")
    ) {
      priceTag = "price_1OH3gCDNZni9rE7FzIch3bL8";
    }
  } else if (storedTraining.length === 3) {
    priceTag = "price_1OH69SDNZni9rE7FQC4ke93L";
  }

  // if (storedTraining.length === 1) {
  //   if (storedTraining.includes("Executive")) {
  //     priceTag = "price_1OH0RzDNZni9rE7FKgdBDH9v";
  //   } else if (storedTraining.includes("Short")) {
  //     priceTag = "price_1OH2lLDNZni9rE7FpDPcwFyk";
  //   } else if (storedTraining.includes("Long")) {
  //     priceTag = "price_1OH2nsDNZni9rE7FFSF5ZoIQ";
  //   }
  // } else if (storedTraining.length === 2) {
  //   if (
  //     storedTraining.includes("Executive") &&
  //     storedTraining.includes("Short")
  //   ) {
  //     priceTag = "price_1OH30GDNZni9rE7FqFEVXjxc";
  //   } else if (
  //     storedTraining.includes("Executive") &&
  //     storedTraining.includes("Long")
  //   ) {
  //     priceTag = "price_1OH2zlDNZni9rE7FjteOV7Yh";
  //   } else if (
  //     storedTraining.includes("Short") &&
  //     storedTraining.includes("Long")
  //   ) {
  //     priceTag = "price_1OH2z1DNZni9rE7Fzd7p8P1c";
  //   }
  // } else if (storedTraining.length === 3) {
  //   priceTag = "price_1OH6AjDNZni9rE7Fpi7NR9gU";
  // }

  useEffect(() => {
    if (email && phone && company && title) {
      sessionStorage.setItem("userEmail", email);
      sessionStorage.setItem("userPhone", phone);
      sessionStorage.setItem("userCompany", company);
      sessionStorage.setItem("userTitle", title);
      setIsActive(false);
      console.log("enter");
    } else {
      setIsActive(true);
    }
  }, [email, phone, company, title]);

  return (
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        height: "100vh",
        alignContent: "center",
      }}
    >
      <section id="contact" class="contact">
        <div class="container col-12 col-lg-10" data-aos="fade-up">
          <h2 className="mb-3">Please the fill the form to register</h2>
          <p style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
            We want to make sure you don't miss the event! Provide your email
            and phone number, and we'll send you a reminder 1 or 2 days before
            the training.
          </p>
          <div class="col-lg-12">
            <form class="php-email-form">
              <div class="row">
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
                <div class="col form-group">
                  <input
                    required
                    type="text"
                    name="Phone"
                    class="form-control"
                    id="na"
                    placeholder="Your Phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div class="validate"></div>
                </div>
              </div>
              <div class="form-group">
                <input
                  required
                  type="text"
                  class="form-control"
                  name="Company"
                  id="company"
                  placeholder="Company name"
                  onChange={(e) => setCompany(e.target.value)}
                />
                <div class="validate"></div>
              </div>
              <div class="form-group">
                <input
                  required
                  type="text"
                  class="form-control"
                  name="Title"
                  id="Title"
                  placeholder="Job title "
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div class="validate"></div>
              </div>
            </form>

            <div class="text-center mt-3">
              <CheckoutComponent
                text={"Continue to payment"}
                price={priceTag}
                plan={"Executive"}
                validation={isActive}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FillForm;

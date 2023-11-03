import React from "react";
import AxiosInstance from "../axios";
import { retrieveAndDecryptDataLocal } from "../data-encryption";

const CheckoutComponent = ({ price, plan, text, action }) => {
  console.log("🚀 ~ file: Checkout.js:6 ~ CheckoutComponent ~ price:", price);
  const userID = retrieveAndDecryptDataLocal("user_id")?.data;

  const handleBuyNow = async () => {
    console.log("entered");
    try {
      const response = await AxiosInstance.post(
        "/create-checkout-session",
        { price: price, plan: plan, action: action, id: userID },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle the response as needed
      console.log(response.data);

      // Redirect to Stripe Checkout page on success
      window.location.href = response.data.url; // Assuming the response contains the URL
    } catch (error) {
      // Handle errors
      console.error("API request failed:", error);
    }
  };
  return (
    <button
      onClick={handleBuyNow}
      style={{
        background: "black",
        color: "white",
      }}
      className="btn border w-75 "
    >
      {text}
    </button>
  );
};

export default CheckoutComponent;

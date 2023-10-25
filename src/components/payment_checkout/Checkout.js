import React from "react";
import AxiosInstance from "../axios";

const CheckoutComponent = ({ price }) => {
  const handleBuyNow = async () => {
    try {
      console.log(
        "🚀 ~ file: Checkout.js:5 ~ CheckoutComponent ~ price:",
        price
      );
      const response = await AxiosInstance.post(
        "/create-checkout-session",
        { price: price },
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
      className="btn border "
    >
      Buy now
    </button>
  );
};

export default CheckoutComponent;

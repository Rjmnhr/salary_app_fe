import React from "react";
import AxiosInstance from "../axios";

const CheckoutComponent = ({ price, plan, text, action, validation }) => {
  const userID = localStorage.getItem("user_id");

  const handleBuyNow = async () => {
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
    <>
      {validation ? (
        <button
          disabled
          onClick={handleBuyNow}
          style={{
            background: "black",
            color: "white",
          }}
          className="btn border w-75 "
        >
          {text}
        </button>
      ) : (
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
      )}
    </>
  );
};

export default CheckoutComponent;

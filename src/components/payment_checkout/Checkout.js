import React, { useEffect, useState } from "react";
import AxiosInstance from "../axios";

const CheckoutComponent = ({ price, plan, text, action }) => {
  const userID = localStorage.getItem("user_id");

  const location = window.location.href;

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

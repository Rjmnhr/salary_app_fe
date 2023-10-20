import React from "react";

const CheckoutComponent = () => {
  return (
    <form
      action="https://equipaypartnersbe-myyduar5.b4a.run/create-checkout-session"
      method="POST"
    >
      <button
        style={{
          background: "black",
          color: "white",
        }}
        className="btn border "
      >
        Buy now
      </button>
    </form>
  );
};

export default CheckoutComponent;

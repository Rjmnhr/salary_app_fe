import React, { useState } from "react";

function SelectableCard() {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`container col-3 border mb-3 ${
        isSelected ? "selected-card" : ""
      }`}
      style={{ padding: "0" }}
      onClick={toggleSelection}
    >
      <div className="container-fluid">
        <p>Software Developer</p>
      </div>
      <div
        className="container-fluid d-grid justify-items-center"
        style={{ background: "gainsboro" }}
      >
        <p>$60k - $117k</p>
        <div
          style={{ height: "60px", width: "160px" }}
          className="d-flex align-items-center"
        >
          <div
            className="col-6"
            style={{ background: "#235090", width: "50%" }}
          ></div>
          <div
            className="col-6"
            style={{ background: "#5389d5", width: "50%" }}
          ></div>
        </div>
        {isSelected && (
          <div className="selected-tick">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="7" fill="#235090" />
              <path
                fill="#fff"
                d="M9.29 13.29l-1.42-1.42a1 1 0 011.42-1.42l2.5 2.5 4.5-4.5a1 1 0 111.42 1.42l-5.92 5.92a1 1 0 01-1.42 0z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectableCard;

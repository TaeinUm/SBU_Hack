import React from "react";
import "./custombtn.css";

const CustomBtn = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="custom-btn">
      {text}
    </button>
  );
};

export default CustomBtn;

import React from "react";
import "./custombtn.css";

const CustomBtn = ({ text, onClick }) => {
  return (
    <button className="pushable" onClick={onClick}>
      <span className="shadow"></span>
      <span className="edge"></span>
      <span className="front">{text}</span>
    </button>
  );
};

export default CustomBtn;

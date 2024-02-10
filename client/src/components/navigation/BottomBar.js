import * as React from "react";
import "./navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BottomBar = () => {
  const navigation = useNavigate();
  const [activeIcon, setActiveIcon] = useState("");

  // Function to handle icon click and update the active state
  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  return (
    <div className="navigation-card">
      {/* First icon */}
      <div
        className={`tab ${activeIcon === "house" ? "active" : ""}`}
        onClick={() => {
          handleIconClick("house");
          navigation("/main");
        }}
      >
        <i className="bottombar_icon bi bi-house"></i>
      </div>

      {/* Second icon */}
      <div
        className={`tab ${activeIcon === "camera" ? "active" : ""}`}
        onClick={() => {
          handleIconClick("map");
          navigation("/main");
        }}
      >
        <i className=" bottombar_icon  bi bi-camera"></i>
      </div>

      {/* Third icon */}
      <div
        className={`tab ${activeIcon === "map" ? "active" : ""}`}
        onClick={() => {
          handleIconClick("map");
          navigation("/donationMap");
        }}
      >
        <i className=" bottombar_icon bi bi-map"></i>
      </div>
    </div>
  );
};

export default BottomBar;

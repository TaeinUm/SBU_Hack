import React, { useEffect } from "react";
import "./navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BottomBar = () => {
  const navigation = useNavigate();
  const [activeIcon, setActiveIcon] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle icon click and update the active state
  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result;
        setSelectedImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // useEffect(() => {
  //   console.log(selectedImage);
  // }, [selectedImage]);

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
        <label htmlFor="file" className="camera_label">
          <i
            className=" bottombar_icon  bi bi-camera"
            style={{ position: "absolute", left: "18px", top: "15px" }}
          />
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ position: "absolute", zIndex: 1 }}
        />
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

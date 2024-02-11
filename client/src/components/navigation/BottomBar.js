import React, { useState } from "react";
import "./navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import CustomBtn from "../profile/CustomBtn";

const BottomBar = ({ defaultHeaders }) => {
  const navigate = useNavigate();
  const [activeIcon, setActiveIcon] = useState("");
  const [file, setFile] = useState(null);
  const location = useLocation();

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };
  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected");
      alert("No file!");
      return;
    }

    const formData = new FormData();
    console.log(file);
    formData.append("img", file);
    console.log(formData.get("img"));
    try {
      const response = await fetch("/api/users/upload", {
        headers: {
          ...defaultHeaders, // Assuming you have existing headers
          //"Content-Type": "multipart/form-data",
          // Add any other headers if needed
        },
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }
      setFile(null);
      navigate("/input");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const UploadBtn = () => {
    return(
      <div className="uploadBtn_container">
        <CustomBtn text={"Upload Receipt"} onClick={handleSubmit}></CustomBtn>
      </div>
    );
  }

  const isMainPage = location.pathname === "/main";

  return (
    <>
      {file && isMainPage ? <UploadBtn /> : null}
      <div className="navigation-card">
        {/* First icon */}
        <div
          className={`tab ${activeIcon === "house" ? "active" : ""}`}
          onClick={() => {
            handleIconClick("house");
            navigate("/main");
          }}
        >
          <i className="bottombar_icon bi bi-house"></i>
        </div>

        {/* Second icon */}
        <div
          className={`tab ${activeIcon === "camera" ? "active" : ""}`}
          onClick={() => {
            handleIconClick("camera");
            navigate("/main");
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
            style={{ position: "absolute", zIndex: 1, opacity: 0 }}
            id="file"
          />
        </div>

        {/* Third icon */}
        <div
          className={`tab ${activeIcon === "map" ? "active" : ""}`}
          onClick={() => {
            handleIconClick("map");
            navigate("/donationMap");
          }}
        >
          <i className="bottombar_icon bi bi-map"></i>
        </div>
      </div>
    </>
  );
};

export default BottomBar;
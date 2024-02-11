import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import LogoImage from "../../assets/images/logo3.png";

const TopBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") !== null;

  return (
    <div className="top-bar">
      <div className="logo-container">
        <img
          src={LogoImage}
          alt="Logo"
          style={{ height: "3.5rem" }}
          onClick={() => {
            navigate("/main");
          }}
        />
      </div>
      {isAuthenticated && (
        <div className="profile-button-container">
          <button
            className="profile-button"
            onClick={() => navigate("/profile")}
          >
            <i className="bi bi-person"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default TopBar;

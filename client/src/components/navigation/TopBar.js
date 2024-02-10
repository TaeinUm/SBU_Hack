import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import LogoImage from "../../assets/images/logo3.png";
import { useSelector } from "react-redux";
const Logo = () => {
  const navigate = useNavigate();

  return (
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
  );
};

const TopBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const ProfileButton = () => {
    return (
      <div className="profile-button-container">
        <button
          className="profile-button"
          onClick={() => {
            navigate("/");
          }}
        >
          <i className="bi bi-person"></i>
        </button>
      </div>
    );
  };

  return (
    <div className="top-bar">
      <Logo />
      {isAuthenticated && <ProfileButton />}
    </div>
  );
};

export default TopBar;

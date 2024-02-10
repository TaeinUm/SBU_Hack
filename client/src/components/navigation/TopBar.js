import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

import Ani1 from "../../assets/Lottie/Ani1.json";
import Ani2 from "../../assets/Lottie/Ani2.json";
import Ani3 from "../../assets/Lottie/Ani3.json";
import Ani4 from "../../assets/Lottie/Ani4.json";
import Ani5 from "../../assets/Lottie/Ani5.json";
import Ani6 from "../../assets/Lottie/Ani6.json";
import Ani7 from "../../assets/Lottie/Ani7.json";
import Ani8 from "../../assets/Lottie/Ani8.json";
import Ani9 from "../../assets/Lottie/Ani9.json";





const Logo = () => {
  return (
    <div className="logo-container">
      <img
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="Logo"
        style={{ maxWidth: "100px" }}
      />
    </div>
  );
};

const TopBar = () => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/"); // Navigate to the profile page
  };

  const ProfileButton = () => {
    return (
      <div className="profile-button-container">
        <button className="profile-button" onClick={handleProfile}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
        </button>
      </div>
    );
  };


  return (
    <div className="top-bar">
      <Logo />
      <ProfileButton />
    </div>
  );
};

export default TopBar;

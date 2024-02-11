import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import LogoImage from "../../assets/images/logo3.png";
import { useRecoilState } from 'recoil';
import { LoginState } from '../../states/LoginState.ts';

const TopBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") !== null;
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);


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
      {isLoggedIn && (
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

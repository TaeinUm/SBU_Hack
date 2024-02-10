import React from "react";
import "./login.css";
import Lottie from "lottie-react";
import LandingAni from "../../assets/Lottie/LandingAnimation.json";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/auth.js";
const Login = ({ defaultHeaders }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePwdInput = (e) => {
    setPwd(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    console.log(userData);
    const res = await fetch("/api/users/auth", {
      ...defaultHeaders,
      method: "POST",
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }

    const user = await res.json();
    dispatch(setCredentials(user));
    navigate("/main");
  };
  return (
    <div className="login_container">
      <form className="login_form" onSubmit={handleLogin}>
        <div className="login_title">
          Welcome,
          <br />
          <span>Sign in to continue</span>
        </div>
        <div className="login_input_container">
          <input
            className="login_input"
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleEmailInput}
            value={email}
            required
            autoComplete="off"
          />
          <input
            className="login_input"
            name="password"
            placeholder="Password"
            type="password"
            onChange={handlePwdInput}
            value={password}
            autoComplete="off"
            required
          />
        </div>
        <div className="login-additional">
          <div onClick={() => navigate("/register")}>
            <em>Dont Have an Account?</em>
          </div>
          <div>Forgot Password?</div>
        </div>
        {errMsg && <div className="error-msg">{errMsg}</div>}
        <button className="login-btn">Let`s go →</button>
      </form>
      <Lottie animationData={LandingAni} />
    </div>
  );
};

export default Login;

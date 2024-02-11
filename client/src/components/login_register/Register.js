import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/auth.js";
import "./register.css";

const Register = ({ defaultHeaders, isAuthenticated }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [confirmPassword, setConfirmPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePwdInput = (e) => {
    setPwd(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = { username, email, password };
    console.log(userData, confirmPassword);
    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match");
      return;
    }
    const res = await fetch("/api/users/register", {
      ...defaultHeaders,
      method: "POST",
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      setErrMsg(errorData.message || "Registration failed");
      throw new Error(errorData.message || "Registration failed");
    }

    const user = await res.json();
    console.log(user);
    dispatch(setCredentials(user));
    navigate("/main");
  };
  return (
    <form className="register_form" onSubmit={handleRegister}>
      <div className="register_title">
        Sign Up <br />
        <span>Just one step away from making a differnce,</span>
      </div>
      <input
        className="register_input"
        name="username"
        placeholder="Username"
        type="text"
        onChange={handleUsernameInput}
        autoComplete="off"
        required
      />
      <input
        className="register_input"
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleEmailInput}
        autoComplete="off"
        required
      />
      <input
        className="register_input"
        name="password"
        placeholder="Password"
        type="password"
        onChange={handlePwdInput}
        autoComplete="off"
        required
      />
      <input
        className="register_input"
        name="password"
        placeholder="Confirm Password"
        type="password"
        autoComplete="off"
        required
        onChange={(e) => setConfirmPwd(e.target.value)}
      />

      <div className="register-additional">
        <div onClick={() => navigate("/")}>
          <em>Already Have an Account?</em>
        </div>
      </div>
      {errMsg && <div className="error-msg">{errMsg}</div>}
      <button className="register-btn">Sign Up</button>
    </form>
  );
};

export default Register;

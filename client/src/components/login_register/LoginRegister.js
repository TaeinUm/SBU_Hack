// import React from "react";
// import { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../../store/auth.js";

// import "./login_register.css";

// const LoginRegister = ({ defaultHeaders }) => {
//   const userRef = useRef(null); // For setting focus on form
//   const errRef = useRef(null);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPwd] = useState("");
//   const [errMsg, setErrMsg] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     userRef.current.focus();
//   }, []);
//   useEffect(() => {
//     setErrMsg("");
//   }, [username, password]);

//   const handleUsernameInput = (e) => {
//     setUsername(e.target.value);
//   };
//   const handleEmailInput = (e) => {
//     setEmail(e.target.value);
//   };
//   const handlePwdInput = (e) => {
//     setPwd(e.target.value);
//   };
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const userData = { email, password };

//     const res = await fetch("/api/users/auth", {
//       ...defaultHeaders,
//       method: "POST",
//       body: JSON.stringify(userData),
//     });
//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.message || "Login failed");
//     }

//     const user = await res.json();
//     dispatch(setCredentials(user));
//     navigate("/main");
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const userData = { username, email, password };
//     const res = await fetch("/api/users/register", {
//       ...defaultHeaders,
//       method: "POST",
//       body: JSON.stringify(userData),
//     });
//     if (!res.ok) {
//       const errorData = await res.json();
//       setErrMsg(errorData.message || "Registration failed");
//       throw new Error(errorData.message || "Registration failed");
//     }

//     const user = await res.json();
//     console.log(user);
//     dispatch(setCredentials(user));
//     navigate("/");
//     // navigate("/main");
//   };

//   return (
//     <div className="wrapper">
//       <div className="card-switch">
//         <label className="switch">
//           <input type="checkbox" className="toggle" />
//           <span className="slider"></span>
//           <span className="card-side"></span>
//           <div className="flip-card__inner">
//             <div className="flip-card__front">
//               <div className="title">Log in</div>
//               <form className="flip-card__form" onSubmit={handleLogin}>
//                 <input
//                   className="flip-card__input"
//                   name="email"
//                   placeholder="Email"
//                   type="email"
//                   onChange={handleEmailInput}
//                   value={email}
//                   ref={userRef}
//                   required
//                   autoComplete="off"
//                 />
//                 <input
//                   className="flip-card__input"
//                   name="password"
//                   placeholder="Password"
//                   type="password"
//                   onChange={handlePwdInput}
//                   value={password}
//                   autoComplete="off"
//                   required
//                 />
//                 {/* <p
//                   className={errMsg ? "errmsg" : "offscreen"}
//                   ref={errRef}
//                   aria-live="assertive"
//                 >
//                   {errMsg}
//                 </p> */}
//                 <button className="flip-card__btn">Let`s go!</button>
//               </form>
//             </div>
//             <div className="flip-card__back">
//               <div className="title">Sign up</div>
//               <form className="flip-card__form" onSubmit={handleRegister}>
//                 <input
//                   className="flip-card__input"
//                   placeholder="Username"
//                   type="text"
//                   onChange={handleUsernameInput}
//                   required
//                 />
//                 <input
//                   className="flip-card__input"
//                   name="email"
//                   placeholder="Email"
//                   type="email"
//                   onChange={handleEmailInput}
//                   required
//                 />
//                 <input
//                   className="flip-card__input"
//                   name="password"
//                   placeholder="Password"
//                   type="password"
//                   onChange={handlePwdInput}
//                   autoComplete="off"
//                   required
//                 />
//                 <button className="flip-card__btn">Confirm!</button>
//               </form>
//             </div>
//           </div>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default LoginRegister;
import React from "react";

const LoginRegister = () => {
  return <div>LoginRegister</div>;
};

export default LoginRegister;

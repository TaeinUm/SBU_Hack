import React, { useEffect, useState } from "react";
import "./index.css";
import App from "./App.js";
import MainPage from "./components/mainpage/MainPage";
import { createBrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
import DonationMap from "./components/donation/DonationMap.js";
import Login from "./components/login_register/Login.js";
import Register from "./components/login_register/Register.js";
import InputPage from "./components/input/InputPage.js";
import Profile from "./components/profile/Profile.js";

// const localUser = localStorage.getItem("user");
// const userData = JSON.parse(localUser);
// let isEmpty = userData === null;
// console.log(userData);
// console.log(isEmpty);
const isAuthenticated = localStorage.getItem("isAuthenticated") !== null;
console.log(isAuthenticated);
const defaultHeaders = {
  headers: {
    "Content-Type": "application/json",
    credentials: "include",
    // Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  },
};

const router = createBrowserRouter([
  {
    element: (
      <App defaultHeaders={defaultHeaders} isAuthenticated={isAuthenticated} />
    ),

    children: [
      {
        path: "/",
        element: (
          <Login
            defaultHeaders={defaultHeaders}
            isAuthenticated={isAuthenticated}
          />
        ),
      },
      {
        path: "/register",
        // path: "/",
        element: (
          <Register
            defaultHeaders={defaultHeaders}
            isAuthenticated={isAuthenticated}
          />
        ),
      },
      {
        path: "/main",
        // path: "/",
        element: (
          <MainPage
            defaultHeaders={defaultHeaders}
            isAuthenticated={isAuthenticated}
          />
        ),
      },
      {
        path: "/donationMap",
        // path: "/",
        element: (
          <DonationMap
            defaultHeaders={defaultHeaders}
            isAuthenticated={isAuthenticated}
          />
        ),
      },

      {
        path: "/input",
        // path: "/",
        element: (
          <InputPage
            defaultHeaders={defaultHeaders}
            isAuthenticated={isAuthenticated}
          />
        ),
      },
      {
        // path: "/",
        path: "/profile",
        element: (
          <Profile
            defaultHeaders={defaultHeaders}
            isAuthenticated={isAuthenticated}
          />
        ),
      },
    ],
  },
]);
export default router;

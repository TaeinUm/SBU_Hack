import React, { useEffect } from "react";
import "./index.css";
import App from "./App.js";
import MainPage from "./components/mainpage/MainPage";
import { createBrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
import DonationMap from "./components/donation/DonationMap.js";
import Login from "./components/login_register/Login.js";
import Register from "./components/login_register/Register.js";

const token = Cookies.get("jwt");
const defaultHeaders = {
  headers: {
    "Content-Type": "application/json",
    credentials: "include",
    Authorization: `Bearer ${token}`,
  },
};

const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        path: "/",
        element: <Login defaultHeaders={defaultHeaders} />,
      },
      {
        path: "/register",
        element: <Register defaultHeaders={defaultHeaders} />,
      },
      {
        path: "/main",
        element: <MainPage defaultHeaders={defaultHeaders} />,
      },
      {
        path: "/donationMap",
        element: <DonationMap defaultHeaders={defaultHeaders}/>,
      }

    ],
  },
]);
export default router;

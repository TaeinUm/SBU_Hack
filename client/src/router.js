import React, { useEffect } from "react";
import "./index.css";
import App from "./App.js";
import MainPage from "./components/mainpage/MainPage";
import { createBrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
import DonationMap from "./components/donation/DonationMap.js";
import Login from "./components/login_register/Login.js";
import Register from "./components/login_register/Register.js";
import InputPage from "./components/input/InputPage.js";

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
        // path: "/",
        element: <Register defaultHeaders={defaultHeaders} />,
      },
      {
        path: "/main",
        // path: "/",
        element: <MainPage defaultHeaders={defaultHeaders} />,
      },
      {
        path: "/donationMap",
        // path: "/",
        element: <DonationMap defaultHeaders={defaultHeaders} />,
      },
      {
        path: "/input",
        // path: "/",
        element: <DonationMap defaultHeaders={defaultHeaders}/>,
      },
      {
        // path: "/input",
        path: "/",
        element: <InputPage defaultHeaders={defaultHeaders} />,
      },
    ],
  },
]);
export default router;

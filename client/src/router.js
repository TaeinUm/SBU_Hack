import React, { useEffect } from "react";
import "./index.css";
import App from "./App.js";
import LoginRegister from "./components/login_register/LoginRegister";
import MainPage from "./components/mainpage/MainPage";
import { createBrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";

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
        element: <LoginRegister defaultHeaders={defaultHeaders} />,
      },
      {
        path: "/main",
        element: <MainPage defaultHeaders={defaultHeaders} />,
      },
    ],
  },
]);
export default router;

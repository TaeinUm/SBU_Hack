import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CheckAuth({ children }) {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const token = Cookies.get("token");

  console.log(auth, token);

  useEffect(() => {
    if (!auth.isAuthenticated && !token) {
      // Redirect to login if user is not authenticated and there is no token
      <Navigate to={"/"} />;
    }
  }, [auth.isAuthenticated, token]);

  return auth.isAuthenticated || token ? children : <Navigate to={"/"} />;
}

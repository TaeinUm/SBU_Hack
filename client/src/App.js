import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./components/navigation/TopBar";
import BottomBar from "./components/navigation/BottomBar";
import { useRecoilState } from "recoil";
import { LoginState } from "./states/LoginState.ts";
import IntroPage from "./components/intro/IntroPage.js";

function App({ defaultHeaders }) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500); // 4.6s

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        // Display loading page
        <IntroPage />
      ) : (
        // Display main content
        <div className="App">
          <TopBar />
          <div className="app_content">
            <Outlet />
          </div>
          {isLoggedIn ? (
            <BottomBar defaultHeaders={defaultHeaders} />
          ) : (
            <div className="footer_container">
              <i className="bi bi-c-circle" /> &nbsp; ɴᴀᴇɴɢᴊᴀɴɢɢᴏ
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;

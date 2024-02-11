import "./App.css";
import { Outlet } from "react-router-dom";
import TopBar from "./components/navigation/TopBar";
import BottomBar from "./components/navigation/BottomBar";
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { LoginState } from './states/LoginState.ts';

function App({ defaultHeaders }) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);


  const isAuthenticated = localStorage.getItem("isAuthenticated") !== null;
  return (
    <>
      <div className="App">
        <TopBar />
        <div className="app_content">
          <Outlet />
        </div>
        {isLoggedIn ? (
          <BottomBar defaultHeaders={defaultHeaders} />
        ) : (
          <div className="footer_container">
            <i class="bi bi-c-circle" /> &nbsp; ɴᴀᴇɴɢᴊᴀɴɢɢᴏ
          </div>
        )}
      </div>
    </>
  );
}
export default App;

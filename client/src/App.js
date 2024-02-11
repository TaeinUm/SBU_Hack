import "./App.css";
import { Outlet } from "react-router-dom";
import TopBar from "./components/navigation/TopBar";
import BottomBar from "./components/navigation/BottomBar";
import { useEffect, useState } from "react";

function App({ defaultHeaders }) {
  // const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = localStorage.getItem("isAuthenticated") !== null;
  return (
    <>
      <div className="App">
        <TopBar />
        <div className="app_content">
          <Outlet />
        </div>
        {isAuthenticated ? (
          <BottomBar defaultHeaders={defaultHeaders} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
export default App;

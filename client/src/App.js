import "./App.css";
import { Outlet } from "react-router-dom";
import TopBar from "./components/navigation/TopBar";
import BottomBar from "./components/navigation/BottomBar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const showNavBar =
    location.pathname === "/main" ||
    location.pathname === "/input" ||
    location.pathname === "/donationMap" ||
    location.pathname === "/profile";

  const [currUser, setCurrUser] = useState(null);

  return (
    <>
      {showNavBar ? (
        <div className="App">
          <TopBar />
          <div className="app_content">
            <Outlet />
          </div>
          {/* {isAuthenticated && <BottomBar />} */}
          <BottomBar />
        </div>
      ) : (
        <div className="App">
          <TopBar />
          <div className="app_content">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
export default App;

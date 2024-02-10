import { useState } from "react";
import "./App.css";

import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const dispatch = useDispatch();

  return (
    <>
      <div>Welcome</div>
      <div className="App">
        <Outlet />
      </div>
    </>
  );
}
export default App;

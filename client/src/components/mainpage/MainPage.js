import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { logout } from "../../store/auth";

const MainPage = ({ defaultHeaders }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newPassword, setNewPwd] = useState("");
  const [userData, setUserData] = useState([]);
  const [updating, setUpdating] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    const res = await fetch("/api/users/profile", {
      ...defaultHeaders,
      method: "GET",
    });
    const user = await res.json();

    const { _id, username, email } = user;
    setUserData(user);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: defaultHeaders,
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      Cookies.remove("jwt");
      dispatch(logout());
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleUpdateUser = async () => {
    console.log(userData, newPassword);
    try {
      const res = await fetch("/api/users/profile", {
        ...defaultHeaders,
        method: "PUT",
        body: JSON.stringify({
          // userId: userData._id,
          username: userData.username,
          email: userData.email,
          password: newPassword,
        }),
      });
      if (!res.ok) {
        throw new Error("Update failed");
      }
      const updatedUser = await res.json();
      setUserData(updatedUser);
      setUpdating(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleRemoveUser = async () => {
    try {
      const res = await fetch("/api/users/profile", {
        ...defaultHeaders,
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Delete failed");
      }

      Cookies.remove("jwt");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      MainPage
      <div>
        <button onClick={handleLogout}>logout user</button>
        <button onClick={() => setUpdating(true)}>update user</button>
        <button onClick={handleRemoveUser}>remove user</button>
      </div>
      {updating ? (
        <div>
          <input
            type="text"
            value={userData.username || ""}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
          <input
            type="email"
            value={userData.email || ""}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setNewPwd(e.target.value)}
          />
          <button onClick={() => setUpdating(false)}>Cancel</button>
          <button onClick={handleUpdateUser}>Update Info</button>
        </div>
      ) : (
        <div>
          <div>{`NAME: ${userData.username}`}</div>
          <div>{`EMAIL: ${userData.email}`}</div>
        </div>
      )}
    </div>
  );
};

export default MainPage;

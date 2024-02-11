import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import Cookies from "js-cookie";
import { logout } from "../../store/auth";
import "./profile.css";
import Ani1 from "../../assets/Lottie/Ani1.json";
import Ani2 from "../../assets/Lottie/Ani2.json";
import Ani3 from "../../assets/Lottie/Ani3.json";
import Ani4 from "../../assets/Lottie/Ani4.json";
import Ani5 from "../../assets/Lottie/Ani5.json";
import Ani6 from "../../assets/Lottie/Ani6.json";
import Ani7 from "../../assets/Lottie/Ani7.json";
import Ani8 from "../../assets/Lottie/Ani8.json";
import Ani9 from "../../assets/Lottie/Ani9.json";

import CustomBtn from "./CustomBtn";

const Profile = ({ defaultHeaders, isAuthenticated }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newPassword, setNewPwd] = useState("");
  const [userData, setUserData] = useState([]);
  const [updating, setUpdating] = useState(false);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const animationData = [Ani1, Ani2, Ani3, Ani4, Ani5, Ani6, Ani7, Ani8, Ani9];

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
    console.log("Logout");
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: defaultHeaders,
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      Cookies.remove("jwt");
      localStorage.removeItem("isAuthenticated");
      dispatch(logout());
      navigate("/");
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
    console.log("Remove user");
    try {
      const res = await fetch("/api/users/profile", {
        ...defaultHeaders,
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Delete failed");
      }

      Cookies.remove("jwt");
      localStorage.removeItem("isAuthenticated");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="profile_container">
      <div className="card-client">
        <div className="user-picture">
          <Lottie
            animationData={
              animationData[Math.floor(Math.random() * animationData.length)]
            }
          />
        </div>
        {updating ? (
          <div>
            <div className="profile_update_container">
              <div className="form__group field">
                <input
                  type="text"
                  className="form__field"
                  placeholder="Name"
                  value={userData.username || ""}
                  required=""
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
                <label htmlFor="name" className="form__label">
                  Username
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="email"
                  className="form__field"
                  placeholder="Email"
                  value={userData.email || ""}
                  required=""
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
                <label htmlFor="name" className="form__label">
                  Email
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="password"
                  className="form__field"
                  placeholder="Password"
                  onChange={(e) => setNewPwd(e.target.value)}
                />
                <label htmlFor="name" className="form__label">
                  New Password
                </label>
              </div>
            </div>

            <div className="updatebtn_container">
              <CustomBtn text={"Cancel"} onClick={() => setUpdating(false)} />
              <CustomBtn text={"Update Info"} onClick={handleUpdateUser} />
            </div>
          </div>
        ) : (
          <>
            <p className="name-client">
              {userData.username}
              <br />
              <br />
              <span>{userData.email}</span>
            </p>
            <br />
            <div className="updatebtn_container">
              <CustomBtn
                text={"Update User Info"}
                onClick={() => setUpdating(true)}
              />
              <CustomBtn text={"Remove Account"} onClick={handleRemoveUser} />
              <CustomBtn text={"Logout"} onClick={handleLogout} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;

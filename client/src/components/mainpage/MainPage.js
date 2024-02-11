import React from "react";
import "./mainpage.css";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { LoginState } from "../../states/LoginState.ts";
import { useNavigate } from "react-router-dom";

const CheckboxItem = ({ index, product, exp_date, is_donatable }) => {
  return (
    <>
      <input
        value={product}
        name="data"
        type="checkbox"
        id={index}
        className=""
      />
      <label htmlFor={index}>{`${product} : ${exp_date} \u00A0\u00A0 ${
        is_donatable ? "O" : "X"
      }`}</label>
    </>
  );
};

const MainPage = ({ defaultHeaders }) => {
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const userId = userData._id;
  const [items, setItems] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    console.log(userData);
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/users/${userId}/products`, {
          method: "GET",
          headers: {
            ...defaultHeaders,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div id="checklist">
      {items.map((item) => (
        <CheckboxItem
          key={item.index}
          index={item.index}
          product={item.productName}
          exp_date={item.expdate}
          is_donatable={item.donatable}
        />
      ))}
    </div>
  );
};

export default MainPage;

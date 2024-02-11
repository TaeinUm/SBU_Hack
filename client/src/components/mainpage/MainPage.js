import React from "react";
import "./mainpage.css";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { LoginState } from "../../states/LoginState.ts";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import NoDataIndicator from "../../assets/Lottie/NoDataIndicator.json";

const NonDonatableItem = ({ index, product, exp_date, is_donatable }) => {
  return (
    <>
      <input value={product} name="data" type="checkbox" id={index} />
      <label htmlFor={index}>{`${product} : ${exp_date} `}</label>
    </>
  );
};
const DonatableItem = ({ index, product, exp_date, is_donatable }) => {
  return (
    <>
      <input value={product} name="data" type="checkbox" id={index} />
      <label htmlFor={index}>{`${product} : ${exp_date} `}</label>
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
    <div>
      {items.length === 0 ? (
        <div className="mainpage_container">
          <div className="mainpage_desc">
            You currently <strong>do not</strong> have any products bought.
            <br />
            <br />
            <span>Click the camera icon</span> below, <br /> to scan or upload a
            reciept!
          </div>
          <Lottie
            style={{ width: "15rem", height: "15rem" }}
            animationData={NoDataIndicator}
          />
        </div>
      ) : (
        <>
          <div className="checklist_title">Products Donatable</div>
          <div className="checklist donatable_container">
            {items.map(
              (item) =>
                item.donatable && (
                  <DonatableItem
                    key={item.index}
                    index={item.index}
                    product={item.productName}
                    exp_date={item.expdate}
                    is_donatable={item.donatable}
                  />
                )
            )}
          </div>
          <div className="checklist_title">Non-Donatable Item</div>
          <div className="checklist non_donatable_container">
            {items.map(
              (item) =>
                !item.donatable && (
                  <NonDonatableItem
                    key={item.index}
                    index={item.index}
                    product={item.productName}
                    exp_date={item.expdate}
                    is_donatable={item.donatable}
                  />
                )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;

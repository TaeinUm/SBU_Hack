import React from "react";
import "./mainpage.css";
import { useState, useEffect } from "react";

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

const MainPage = () => {
  const [auth, setAuth] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated") !== null;

  const items = [
    {
      index: "01",
      product: "Fruit1",
      exp_date: "2024/3/23",
      is_donatable: true,
    },
    {
      index: "02",
      product: "Fruit2",
      exp_date: "2024/3/23",
      is_donatable: false,
    },
    {
      index: "03",
      product: "Fruit3",
      exp_date: "2024/3/23",
      is_donatable: false,
    },
    {
      index: "04",
      product: "Fruit4",
      exp_date: "2024/3/23",
      is_donatable: false,
    },
    {
      index: "05",
      product: "Fruit5",
      exp_date: "2024/3/23",
      is_donatable: true,
    },
    {
      index: "06",
      product: "Fruit6",
      exp_date: "2024/3/23",
      is_donatable: true,
    },
    {
      index: "07",
      product: "Fruit7",
      exp_date: "2024/3/23",
      is_donatable: true,
    },
    {
      index: "08",
      product: "Fruit8",
      exp_date: "2024/3/23",
      is_donatable: true,
    },
    {
      index: "09",
      product: "Fruit9",
      exp_date: "2024/3/23",
      is_donatable: true,
    },
    {
      index: "10",
      product: "Fruit10",
      exp_date: "2024/3/23",
      is_donatable: true,
    },
    {
      index: "11",
      product: "Fruit11",
      exp_date: "2024/3/23",
      is_donatable: true,
    },
    {
      index: "12",
      product: "Fruit12",
      exp_date: "2024/3/23",
      is_donatable: true,
    },
    {
      index: "13",
      product: "Fruit12",
      exp_date: "2024/3/23",
      is_donatable: true,
    },
    {
      index: "14",
      product: "Fruit12",
      exp_date: "2024/3/23",
      is_donatable: true,
    },
  ];

  return (
    <div id="checklist">
      {items.map((item) => (
        <CheckboxItem
          key={item.index}
          index={item.index}
          product={item.product}
          exp_date={item.exp_date}
          is_donatable={item.is_donatable}
        />
      ))}
    </div>
  );
};

export default MainPage;

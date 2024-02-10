import React, { useState } from "react";
import "./inputpage.css";
import CustomInput from "./CustomInput";

const InputPage = () => {
  const [items, setItems] = useState([
    {
      index: "01",
      product: "Fruit1",
      exp_date: "",
      is_donatable: false,
    },
    {
      index: "02",
      product: "Fruit2",
      exp_date: "",
      is_donatable: false,
    },
    {
      index: "03",
      product: "Fruit3",
      exp_date: "",
      is_donatable: false,
    },
    {
      index: "04",
      product: "Fruit4",
      exp_date: "",
      is_donatable: false,
    },
    {
      index: "05",
      product: "Fruit5",
      exp_date: "",
      is_donatable: false,
    },
    {
      index: "06",
      product: "Fruit6",
      exp_date: "",
      is_donatable: false,
    },
    {
      index: "07",
      product: "Fruit7",
      exp_date: "",
      is_donatable: false,
    },
    {
      index: "08",
      product: "Fruit8",
      exp_date: "",
      is_donatable: false,
    },
    {
      index: "09",
      product: "Fruit9",
      exp_date: "",
      is_donatable: false,
    },
    {
      index: "10",
      product: "Fruit10",
      exp_date: "",
      is_donatable: false,
    },
  ]);

  const handleInputChange = (index, value) => {
    const updatedItems = items.map((item) =>
      item.index === index ? { ...item, product: value } : item
    );
    setItems(updatedItems);
  };

  const handleCheckboxChange = (index, checked) => {
    console.log(index);
    const updatedItems = items.map((item) =>
      item.index === index ? { ...item, is_donatable: checked } : item
    );
    setItems(updatedItems);
  };

  const handleUpdate = () => {
    console.log(items);
  };

  return (
    <div>
      <div className="inputpage_container">
        <h2>Edit your food data</h2>
        {items.map((item) => (
          <CustomInput
            key={item.index}
            index={item.index}
            product={item.product}
            isDonatable={item.is_donatable}
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>
      <div className="inputpage_btn_container">
        <button onClick={handleUpdate}> Update Food Data</button>
      </div>
    </div>
  );
};

export default InputPage;

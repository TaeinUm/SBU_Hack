import React from "react";
import "./custominput.css";

const CustomInput = ({
  index,
  product,
  isDonatable,
  onInputChange,
  onCheckboxChange,
}) => {
  const handleInputChange = (event) => {
    onInputChange(index, event.target.value);
  };

  const handleCheckboxChange = (event) => {
    onCheckboxChange(index, event.target.checked);
  };

  return (
    <div className="input_data_row">
      <input
        className="input"
        name="text"
        type="text"
        value={product}
        onChange={handleInputChange}
      />
      <input
        placeholder="Exp Date"
        className="input"
        name="exp_date"
        type="text"
      />
      <div className="checkbox-wrapper-10">
        <input
          className="tgl tgl-flip"
          id={`cb5 cbx${index}`}
          type="checkbox"
          checked={isDonatable}
          onChange={handleCheckboxChange}
        />
        <label
          className="tgl-btn"
          data-tg-off="Nope"
          data-tg-on="Donate!"
          htmlFor={`cb5 cbx${index}`}
        ></label>
      </div>
    </div>
  );
};

export default CustomInput;

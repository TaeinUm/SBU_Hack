import React from "react";
import "./custominput.css";

const CustomInput = ({
  index,
  product,
  isDonatable,
  onInputChange,
  onCheckboxChange,
  onDateChange,
}) => {
  const handleInputChange = (event) => {
    onInputChange(index, event.target.value);
  };
  const handleDateChange = (event) => {
    onDateChange(index, event.target.value); // Call onDateChange when date changes
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
        className="input exp_date_input"
        name="exp_date"
        type="date"
        onChange={handleDateChange}
        style={{ width: "8rem" }}
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

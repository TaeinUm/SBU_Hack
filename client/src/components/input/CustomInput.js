// import React from "react";
// import "./custominput.css";
// const CustomInput = () => {
//   return (
//     <div className="input_data_row">
//       <input class="input" name="text" type="text" value />
//       <input placeholder="Exp Date" class="input" name="exp_date" type="text" />
//       <div class="container">
//         <input
//           type="checkbox"
//           id="cbx2"
//           style={{ display: "none" }}
//           onChange={() => {
//             console.log("hi");
//           }}
//         />
//         <label htmlFor="cbx2" class="check">
//           <svg width="18px" height="18px" viewBox="0 0 18 18">
//             <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
//             <polyline points="1 9 7 14 15 4"></polyline>
//           </svg>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default CustomInput;
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

      <input
        type="checkbox"
        id={`cbx${index}`}
        checked={isDonatable}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default CustomInput;

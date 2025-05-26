import React from "react";

function Input({ type, id, ...inputProps }) {
  const inputStyles =
    "border-2 border-gray-300 rounded-lg outline-0 focus:shadow-md pl-1";
  return <input className={inputStyles} type={type} id={id} {...inputProps} />;
}

export default Input;

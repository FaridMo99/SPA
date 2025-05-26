import React from "react";

function Button({
  text,
  disabled = false,
  type = "button",
  styles = "",
  clickHandler = () => {},
}) {
  const buttonStyles =
    "border-2 border-gray-300 bg-white rounded-2xl p-2 hover:shadow-lg";
  return (
    <button
      onClick={clickHandler}
      disabled={disabled}
      type={type}
      className={`${buttonStyles} ${styles}`}
    >
      {text}
    </button>
  );
}

export default Button;

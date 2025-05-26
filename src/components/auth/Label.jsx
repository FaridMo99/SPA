import React from "react";

function Label({ text, id }) {
  const labelStyles = "font-bold";

  return (
    <label className={labelStyles} htmlFor={id}>
      {text}
    </label>
  );
}

export default Label;

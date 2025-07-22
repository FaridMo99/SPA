import type { ButtonHTMLAttributes, ReactElement } from "react";

type ButtonProps = {
  text: string | ReactElement;
  disabled?: boolean;
  styles?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  clickHandler?: () => void;
};

function Button({
  text,
  disabled = false,
  type = "button",
  styles = "",
  clickHandler = () => {},
}: ButtonProps) {
  const buttonStyles =
    "border-2 border-gray-300 bg-white rounded-2xl p-2 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50";
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

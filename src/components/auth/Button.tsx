import type { ButtonHTMLAttributes, ReactElement } from "react";

type ButtonProps = {
  ariaLabel?:string
  text: string | ReactElement;
  disabled?: boolean;
  styles?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  clickHandler?: () => void;
};

function Button({
  text,
  ariaLabel,
  disabled = false,
  type = "button",
  styles = "",
  clickHandler = () => {},
}: ButtonProps) {
  const buttonStyles =
    "border-2 border-gray-300 bg-white  dark:border-dark-green rounded-2xl p-2 hover:shadow-lg dark:hover:shadow-lg hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 dark:bg-dark-gray";
  return (
    <button
      aria-label={ariaLabel}
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

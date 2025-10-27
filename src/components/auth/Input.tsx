import type { FieldValues, Path, UseFormRegisterReturn } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  id: Path<T>;
  type: string;
} & UseFormRegisterReturn &
  React.InputHTMLAttributes<HTMLInputElement>;

function Input<T extends FieldValues>({
  type,
  id,
  ...inputProps
}: InputProps<T>) {
  const inputStyles = `border-2 border-gray-300 w-full rounded-lg outline-0 focus:shadow-md pl-1 ${type === "file" ? "w-[180px]" : ""}`;

  return <input className={inputStyles} type={type} id={id} {...inputProps} />;
}

export default Input;

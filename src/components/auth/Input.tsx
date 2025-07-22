import type { FieldValues, Path, UseFormRegisterReturn } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  id: Path<T>;
  type: string;
} & UseFormRegisterReturn;

function Input<T extends FieldValues>({
  type,
  id,
  ...inputProps
}: InputProps<T>) {
  const inputStyles =
    "border-2 border-gray-300 rounded-lg outline-0 focus:shadow-md pl-1";

  return <input className={inputStyles} type={type} id={id} {...inputProps} />;
}

export default Input;

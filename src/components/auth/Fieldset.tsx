import Label from "./Label";
import Input from "./Input";
import {
  type FieldErrors,
  type FieldValues,
  type UseFormRegister,
  type Path,
} from "react-hook-form";

export type FieldsetProps<T extends FieldValues> = {
  id: Path<T>;
  text: string;
  type: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  optional?: boolean;
};

function Fieldset<T extends FieldValues>({
  id,
  text,
  type,
  register,
  errors,
  optional = false,
}: FieldsetProps<T>) {
  const fieldsetStyles = "flex flex-col w-[180px]";

  return (
    <fieldset className={fieldsetStyles}>
      <Label text={text} id={id} />
      <Input id={id} type={type} {...register(id)} />
      {optional && (
        <p className="text-gray-400 w-full flex justify-end">optional</p>
      )}
      {errors?.[id] && (
        <p className="text-red-400">{errors[id].message as string}</p>
      )}
    </fieldset>
  );
}

export default Fieldset;

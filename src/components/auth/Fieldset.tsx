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
};

function Fieldset<T extends FieldValues>({
  id,
  text,
  type,
  register,
  errors,
}: FieldsetProps<T>) {
  const fieldsetStyles = "flex flex-col w-2/3 md:w-1/3";

  return (
    <fieldset className={fieldsetStyles}>
      <Label text={text} id={id} />
      <Input id={id} type={type} {...register(id)} />
      {errors?.[id] && (
        <p className="text-red-400">{errors[id].message as string}</p>
      )}
    </fieldset>
  );
}

export default Fieldset;

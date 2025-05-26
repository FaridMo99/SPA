import Label from "./Label";
import Input from "./Input";

function Fieldset({ id, labelText, type, register, errors, optional = false }) {
  const fieldsetStyles = "flex flex-col w-[180px]";

  return (
    <fieldset className={fieldsetStyles}>
      <Label text={labelText} id={id} />
      <Input id={id} type={type} {...register(id)} />
      {optional && (
        <p className="text-gray-400 w-full flex justify-end">optional</p>
      )}
      {errors?.[id] && <p className="text-red-400">{errors[id].message}</p>}
    </fieldset>
  );
}

export default Fieldset;

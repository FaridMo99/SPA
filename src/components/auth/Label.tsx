import type { FieldValues } from "react-hook-form";
import type { FieldsetProps } from "./Fieldset";

type LabelProps<T extends FieldValues> = Pick<FieldsetProps<T>, "id" | "text">;

export default function Label<T extends FieldValues>({
  text,
  id,
}: LabelProps<T>) {
  const labelStyles = "font-bold";

  return (
    <label className={labelStyles} htmlFor={id}>
      {text}
    </label>
  );
}

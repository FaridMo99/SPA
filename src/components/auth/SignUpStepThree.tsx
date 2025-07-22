import Button from "./Button";
import Label from "./Label";
import type { SignUpStepsProps } from "./SignUpStepOne";

function SignUpStepThree({
  register,
  setSteps,
  children,
  disableSubmit,
}: Omit<SignUpStepsProps, "formState"> & { disableSubmit: boolean }) {
  return (
    <>
      <fieldset className="flex flex-col w-[180px]">
        <Label id="bio" text="Bio:" />
        <textarea
          placeholder="Tell something about yourself..."
          rows={4}
          {...register("bio")}
          id="bio"
          className="border-2 border-gray-300 rounded-lg outline-0 focus:shadow-md pl-1"
        />
        <p className="text-gray-400 w-full flex justify-end">optional</p>
      </fieldset>
      {children}
      <div className="w-full flex justify-evenly items-center">
        <Button text="Previous" clickHandler={() => setSteps(2)} />
        <Button disabled={disableSubmit} type="submit" text="Submit" />
      </div>
    </>
  );
}

export default SignUpStepThree;

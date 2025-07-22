import { useEffect, useState } from "react";
import Fieldset from "./Fieldset";
import Button from "./Button";
import type { SignUpStepsProps } from "./SignUpStepOne";

function SignUpStepTwo({
  errors,
  register,
  formState,
  setSteps,
  children,
}: SignUpStepsProps) {
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    const { errors, touchedFields } = formState;

    const allTouched =
      touchedFields.username &&
      touchedFields.password &&
      touchedFields.confirmPassword;

    const hasNoErrors =
      errors.username || errors.password || errors.confirmPassword;

    setCanProceed(Boolean(allTouched) && Boolean(!hasNoErrors));
  }, [formState]);

  return (
    <>
      <Fieldset
        id="username"
        text="Username:"
        type="text"
        register={register}
        errors={errors}
      />
      <Fieldset
        id="password"
        text="Password:"
        type="password"
        register={register}
        errors={errors}
      />
      <Fieldset
        id="confirmPassword"
        text="Confirm Password:"
        type="password"
        register={register}
        errors={errors}
      />
      {children}
      <div className="w-full flex justify-evenly items-center">
        <Button
          text="Previous"
          clickHandler={() => {
            setSteps(1);
          }}
        />
        <Button
          disabled={!canProceed}
          text="Next"
          clickHandler={() => {
            setSteps(3);
          }}
        />
      </div>
    </>
  );
}

export default SignUpStepTwo;

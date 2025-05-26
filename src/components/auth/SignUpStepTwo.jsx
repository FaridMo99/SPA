import React, { useEffect, useState } from "react";
import Fieldset from "./Fieldset";
import Button from "./Button";

function SignUpStepTwo({ errors, register, formState, setSteps, children }) {
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    const { errors, touchedFields } = formState;

    const allTouched =
      touchedFields.username &&
      touchedFields.password &&
      touchedFields.confirmPassword;

    const hasErrors =
      errors.username || errors.password || errors.confirmPassword;

    setCanProceed(allTouched && !hasErrors);
  }, [formState]);

  return (
    <>
      <Fieldset
        id="username"
        labelText="Username:"
        type="text"
        register={register}
        errors={errors}
      />
      <Fieldset
        id="password"
        labelText="Password:"
        type="password"
        register={register}
        errors={errors}
      />
      <Fieldset
        id="confirmPassword"
        labelText="Confirm Password:"
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

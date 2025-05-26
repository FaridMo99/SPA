import { useState, useEffect } from "react";
import Fieldset from "./Fieldset";
import Button from "./Button";

function SignUpStepOne({ errors, register, formState, setSteps, children }) {
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    const { touchedFields, errors } = formState;

    const allTouched =
      touchedFields.firstname &&
      touchedFields.lastname &&
      touchedFields.email &&
      touchedFields.birthdate;

    const hasErrors =
      errors.firstname || errors.lastname || errors.email || errors.birthdate;

    setCanProceed(allTouched && !hasErrors);
  }, [formState]);

  return (
    <>
      <Fieldset
        id="firstname"
        labelText="First Name:"
        type="text"
        register={register}
        errors={errors}
      />
      <Fieldset
        id="lastname"
        labelText="Last Name:"
        type="text"
        register={register}
        errors={errors}
      />
      <Fieldset
        id="email"
        labelText="E-Mail:"
        type="text"
        register={register}
        errors={errors}
      />
      <Fieldset
        id="birthdate"
        labelText="Date of Birth:"
        type="date"
        register={register}
        errors={errors}
      />
      {children}
      <Button
        disabled={!canProceed}
        text="Next"
        clickHandler={() => {
          setSteps(2);
        }}
      />
    </>
  );
}

export default SignUpStepOne;

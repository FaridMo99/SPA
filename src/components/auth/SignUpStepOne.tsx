import { useState, useEffect, type ReactNode } from "react";
import Fieldset from "./Fieldset";
import Button from "./Button";
import type { FieldErrors, UseFormRegister, FormState } from "react-hook-form";
import type { SignupFormData } from "../../utils/signup";

export type SignUpStepsProps = {
  register: UseFormRegister<SignupFormData>;
  errors?: FieldErrors<SignupFormData>;
  formState: FormState<SignupFormData>;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  children: ReactNode;
};

function SignUpStepOne({
  errors,
  register,
  formState,
  setSteps,
  children,
}: SignUpStepsProps) {
  const [canProceed, setCanProceed] = useState<boolean>(false);

  useEffect(() => {
    const { touchedFields, errors } = formState;

    const allTouched =
      touchedFields.firstname &&
      touchedFields.lastname &&
      touchedFields.email &&
      touchedFields.birthdate;

    const hasNoErrors =
      errors.firstname || errors.lastname || errors.email || errors.birthdate;

    setCanProceed(Boolean(allTouched) && Boolean(!hasNoErrors));
  }, [formState]);

  return (
    <>
      <Fieldset
        id="firstname"
        text="First Name:"
        type="text"
        register={register}
        errors={errors}
      />
      <Fieldset
        id="lastname"
        text="Last Name:"
        type="text"
        register={register}
        errors={errors}
      />
      <Fieldset
        id="email"
        text="E-Mail:"
        type="text"
        register={register}
        errors={errors}
      />
      <Fieldset
        id="birthdate"
        text="Date of Birth:"
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

import React from "react";
import Fieldset from "./Fieldset";

function SignUpStepTwo({ errors, register }) {
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
    </>
  );
}

export default SignUpStepTwo;

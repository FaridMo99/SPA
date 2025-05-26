import React from "react";
import Fieldset from "./Fieldset";

function SignUpStepThree({ errors, register }) {
  return (
    <>
      <Fieldset
        id="profileImage"
        labelText="Profile Image:"
        type="text"
        register={register}
        errors={errors}
      />
      <Fieldset
        id="bio"
        labelText="Bio:"
        type="text"
        register={register}
        errors={errors}
      />
      <Fieldset
        id="interests"
        labelText="Interests:"
        type="text"
        register={register}
        errors={errors}
      />
    </>
  );
}

export default SignUpStepThree;

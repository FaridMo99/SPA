import React from "react";
import Fieldset from "./Fieldset";

function SignUpStepOne({ errors, register }) {
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
    </>
  );
}

export default SignUpStepOne;

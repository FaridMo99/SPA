import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { redirect } from "react-router-dom";
import Button from "../components/auth/Button";
import ProgressBar from "../components/auth/ProgressBar";
import SuccessScreen from "../components/auth/SuccessScreen";
import { CheckCircle2 } from "lucide-react";
import SignUpStepOne from "../components/auth/SignUpStepOne";
import SignUpStepTwo from "../components/auth/SignUpStepTwo";
import SignUpStepThree from "../components/auth/SignUpStepThree";

const signupSchema = z.object({
  firstname: z.string().min(1, "Field is required"),
  lastname: z.string().min(1, "Field is required"),
  username: z.string().min(1, "Field is required"),
  birthdate: z.date({ required_error: "Field is required" }),
  email: z.string().email().min(1, "Field is required"),
  password: z.string().min(1, "Field is required"),
  confirmPassword: z.string().min(1, "Field is required"),
  profileImage: z.string().min(1, "Field is required"),
  bio: z.string().min(1, "Field is required"),
  interests: z.string().min(1, "Field is required"),
});

function SignUp() {
  const [steps, setSteps] = useState(1);
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const { errors, isValid, isSubmitSuccessful } = formState;

  function submitHandler(formData) {
    const { confirmPassword, ...submitData } = formData;

    fetch("https://6831e441c3f2222a8cb0be24.mockapi.io/api/friendly/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    });
  }

  return (
    <section className="w-1/2 h-2/3 md:w-[38vw] font-manrope bg-white rounded-2xl outline-1 outline-gray-200 shadow-md shadow-black/20 z-2 flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl mt-4">friendly.</h1>
      <form
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        className="w-full h-full flex flex-col justify-evenly items-center"
      >
        {steps === 1 && <SignUpStepOne errors={errors} register={register} />}
        {steps === 2 && <SignUpStepTwo errors={errors} register={register} />}
        {steps === 3 && <SignUpStepThree errors={errors} register={register} />}
        <ProgressBar steps={steps} success={isSubmitSuccessful} />

        <div className="w-full flex justify-evenly items-center">
          {steps !== 1 && (
            <Button
              text="Previous"
              clickHandler={() => {
                setSteps((pre) => pre - 1);
              }}
            />
          )}
          {steps < 3 && (
            <Button
              text="Next"
              clickHandler={() => {
                setSteps((pre) => pre + 1);
              }}
            />
          )}
          {steps === 3 && (
            <Button disabled={isValid} type="submit" text="Submit" />
          )}
        </div>
        
      </form>
      {isSubmitSuccessful && <SuccessScreen Icon={CheckCircle2} />}
    </section>
  );
}

export default SignUp;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ProgressBar from "../components/auth/ProgressBar";
import SuccessScreen from "../components/auth/SuccessScreen";
import { CheckCircle2, Loader2 } from "lucide-react";
import SignUpStepOne from "../components/auth/SignUpStepOne";
import SignUpStepTwo from "../components/auth/SignUpStepTwo";
import SignUpStepThree from "../components/auth/SignUpStepThree";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import signupSchema from "../schemas/signUpSchema";
import signup from "../utils/signup";
import type { SignupFormData } from "../utils/signup";

function SignUp() {
  const [steps, setSteps] = useState<number>(1);
  const { register, handleSubmit, formState } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });
  const { errors, isSubmitSuccessful } = formState;
  const navigation = useNavigate();

  const mutation = useMutation({
    mutationKey: ["send User Data"],
    mutationFn: signup,
  });

  function submitHandler(formData: SignupFormData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...submitData } = formData;
    mutation.mutate(submitData, {
      onSuccess: () => {
        setTimeout(() => navigation("/home", { replace: true }), 800);
      },
    });
  }

  return (
    <>
      <form
        aria-label="Sign Up"
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        className="w-full h-full flex flex-col justify-evenly items-center"
      >
        {steps === 1 && (
          <SignUpStepOne
            errors={errors}
            register={register}
            formState={formState}
            setSteps={setSteps}
          >
            {" "}
            <ProgressBar steps={steps} success={isSubmitSuccessful} />
          </SignUpStepOne>
        )}
        {steps === 2 && (
          <SignUpStepTwo
            errors={errors}
            register={register}
            formState={formState}
            setSteps={setSteps}
          >
            {" "}
            <ProgressBar steps={steps} success={isSubmitSuccessful} />
          </SignUpStepTwo>
        )}
        {steps === 3 && (
          <SignUpStepThree
            register={register}
            setSteps={setSteps}
            disableSubmit={mutation.isPending || mutation.isSuccess}
          >
            {" "}
            <ProgressBar steps={steps} success={isSubmitSuccessful} />
          </SignUpStepThree>
        )}
      </form>
      <Link to="/login" className="text-green-300 underline">
        Already have a Account? Log in.
      </Link>
      {mutation.isPending && (
        <SuccessScreen animation="animate-spin" Icon={Loader2} />
      )}
      {mutation.isSuccess && (
        <SuccessScreen animation="animate-ping" Icon={CheckCircle2} />
      )}
      {mutation.isError && (
        <p className="text-red-500">Submission failed, try again</p>
      )}
    </>
  );
}

export default SignUp;

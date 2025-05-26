import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import ProgressBar from "../components/auth/ProgressBar";
import SuccessScreen from "../components/auth/SuccessScreen";
import { CheckCircle2, Loader2 } from "lucide-react";
import SignUpStepOne from "../components/auth/SignUpStepOne";
import SignUpStepTwo from "../components/auth/SignUpStepTwo";
import SignUpStepThree from "../components/auth/SignUpStepThree";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import signupSchema from "../schemas/signUpSchema";
import sendUserData from "../utils/sendUserData";
import useAuth from "../stores/authStore";

function SignUp() {
  const [steps, setSteps] = useState(1);
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });
  const { errors, isSubmitSuccessful } = formState;
  const navigation = useNavigate();

  const mutation = useMutation({
    mutationKey: ["send User Data"],
    mutationFn: sendUserData,
  });

  function submitHandler(formData) {
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...submitData } = formData;
    mutation.mutate(submitData, {
      onSuccess: (data) => {
        sessionStorage.setItem("user", JSON.stringify(data));
        useAuth.getState().setUser();
      },
    });
  }
  useEffect(() => {
    if (mutation.isSuccess) {
      setTimeout(() => navigation("/home", { replace: true }), 800);
    }
  }, [mutation.isSuccess]);

  return (
    <>
      <form
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
            errors={errors}
            register={register}
            setSteps={setSteps}
            disableSubmit={mutation.isLoading || mutation.isSuccess}
          >
            {" "}
            <ProgressBar steps={steps} success={isSubmitSuccessful} />
          </SignUpStepThree>
        )}
      </form>
      <Link to="/login" className="text-green-300 underline">
        Already have a Account? Log in.
      </Link>
      {mutation.isLoading && (
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

//set cookies because you logged in

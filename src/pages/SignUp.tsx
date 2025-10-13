import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SuccessScreen from "../components/auth/SuccessScreen";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupSchema } from "../schemas/schemas";
import signup from "../utils/signup";
import type { SignupFormData } from "../utils/signup";
import Fieldset from "../components/auth/Fieldset";
import Button from "../components/auth/Button";

function SignUp() {
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
        <Fieldset
          register={register}
          id="username"
          text="Username:"
          type="text"
        />

        <Fieldset register={register} id="email" text="E-Mail:" type="email" />

        <Fieldset
          register={register}
          id="birthdate"
          text="Birthdate:"
          type="date"
        />

        <Fieldset
          register={register}
          id="password"
          text="Password:"
          type="password"
        />

        <Fieldset
          register={register}
          id="confirmPassword"
          text="Confirm Password:"
          type="password"
        />
        <Button text="Signup" type="submit" styles="font-bold" />
      </form>
      <Link
        to="/login"
        className="text-green-300 underline dark:text-dark-green"
      >
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

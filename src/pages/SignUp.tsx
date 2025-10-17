import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupSchema } from "../schemas/schemas";
import signup from "../utils/signup";
import type { SignupFormData } from "../utils/signup";
import Fieldset from "../components/auth/Fieldset";
import Button from "../components/auth/Button";
import toast from "react-hot-toast";
import CustomLoader from "../components/ui/CustomLoader";
import AuthForm from "../components/auth/AuthForm";

function SignUp() {
  const { register, handleSubmit, formState, reset } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
  });
  const { errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationKey: ["sign user up", formState],
    mutationFn: signup,
    onSuccess: () => {
      toast.success(
        "Signup successful, check your E-Mails for the verification Link.",
      );
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function submitHandler(formData: SignupFormData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...submitData } = formData;
    mutate(submitData);
  }

  return (
    <AuthForm submitHandler={handleSubmit(submitHandler)} ariaLabel="Signup">
      <Fieldset
        register={register}
        id="username"
        text="Username:"
        type="text"
      />
      {errors.username && (
        <p className="text-red-500 text-center">{errors.username.message}</p>
      )}

      <Fieldset register={register} id="email" text="E-Mail:" type="email" />
      {errors.email && (
        <p className="text-red-500 text-center">{errors.email.message}</p>
      )}

      <Fieldset
        register={register}
        id="birthdate"
        text="Birthdate:"
        type="date"
      />
      {errors.birthdate && (
        <p className="text-red-500 text-center">{errors.birthdate.message}</p>
      )}

      <Fieldset
        register={register}
        id="password"
        text="Password:"
        type="password"
      />
      {errors.password && (
        <p className="text-red-500 text-center">{errors.password.message}</p>
      )}

      <Fieldset
        register={register}
        id="confirmPassword"
        text="Confirm Password:"
        type="password"
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-center">
          {errors.confirmPassword.message}
        </p>
      )}

      <Button
        disabled={isPending}
        text={isPending ? <CustomLoader /> : "Signup"}
        type="submit"
        styles="font-bold"
      />
      <Link
        to="/login"
        className="text-green-300 underline dark:text-dark-green"
      >
        Already have a Account? Log in.
      </Link>
    </AuthForm>
  );
}

export default SignUp;

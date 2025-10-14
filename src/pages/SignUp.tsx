import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupSchema } from "../schemas/schemas";
import signup from "../utils/signup";
import type { SignupFormData } from "../utils/signup";
import Fieldset from "../components/auth/Fieldset";
import Button from "../components/auth/Button";
import toast from "react-hot-toast";
import CustomLoader from "../components/CustomLoader";

//fix responsive issues when error messages trigger
function SignUp() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
  });
  const { errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationKey: ["sign user up", formState],
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Signup successful");
      navigate("/home");
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
        {errors.username && (
          <p className="text-red-400 text-center">{errors.username.message}</p>
        )}

        <Fieldset register={register} id="email" text="E-Mail:" type="email" />
        {errors.email && (
          <p className="text-red-400 text-center">{errors.email.message}</p>
        )}

        <Fieldset
          register={register}
          id="birthdate"
          text="Birthdate:"
          type="date"
        />
        {errors.birthdate && (
          <p className="text-red-400 text-center">{errors.birthdate.message}</p>
        )}

        <Fieldset
          register={register}
          id="password"
          text="Password:"
          type="password"
        />
        {errors.password && (
          <p className="text-red-400 text-center">{errors.password.message}</p>
        )}

        <Fieldset
          register={register}
          id="confirmPassword"
          text="Confirm Password:"
          type="password"
        />
        {errors.confirmPassword && (
          <p className="text-red-400 text-center">
            {errors.confirmPassword.message}
          </p>
        )}

        <Button
          disabled={isPending}
          text={isPending ? <CustomLoader /> : "Signup"}
          type="submit"
          styles="font-bold"
        />
      </form>
      <Link
        to="/login"
        className="text-green-300 underline dark:text-dark-green"
      >
        Already have a Account? Log in.
      </Link>
    </>
  );
}

export default SignUp;

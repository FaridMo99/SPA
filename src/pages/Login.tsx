import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Fieldset from "../components/auth/Fieldset";
import Button from "../components/auth/Button";
import { loginSchema } from "../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import login, { type LoginFormData } from "../utils/login";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CustomLoader from "../components/ui/CustomLoader";
import AuthForm from "../components/auth/AuthForm";

//add file uploads for profile pic and posts add gif support
//add chat
//add ci/cd
//fix ui issues
//clean up code
//implement testing(unit,component,integration)
//email that gets sent throught backend doesnt give url string, maybe redis doesnt create or in email wrong set up

function Login() {
  const navigate = useNavigate();

  const { formState, register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });
  const { errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationKey: ["logging user in", formState],
    mutationFn: login,
    onSuccess: () => {
      toast.success("Successfully logged in!");
      navigate("/home");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function submitHandler(formData: LoginFormData) {
    mutate(formData);
  }

  return (
    <AuthForm submitHandler={handleSubmit(submitHandler)} ariaLabel="Login">
      <Fieldset register={register} id="email" text="E-Mail:" type="email" />
      {errors.email && (
        <p className="text-red-500 text-center">{errors.email.message}</p>
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

      <Button
        disabled={isPending}
        text={isPending ? <CustomLoader /> : "Login"}
        type="submit"
        styles="font-bold"
      />
      <div className="flex flex-col justify-evenly items-center h-1/5">
        <Link
          to="/forgot-password"
          className="text-green-300 dark:text-dark-green underline"
        >
          Forgot Password?
        </Link>
        <Link
          to="/signup"
          className="text-green-300 dark:text-dark-green underline"
        >
          Don’t have a account? Sign up.
        </Link>
      </div>
    </AuthForm>
  );
}

export default Login;

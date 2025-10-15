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

//add forgot password feature and then sends email to verify
//add sending email on changing email or signing up with email, if changing email sent email should only be valid for 24 hours
//make follower and following a list of followers and following as modal
//add file uploads for profile pic and posts add gif support
//fix ui issues
//clean up code
//implement testing(unit,component,integration)

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
    <form
      aria-label="Login"
      noValidate
      onSubmit={handleSubmit(submitHandler)}
      className="w-full h-full flex flex-col justify-evenly rounded-2xl items-center dark:bg-dark-gray"
    >
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

      <Link
        to="/signup"
        className="text-green-300 dark:text-dark-green underline"
      >
        Don’t have a account? Sign up.
      </Link>
    </form>
  );
}

export default Login;

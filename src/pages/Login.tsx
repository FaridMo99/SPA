import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Fieldset from "../components/auth/Fieldset";
import Button from "../components/auth/Button";
import { loginSchema } from "../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import login, { type LoginFormData } from "../utils/login";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CustomLoader from "../components/CustomLoader";


//check on all routes if custom loader breaks layouts
function Login() {
    const navigate = useNavigate();


  const { formState, register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });
  const { errors } = formState;

  const { mutate, isPending, } = useMutation({
    mutationKey: ["logging user in", formState],
    mutationFn: login,
    onSuccess: () => {
      toast.success("Successfully logged in!")
      navigate("/home")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });


  function submitHandler(formData:LoginFormData) {
    mutate(formData)
  }

  return (
    <>
      <form
        aria-label="Login"
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        className="w-full h-full flex flex-col justify-evenly rounded-2xl items-center dark:bg-dark-gray"
      >
        <Fieldset register={register} id="email" text="E-Mail:" type="email" />

        {errors.email && (
          <p className="text-red-400 text-center">{errors.email.message}</p>
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
    </>
  );
}

export default Login;

import { useState, useEffect } from "react";
import SuccessScreen from "../components/auth/SuccessScreen";
import { CheckCircle2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Fieldset from "../components/auth/Fieldset";
import Button from "../components/auth/Button";
import loginSchema from "../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import login from "../utils/login";
import getUsers from "../utils/getUsers";
import { useQuery, useMutation } from "@tanstack/react-query";

function Login() {
  const [loginError, setLoginError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["getAllUsers for login"],
    queryFn: () => getUsers(),
  });

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });

  const navigation = useNavigate();

  const { formState, register, handleSubmit, reset } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { errors } = formState;

  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      reset({
        username: data[0].username,
        password: data[0].password,
      });
    }
  }, [isLoading, data, reset]);

  async function submitHandler(formData) {
    mutate(formData, {
      onSuccess: () => {
        setLoginSuccess(true);
        setLoginError(false);
        setTimeout(() => navigation("/home", { replace: true }), 800);
      },
      onError: () => {
        setLoginError(true);
        setLoginSuccess(false);
      },
    });
  }

  return (
    <>
      <form
        aria-label="Login"
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        className="w-full h-full flex flex-col justify-evenly items-center"
      >
        <Fieldset
          register={register}
          id="username"
          labelText="Username:"
          type="text"
          errors={errors.username}
        />
        <Fieldset
          register={register}
          id="password"
          labelText="Password:"
          type="password"
          errors={errors.password}
        />

        {(errors?.username || errors?.password || loginError) && (
          <p className="text-red-400 text-center">
            Username or Password is wrong!
          </p>
        )}

        <Button text="Login" type="submit" styles="font-bold" />

        <Link to="/signup" className="text-green-300 underline">
          Don’t have an account? Sign up.
        </Link>
      </form>
      {loginSuccess && (
        <SuccessScreen animation="animate-ping" Icon={CheckCircle2} />
      )}
    </>
  );
}

export default Login;

//the fetch GET method is only to prepopulate the form so you can login and
//isnt necessary in a real project

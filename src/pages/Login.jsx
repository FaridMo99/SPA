import React, { useState } from "react";
import SuccessScreen from "../components/auth/SuccessScreen";
import { CheckCircle2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Fieldset from "../components/auth/Fieldset";
import Button from "../components/auth/Button";
import getUsers from "../utils/getUsers";
import loginSchema from "../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../stores/authStore";

function Login() {
  const [loginError, setLoginError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigation = useNavigate();
  const setUser = useAuth((state) => state.setUser);

  const { formState, register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });
  const { errors } = formState;

  async function submitHandler(formData) {
    try {
      const user = await getUsers(
        `?username=${formData.username}&password=${formData.password}`,
      );

      if (user.length > 0) {
        sessionStorage.setItem("user", JSON.stringify(user));
        setUser();
        setLoginSuccess(true);
        setLoginError(false);
        setTimeout(() => navigation("/home", { replace: true }), 800);
      } else {
        setLoginError(true);
        setLoginSuccess(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(true);
    }
  }

  return (
    <form
    role="Login"
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

      {loginSuccess && (
        <SuccessScreen animation="animate-ping" Icon={CheckCircle2} />
      )}
    </form>
  );
}

export default Login;
//check if credentials correct, set cookies

{
  /* login should actually be a POST request which sends the credentials
     and if correct answers with a JWT-Token which then get stored in a 
     http-only cookie, but since mockapi.io dont offer this functionality
      and i dont have other ressources im using here a GET methods */
}

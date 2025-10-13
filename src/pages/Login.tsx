import { useState, useEffect } from "react";
import SuccessScreen from "../components/auth/SuccessScreen";
import { CheckCircle2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Fieldset from "../components/auth/Fieldset";
import Button from "../components/auth/Button";
import { loginSchema } from "../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormData } from "../utils/login";
import { useQuery, useMutation } from "@tanstack/react-query";

function Login() {
  const navigate = useNavigate();

  const { formState, register, handleSubmit, reset } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });
  const { errors } = formState;

  return (
    <>
      <form
        aria-label="Login"
        noValidate
        //onSubmit={handleSubmit(submitHandler)}
        className="w-full h-full flex flex-col justify-evenly rounded-2xl items-center dark:bg-dark-gray"
      >
        <Fieldset register={register} id="email" text="E-Mail:" type="email" />
        <Fieldset
          register={register}
          id="password"
          text="Password:"
          type="password"
        />

        {/*(errors?.username || errors?.password || loginError) && (<p className="text-red-400 text-center">Username or Password is wrong!</p>)*/}

        <Button text="Login" type="submit" styles="font-bold" />

        <Link
          to="/signup"
          className="text-green-300 dark:text-dark-green underline"
        >
          Don’t have a account? Sign up.
        </Link>
      </form>
      {/*loginSuccess && (<SuccessScreen animation="animate-ping" Icon={CheckCircle2} />)*/}
    </>
  );
}

export default Login;

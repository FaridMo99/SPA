import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Fieldset from "../components/auth/Fieldset";
import AuthForm from "../components/auth/AuthForm";
import Button from "../components/auth/Button";
import { forgotPasswordSchema } from "../schemas/schemas";
import toast from "react-hot-toast";
import { forgotPassword } from "../utils/editUser";
import type { ForgotPasswordSchema } from "../types/types";
import CustomLoader from "../components/ui/CustomLoader";

function ForgotPassword() {
  const { formState, register, handleSubmit, getValues } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [counter, setCounter] = useState<number>(60);
  const [isCounterVisible, setIsCounterVisible] = useState<boolean>(false);

  const { errors } = formState;
  const {
    mutate,
    error: fetchError,
    isPending,
  } = useMutation({
    mutationKey: ["forgot password", getValues],
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Email got sent. Check your E-Mails.");
      setIsCounterVisible(true);
    },
  });

  function submitHandler(email: ForgotPasswordSchema) {
    mutate(email);
  }

  useEffect(() => {
    if (!isCounterVisible) return;
    if (counter === 0) {
      setCounter(60);
      setIsCounterVisible(false);
      return;
    }

    const timerId = setTimeout(() => {
      setCounter((pre) => pre - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [isCounterVisible, counter]);

  return (
    <AuthForm
      submitHandler={handleSubmit(submitHandler)}
      ariaLabel="Forgot Password Input"
    >
      <h1 className="text-xl font-extrabold text-green-400 dark:text-dark-green">
        Forgot Password
      </h1>
      <Fieldset
        id="email"
        text="Enter Email:"
        type="email"
        register={register}
      />
      {errors && (
        <p className="text-red-500 text-center">{errors.email?.message}</p>
      )}
      {fetchError && (
        <p className="text-red-500 text-center">{fetchError.message}</p>
      )}
      {isCounterVisible && (
        <p className="text-green-400 dark:text-dark-green text-center">
          Didnt receive a E-Mail? Try again in: {counter} seconds
        </p>
      )}
      <Button
        disabled={isPending || isCounterVisible}
        type="submit"
        text={isPending ? <CustomLoader /> : "Submit"}
      />
    </AuthForm>
  );
}

export default ForgotPassword;

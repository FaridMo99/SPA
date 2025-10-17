import React from "react";

type AuthFormProps = {
  ariaLabel: string;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

function AuthForm({ ariaLabel, submitHandler, children }: AuthFormProps) {
  return (
    <form
      aria-label={ariaLabel}
      noValidate
      onSubmit={submitHandler}
      className="w-full h-full flex flex-col justify-evenly rounded-2xl items-center dark:bg-dark-gray"
    >
      {children}
    </form>
  );
}

export default AuthForm;

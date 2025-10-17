import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomLoader from "../components/ui/CustomLoader";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Fieldset from "../components/auth/Fieldset";
import AuthForm from "../components/auth/AuthForm";
import Button from "../components/auth/Button";
import { changePassword } from "../utils/editUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../schemas/schemas";
import type { ChangePasswordSchema } from "../types/types";

function ChangePassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(changePasswordSchema),
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["change password", token, userId],
    mutationFn: (password: string) =>
      changePassword({ userId: userId!, token: token!, password }),
    onSuccess: () => {
      toast.success(
        "Password changed successfully. You got logged in automatically.",
      );
      navigate("/home");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (!token || !userId) {
      navigate("/signup");
      return;
    }
  }, [token, userId, navigate]);

  function submitHandler(formData: ChangePasswordSchema) {
    const { password } = formData;
    mutate(password);
  }

  return (
    <AuthForm
      submitHandler={handleSubmit(submitHandler)}
      ariaLabel="Change Password"
    >
      <Fieldset
        id="password"
        register={register}
        type="password"
        text="Password:"
      />
      {errors.password && (
        <p className="text-red-500 text-center">{errors.password.message}</p>
      )}

      <Fieldset
        id="confirmPassword"
        register={register}
        type="password"
        text="Confirm Password:"
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-center">
          {errors.confirmPassword.message}
        </p>
      )}
      <Button text={isPending ? <CustomLoader /> : "Change"} />
    </AuthForm>
  );
}

export default ChangePassword;

import signupSchema from "../schemas/signUpSchema";
import type { z } from "zod";
import useAuth from "../stores/authStore";

export type SignupFormData = z.infer<typeof signupSchema>;
export type SignupFormDataMandatory = Omit<SignupFormData, "confirmPassword">;

export default async function signup(
  formData: SignupFormDataMandatory,
): Promise<void> {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Signup failed");

  const user = await res.json();

  await useAuth.getState().fetchUser(user.username);
}

//credentials dont work because msw doesnt let you set httponly cookie
//but in a real application would be necessary

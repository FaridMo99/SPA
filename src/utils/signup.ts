import { signupSchema } from "../schemas/schemas";
import type { z } from "zod";
import useAuth, { backendUrl } from "../stores/authStore";
import type { User } from "../types/types";
import { redirect } from "react-router-dom";

export type SignupFormData = z.infer<typeof signupSchema>;
export type SignupFormDataMandatory = Omit<SignupFormData, "confirmPassword">;

export default async function signup(
  formData: SignupFormDataMandatory,
): Promise<void> {
  const res = await fetch(`/${backendUrl}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Signup failed");

  const user: User = await res.json();
  useAuth.getState().setUser(user);
  redirect("/");
}

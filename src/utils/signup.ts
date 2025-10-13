import { signupSchema } from "../schemas/schemas";
import type { z } from "zod";
import useAuth, { backendUrl } from "../stores/authStore";
import type { User } from "../types/types";

export type SignupFormData = z.infer<typeof signupSchema>;
export type SignupFormDataMandatory = Omit<SignupFormData, "confirmPassword">;

export default async function signup(
  formData: SignupFormDataMandatory,
): Promise<void> {
  const res = await fetch(`${backendUrl}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  const user: User = await res.json();
  useAuth.getState().setUser(user);
}

import type { z } from "zod";
import { loginSchema } from "../schemas/schemas";
import useAuth, { backendUrl } from "../stores/authStore";
import type { User } from "../types/types";
import { redirect } from "react-router-dom";

export type LoginFormData = z.infer<typeof loginSchema>;

export default async function login(data: LoginFormData): Promise<void> {
  const res = await fetch(`/${backendUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const user: User = await res.json();
  useAuth.getState().setUser(user);
  redirect("/");
}

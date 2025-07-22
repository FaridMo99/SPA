import type { z } from "zod";
import loginSchema from "../schemas/loginSchema";
import useAuth from "../stores/authStore";

export type LoginFormData = z.infer<typeof loginSchema>;

export default async function login(data: LoginFormData): Promise<void> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Login failed");
  }

  const user = await res.json();
  await useAuth.getState().fetchUser(user.username);
}
//credentials dont work because msw doesnt let you set httponly cookie
//but in a real application would be necessary

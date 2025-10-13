import type { z } from "zod";
import { loginSchema } from "../schemas/schemas";
import useAuth, { backendUrl } from "../stores/authStore";
import type { User } from "../types/types";

export type LoginFormData = z.infer<typeof loginSchema>;

export default async function login(data: LoginFormData): Promise<void> {
  const res = await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const result = await res.json()
    throw new Error(result.message);
  }

  const user: User = await res.json();
  useAuth.getState().setUser(user);
}

import { backendUrl } from "../stores/authStore";

export async function logout(): Promise<void> {
  const res = await fetch(`${backendUrl}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error(res.statusText);
}

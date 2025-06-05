import useAuth from "../stores/authStore";

export default async function login(credentials) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error("Login failed");

  await useAuth.getState().fetchUser();
}

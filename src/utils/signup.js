import useAuth from "../stores/authStore";

export default async function signup(formData) {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Signup failed");

  const user = await res.json();

  useAuth.getState().setUser(user);
  return user;
}

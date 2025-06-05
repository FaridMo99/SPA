import useAuth from "../stores/authStore";

export default async function signup(formData) {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Signup failed");

  await useAuth.getState().fetchUser();
}

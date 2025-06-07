import { redirect } from "react-router-dom";
import useAuth from "../stores/authStore";

export async function initialAuthCheck() {
  await useAuth.getState().fetchUser(sessionStorage.getItem("username"));
  const { authenticated } = await useAuth.getState();
  return (await authenticated) ? redirect("/home") : redirect("/login");
}

export async function authCheckPrivate() {
  await useAuth.getState().fetchUser(sessionStorage.getItem("username"));
  const { authenticated } = await useAuth.getState();
  return (await authenticated) ? null : redirect("/login");
}

export async function authCheckPublic() {
  await useAuth.getState().fetchUser(sessionStorage.getItem("username"));
  const { authenticated } = await useAuth.getState();
  return (await authenticated) ? redirect("/home") : null;
}

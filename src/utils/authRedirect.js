import { redirect } from "react-router-dom";
import useAuth from "../stores/authStore";

export async function initialAuthCheck() {
  await useAuth.getState().fetchUser();
  const { authenticated } = useAuth.getState();
  return authenticated ? redirect("/home") : redirect("/login");
}

export async function authCheckPrivate() {
  await useAuth.getState().fetchUser();
  const { authenticated } = useAuth.getState();
  return authenticated ? null : redirect("/login");
}

export async function authCheckPublic() {
  await useAuth.getState().fetchUser();
  const { authenticated } = useAuth.getState();
  return authenticated ? redirect("/home") : null;
}

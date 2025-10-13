import { redirect } from "react-router-dom";
import useAuth from "../stores/authStore";

export async function initialAuthCheck(): Promise<ReturnType<typeof redirect>> {
  return (await useAuth.getState().fetchUser())
    ? redirect("/home")
    : redirect("/login");
}

export async function authCheckPrivate(): Promise<ReturnType<
  typeof redirect
> | null> {
  return (await useAuth.getState().fetchUser()) ? null : redirect("/login");
}

export async function authCheckPublic(): Promise<ReturnType<
  typeof redirect
> | null> {
  return (await useAuth.getState().fetchUser()) ? redirect("/home") : null;
}

import { redirect } from "react-router-dom";
import useAuth from "../stores/authStore";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function initialAuthCheck(): Promise<ReturnType<typeof redirect>> {
  await delay(200);
  const username = sessionStorage.getItem("username");
  if (!username || username === "undefined") return redirect("/login");

  return (await useAuth.getState().fetchUser(username))
    ? redirect("/home")
    : redirect("/login");
}

export async function authCheckPrivate(): Promise<ReturnType<
  typeof redirect
> | null> {
  await delay(200);
  const username: string | null = sessionStorage.getItem("username");
  if (!username || username === "undefined") return redirect("/login");

  return (await useAuth.getState().fetchUser(username))
    ? null
    : redirect("/login");
}

export async function authCheckPublic(): Promise<ReturnType<
  typeof redirect
> | null> {
  await delay(200);
  const username: string | null = sessionStorage.getItem("username");
  if (!username || username === "undefined") return null;

  return (await useAuth.getState().fetchUser(username))
    ? redirect("/home")
    : null;
}

//the timeout is needed because these loaders are in race condition with
//msw initialzing first

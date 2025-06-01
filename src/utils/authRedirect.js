import { redirect } from "react-router-dom";
import useAuth from "../stores/authStore";

export function initialAuthCheck() {
  useAuth.getState().setUser();
  const { authenticated } = useAuth.getState();
  return authenticated ? redirect("/home") : redirect("/login");
}

export function authCheckPrivate() {
  const { authenticated } = useAuth.getState();
  if (!authenticated) {
    return redirect("/login");
  }
  return null;
}
export function authCheckPublic() {
  const { authenticated } = useAuth.getState();

  if (authenticated) {
    return redirect("/home");
  }
  return null;
}

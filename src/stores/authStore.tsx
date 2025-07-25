import { create } from "zustand";
import type { User } from "../mocks/data";

type AuthState = {
  user: User | null;
  authenticated: boolean;

  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUser: (username: string) => Promise<boolean>;
};

const useAuth = create<AuthState>((set) => ({
  user: null,
  authenticated: false,

  setUser: (user) => {
    sessionStorage.setItem("username", user.username);
    set({ user, authenticated: true });
  },

  clearUser: () => {
    sessionStorage.removeItem("username");
    set({ user: null, authenticated: false });
  },

  fetchUser: async (username) => {
    try {
      const res = await fetch(`/api/users/${username}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated");
      const user = await res.json();
      useAuth.getState().setUser(user);
      return true;
    } catch {
      useAuth.getState().clearUser();
      return false;
    }
  },
}));

export default useAuth;

//credentials dont work because msw doesnt let you set httponly cookie
//but in a real application would be necessary.

//in a real app you wouldnt keep session like this, you would send your data (POST)
// with credentials to a extra endpoint and not just get the user through filtering
//but with msw not possible.

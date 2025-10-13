import { create } from "zustand";
import type { User } from "../types/types";

export const backendUrl = import.meta.env.VITE_BACKEND;

type AuthState = {
  user: User | null;
  authenticated: boolean;

  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUser: () => Promise<User | null>;
};

const useAuth = create<AuthState>((set, get) => ({
  user: null,
  authenticated: false,

  setUser: (user) => {
    set({ user, authenticated: true });
  },

  clearUser: () => {
    set({ user: null, authenticated: false });
  },

  fetchUser: async () => {
    try {
      const res = await fetch(`${backendUrl}/auth/me`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Not authenticated");

      const user: User = await res.json();
      get().setUser(user);

      return user;
    } catch {
      get().clearUser();
      return null;
    }
  },
}));

export default useAuth;

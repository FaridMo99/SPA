import { create } from "zustand";

const useAuth = create((set, get) => ({
  user: null,
  authenticated: false,

  setUser: (user) => set({ user, authenticated: true }),

  clearUser: () => set({ user: null, authenticated: false }),

  fetchUser: async () => {
    const { user, authenticated } = get();

    if (authenticated && user) return;
    try {
      const res = await fetch("/api/login", { credentials: "include" });
      if (!res.ok) throw new Error("Not authenticated");
      const user = await res.json();
      set({ user, authenticated: true });
    } catch {
      set({ user: null, authenticated: false });
    }
  },
}));

export default useAuth;

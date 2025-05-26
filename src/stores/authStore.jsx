import { create } from "zustand";

const useAuth = create((set) => ({
  user: null,
  authenticated: false,
  setAuthenticated: (value) => set({ authenticated: value }),
  setUser: () => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      set({ user, authenticated: true });
    } else {
      set({ user: null, authenticated: false });
    }
  },
}));

export default useAuth;
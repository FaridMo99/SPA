import { create } from "zustand";

const useAuth = create((set) => ({
  authenticated: false,
  setAuthenticated: () => set((value) => ({ authenticated: value })),
}));

export default useAuth;

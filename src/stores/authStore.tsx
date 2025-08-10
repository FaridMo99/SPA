import { create } from "zustand";
import type { User } from "../mocks/data";
import io from "socket.io-client"
import type { Socket } from "socket.io-client";

type AuthState = {
  user: User | null;
  authenticated: boolean;
  socket: null | typeof Socket;

  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUser: (username: string) => Promise<boolean>;
  socketConnect: () => void;
  socketDisconnect: () => void;
};

const useAuth = create<AuthState>((set,get) => ({
  user: null,
  authenticated: false,
  socket: null,

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
      get().setUser(user);
      
      return true;
    } catch {
      get().clearUser();
      return false;
    }
  },
  
  socketConnect: () => {},
  socketDisconnect: () => {},
}));

export default useAuth;

//credentials dont work because msw doesnt let you set httponly cookie
//but in a real application would be necessary.

//in a real app you wouldnt keep session like this, you would send your data (POST)
// with credentials to a extra endpoint and not just get the user through filtering
//but with msw not possible.
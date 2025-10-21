import { create } from "zustand";
import useAuth, { backendUrl } from "./authStore";
import io, { Socket } from "socket.io-client";

type MessageInput = {
  message: string;
  chatId: string;
};

export type MessageReceived = {
  id: string;
  createdAt: Date;
  content: string;
  deleted: boolean;
  read: boolean;
  sender: {
    username: string;
    profilePicture: string;
  };
};

type SocketState = {
  messagesReceived: MessageReceived[];
  socket: null | typeof Socket;
  messageSentSuccessful: null | boolean;
  isConnected: boolean;
  connect: () => void;
  connectError: string | null;
  disconnect: () => void;
  sendMessage: (input: MessageInput) => void;
  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
};

interface BrowserOpts extends SocketIOClient.ConnectOpts {
  withCredentials: boolean;
}

const useSocket = create<SocketState>((set, get) => ({
  messagesReceived: [],
  isConnected: false,
  connectError: null,
  messageSentSuccessful: null,
  socket: null,

  connect: () => {
    if (get().socket) return;

    const newSocket = io(backendUrl, {
      withCredentials: true,
      reconnection: true,
    } as BrowserOpts);

    set({ socket: newSocket });

    newSocket.on("connect", () => {
      set({ isConnected: true, connectError: null });
    });

    newSocket.on("connect_error", (err: Error) => {
      set({ isConnected: false, connectError: err.message });
      console.error("Connection error:", err);
    });

    newSocket.on("disconnect", () => {
      set({ isConnected: false });
      console.log("Disconnected from WebSocket");
    });

    //auto joining new chat from other user
    newSocket.on("newChat", (chatId: string) => {
      const { joinChat } = get();
      joinChat(chatId);
    });

    newSocket.on("message", (message: MessageReceived) => {
      console.log("New message received:", message);
      set((state) => ({
        messagesReceived: [...state.messagesReceived, message],
      }));
    });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ isConnected: false, socket: null });
    }
  },

  sendMessage: (msg) => {
    const { socket, isConnected } = get();
    if (!isConnected || !socket) {
      return;
    }

    socket.emit(
      "message",
      msg,
      (serverResponse: { status: "successful" | "failed" }) => {
        if (serverResponse.status === "successful") {
          set({ messageSentSuccessful: true });
          setTimeout(() => {
            set({ messageSentSuccessful: null });
          }, 100);
        } else {
          set({ messageSentSuccessful: false });
        }
      },
    );
  },
  //for after successful creation adding both users in real time to the chat room
  joinChat: (chatId: string) => {
    const { socket, isConnected } = get();
    if (!isConnected || !socket) {
      return;
    }
    socket.emit("joinChat", chatId);
  },
  //for deleting chat
  leaveChat: (chatId: string) => {
    const { socket, isConnected } = get();
    if (!isConnected || !socket) {
      return;
    }
    socket.emit("leaveChat", chatId);
  },
}));

export default useSocket;

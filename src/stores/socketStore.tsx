import { create } from "zustand";
import { backendUrl } from "./authStore";
import io from "socket.io-client";

type MessageInput = {
  message: string;
  chatId: string;
};

type MessageReceived = {
  message: string;
  sender: string;
  profilePicture: string;
};

type SocketState = {
  messagesReceived: MessageReceived[];
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => void;
  connectError: string | null;
  disconnect: () => void;
  sendMessage: (input: MessageInput) => void;
};

//property exists actually but library for some reason doesnt have it included
interface BrowserOpts extends SocketIOClient.ConnectOpts {
  withCredentials?: true;
}

const socket = io(backendUrl, { withCredentials: true } as BrowserOpts);

const useSocket = create<SocketState>((set) => ({
  messagesReceived: [],
  isConnected: socket.connected,
  connectError: null,
  isConnecting: false,
  connect: () => {
    set({ isConnecting: true });
    socket.off("connect");
    socket.off("connect_error");
    socket.off("disconnect");
    socket.off("message");

    socket.on("connect", () =>
      set({ isConnected: true, connectError: null, isConnecting: false }),
    );
    socket.on("connect_error", (err: Error) =>
      set({ connectError: err.message, isConnecting: false }),
    );
    socket.on("disconnect", () => set({ isConnected: false }));

    socket.on("message", (message: MessageReceived) => {
      set(({ messagesReceived }) => ({
        messagesReceived: [...messagesReceived, message],
      }));
    });
  },

  disconnect: () => {
    socket.disconnect();
    set({ isConnected: false });
  },

  sendMessage: (msg) => {
    console.log(msg);
    socket.emit("message", msg);
  },
}));

export default useSocket;

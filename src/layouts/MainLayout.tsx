import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/main/Header";
import Aside from "../components/main/Aside";
import { House, MessagesSquare, UserRound } from "lucide-react";
import useAuth from "../stores/authStore";
import type { User } from "../types/types";
import useSocket from "../stores/socketStore";
import toast from "react-hot-toast";

function MainLayout() {
  const [asideOpen, setAsideOpen] = useState<boolean>(() => {
    const stored = sessionStorage.getItem("aside");
    return stored !== null ? JSON.parse(stored) : true;
  });

  const user = useAuth((state) => state.user) as User;
  const { connect, disconnect, isConnected, messagesReceived } = useSocket();

  //useeffect for connecting to websockets
  useEffect(() => {
    if (!isConnected) {
      connect();
    }

    return () => {
      if (isConnected) {
        disconnect();
      }
    };
  }, [isConnected, connect, disconnect]);

  //useeffect for toast notification for real time messages
  useEffect(() => {
    if (messagesReceived.length > 0) {
      const latestMessage = messagesReceived[messagesReceived.length - 1];
      if (
        latestMessage.sender.username !== user.username &&
        !latestMessage.read
      ) {
        console.log(latestMessage);
        toast.success(
          `${latestMessage.sender.username}: ${latestMessage.type === "TEXT" ? latestMessage.content.slice(0, 20) + "..." : "GIF"}`,
        );
      }
    }
  }, [messagesReceived, user.username]);

  return (
    <>
      <Header avatar={user.profilePicture} />
      <Aside
        paths={[
          { href: "/home", name: "Home", icon: House },
          { href: "/profile", name: "Profile", icon: UserRound },
          { href: "/messages", name: "Messages", icon: MessagesSquare },
        ]}
        asideOpen={asideOpen}
        setAsideOpen={setAsideOpen}
      />
      <main
        className={`${asideOpen ? "w-[80vw] ml-[20vw]" : "w-[90vw] ml-[10vw]"} mt-[15vh]`}
      >
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;

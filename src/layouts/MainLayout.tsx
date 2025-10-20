import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/main/Header";
import Aside from "../components/main/Aside";
import { House, MessagesSquare, UserRound } from "lucide-react";
import useAuth from "../stores/authStore";
import type { User } from "../types/types";
import useSocket from "../stores/socketStore";

function MainLayout() {
  const [asideOpen, setAsideOpen] = useState<boolean>(() => {
    const stored = sessionStorage.getItem("aside");
    return stored !== null ? JSON.parse(stored) : true;
  });

  const user = useAuth((state) => state.user) as User;
  const { connect, disconnect } = useSocket((state) => state);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

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

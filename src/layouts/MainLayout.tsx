import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/main/Header";
import Aside from "../components/main/Aside";
import { House, MessagesSquare, UserRound } from "lucide-react";
import useAuth from "../stores/authStore";
import { ThemeProvider } from "../components/ThemeProvider";
import type { User } from "../types/types";

//add messages count over messages icon
function MainLayout() {
  const [asideOpen, setAsideOpen] = useState<boolean>(() => {
    const stored = sessionStorage.getItem("aside");
    return stored !== null ? JSON.parse(stored) : true;
  });

  const usr = {
    username: "john",
    profilePicture: null,
    bio: null,
    _count: {
      followers: 12,
      following: 11,
    },
  }; //remove after development

  useAuth.getState().setUser(usr);//remove after development
  
  //user is definitely known here since the loader would otherwise redirect
  const user = useAuth((state) => state.user) as User;
  
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
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
    </ThemeProvider>
  );
}

export default MainLayout;

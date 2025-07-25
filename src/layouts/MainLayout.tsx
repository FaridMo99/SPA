import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/main/Header";
import Aside from "../components/main/Aside";
import { House, UserRound } from "lucide-react";
import useAuth from "../stores/authStore";

function MainLayout() {
  const [asideOpen, setAsideOpen] = useState<boolean>(() => {
    const stored = sessionStorage.getItem("aside");
    return stored !== null ? JSON.parse(stored) : true;
  });

  const user = useAuth((state) => state.user);

  return (
    <>
      <Header avatar={user?.avatar ?? null} />
      <Aside
        paths={[
          { href: "/home", name: "Home", icon: House },
          { href: "/profile", name: "Profile", icon: UserRound },
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

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/main/Header";
import Aside from "../components/main/Aside";
import { House, UserRound } from "lucide-react";

function MainLayout() {
  const [asideOpen, setAsideOpen] = useState(() => {
    const stored = sessionStorage.getItem("aside");
    return stored !== null ? JSON.parse(stored) : true;
  });

  return (
    <>
      <Header />
      <Aside
        paths={[
          { href: "/home", name: "Home", icon: <House /> },
          { href: "/profile", name: "Profile", icon: <UserRound /> },
        ]}
        asideOpen={asideOpen}
        setAsideOpen={setAsideOpen}
      />
      <main
        className={`${asideOpen ? "w-[77vw] ml-[20vw]" : "w-[87vw] ml-[10vw]"} mt-[15vh]`}
      >
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;

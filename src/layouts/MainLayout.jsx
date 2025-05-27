import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/main/Header";
import Aside from "../components/main/Aside";

function MainLayout() {
  return (
    <>
      <Header />
      <Aside
        paths={[
          { href: "/home", name: "Home" },
          { href: "/profile", name: "Profile" },
        ]}
      />
      <main className="w-[80vw] mt-[15vh] h-screen bg-gray-600 ml-[20vw]">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;

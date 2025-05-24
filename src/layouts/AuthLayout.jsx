import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main className="w-full h-screen bg-black">
      <Outlet />
    </main>
  );
}

export default AuthLayout;

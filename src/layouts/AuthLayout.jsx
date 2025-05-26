import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main className="w-full h-screen bg-gray-50 flex justify-center items-center ">
      <Outlet />
    </main>
  );
}

export default AuthLayout;

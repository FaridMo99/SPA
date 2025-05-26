import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main className="w-full h-screen bg-gray-50 flex justify-center items-center ">
      <section className="w-1/2 h-2/3 md:w-[38vw] font-manrope bg-white rounded-2xl outline-1 outline-gray-200 shadow-md shadow-black/20 z-2 flex flex-col justify-center items-center">
        <h1 className="font-bold text-4xl mt-4">friendly.</h1>
        <Outlet />
      </section>
    </main>
  );
}

export default AuthLayout;

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Hint from "../components/Hint";

function AuthLayout() {
  const location = useLocation();
  return (
    <>
      <main className="w-full h-screen bg-gray-50 flex justify-center items-center ">
        <AnimatePresence mode="wait">
          <motion.section
            key={location.pathname}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-1/2 h-[68vh] md:w-[38vw] bg-white rounded-2xl outline-1 outline-gray-200 shadow-md shadow-black/20 z-2 flex flex-col justify-center items-center"
            style={{ transformStyle: "preserve-3d" }}
            aria-label="Authentication"
          >
            <h1 className="font-bold text-4xl mt-4">friendly.</h1>
            <Outlet />
          </motion.section>
        </AnimatePresence>
      </main>
      <Hint />
    </>
  );
}

export default AuthLayout;

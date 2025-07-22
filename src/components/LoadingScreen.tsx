import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <main className="w-screen h-screen flex justify-center font-manrope items-center text-3xl font-bold">
      <motion.h1
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        friendly.
      </motion.h1>
    </main>
  );
}

export default LoadingScreen;

import React from "react";

function SuccessScreen({ Icon }) {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black/70 flex justify-center items-center z-50">
      <Icon size={null} className="w-1/2 text-green-500 animate-ping" />
    </div>
  );
}

export default SuccessScreen;

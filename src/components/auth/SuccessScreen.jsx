import React from "react";

function SuccessScreen({ Icon, animation }) {
  return (
    <div className="w-screen h-screen fixed bg-black/70 flex justify-center items-center z-100">
      <Icon size={null} className={`w-1/2 text-green-300 ${animation} `} />
    </div>
  );
}

export default SuccessScreen;

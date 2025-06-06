import React from "react";
import { User } from "lucide-react";

function UserImage({ img, styles = "", size = 22, mdSize = 30 }) {
  return (
    <div
      className={`w-${size} h-${size} md:h-${mdSize} md:w-${mdSize} flex justify-center items-center rounded-full border-green-300 border-4 overflow-hidden  bg-gray-600 ${styles}`}
    >
      {!img ? (
        <User size={60} className="text-green-300" />
      ) : (
        <img
          src={img}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

export default UserImage;

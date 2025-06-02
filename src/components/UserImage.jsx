import React from "react";
import { User } from "lucide-react";

function UserImage({ img }) {
  return (
    <div className="w-22 h-22 md:h-30 md:w-30 flex justify-center items-center rounded-full border-green-300 border-4 overflow-hidden  bg-gray-600">
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

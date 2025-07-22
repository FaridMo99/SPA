import { User } from "lucide-react";
import type { Avatar } from "./main/Header";

function UserImage({ img, styles = "" }: { img: Avatar; styles?: string }) {
  return (
    <div
      className={`w-16 h-16 md:w-20 md:h-20 flex justify-center items-center rounded-full border-green-300 border-4 overflow-hidden  bg-gray-600 ${styles}`}
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

import { User } from "lucide-react";
import type { Avatar } from "../main/Header";

function UserImage({
  img,
  styles = "w-16 h-16 md:w-20 md:h-20",
}: {
  img: Avatar;
  styles?: string;
}) {
  return (
    <div
      className={`flex justify-center items-center rounded-full border-green-300 dark:border-dark-green border-4 overflow-hidden  bg-gray-600 dark:bg-dark-gray ${styles}`}
    >
      {img ? (
        <img
          src={img}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        <User size={60} className="text-green-300 dark:text-dark-green" />
      )}
    </div>
  );
}

export default UserImage;

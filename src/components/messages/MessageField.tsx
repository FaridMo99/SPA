import UserImage from "../ui/UserImage";
import passedTime from "../../utils/passedTime";
import type { Avatar } from "../main/Header";

type MessageFieldProps = {
  profilePicture: Avatar;
  content: string | null;
  createdAt: Date;
  username: string;
  isOwn: boolean;
};

function MessageField({
  profilePicture,
  content,
  createdAt,
  username,
  isOwn,
}: MessageFieldProps) {
  return (
    <li
      className={`flex w-full items-end gap-2 my-2 ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      {!isOwn && <UserImage img={profilePicture} styles="w-10 h-10" />}

      <div
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-sm text-sm
          ${
            isOwn
              ? "bg-green-400 dark:bg-dark-green text-black dark:text-white font-bold rounded-br-none"
              : "bg-gray-200 text-gray-900 rounded-bl-none"
          }`}
      >
        {!isOwn && (
          <p className="text-xs font-semibold text-gray-600 mb-0.5">
            {username}
          </p>
        )}

        <p>
          {content ?? (
            <i className="text-gray-400">User deleted this message</i>
          )}
        </p>

        <p
          className={`text-[10px] mt-1 ${
            isOwn ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {passedTime(createdAt)}
        </p>
      </div>

      {isOwn && <UserImage img={profilePicture} styles="w-10 h-10" />}
    </li>
  );
}

export default MessageField;

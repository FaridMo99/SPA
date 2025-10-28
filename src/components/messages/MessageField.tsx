import UserImage from "../ui/UserImage";
import passedTime from "../../utils/passedTime";
import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import useSocket from "../../stores/socketStore";
import { useEffect } from "react";
import type { Avatar, ContentType } from "../../types/types";

type MessageFieldProps = {
  profilePicture: Avatar;
  content: string | null;
  createdAt: Date;
  username: string;
  isOwn: boolean;
  messageId: string;
  chatId: string;
  type: ContentType;
};

function MessageField({
  profilePicture,
  content,
  createdAt,
  username,
  isOwn,
  messageId,
  chatId,
  type,
}: MessageFieldProps) {
  const queryClient = useQueryClient();
  const { deleteMessage, messageDeleted } = useSocket((state) => state);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["get chat", chatId] });
  }, [messageDeleted, chatId, queryClient]);

  function deleteHandler() {
    deleteMessage(chatId, messageId);
  }

  return (
    <li
      className={`flex w-full relative items-end gap-2 my-2 ${
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

        <p className="max-w-20 md:max-w-40 break-all">
          {(() => {
            if (!content)
              return <i className="text-gray-400">User deleted this message</i>;

            switch (type) {
              case "TEXT":
                return content;
              case "GIF":
                return <img src={content} alt="GIF content" />;
              default:
                return null;
            }
          })()}
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
      {content && isOwn && (
        <button
          type="button"
          className="absolute -top-2 right-0 disabled:text-neutral-500"
          aria-label="delete message"
          onClick={deleteHandler}
        >
          <Trash2 size={20} />
        </button>
      )}
    </li>
  );
}

export default MessageField;

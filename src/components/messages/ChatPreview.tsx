import UserImage from "../ui/UserImage";
import type { Avatar } from "../main/Header";
import { NavLink } from "react-router-dom";

type ChatPreviewTypes = {
  profilePicture: Avatar;
  oppositeUserUsername: string;
  mostRecentMessage: string;
  senderMostRecentMessage: string;
  chatId: string;
};

//add count of unread messages
function ChatPreview({
  profilePicture,
  oppositeUserUsername,
  mostRecentMessage,
  senderMostRecentMessage,
  chatId,
}: ChatPreviewTypes) {
  return (
    <NavLink
      to={`/messages/${chatId}`}
      className={({ isActive }) =>
        `flex w-full items-center rounded-md transition
     hover:bg-neutral-300 dark:hover:bg-neutral-900
     p-2 mb-2 min-h-22
     ${isActive ? "bg-neutral-300 dark:bg-neutral-900" : ""}`
      }
    >
      <UserImage img={profilePicture} styles="w-10 h-10 mr-2 flex-shrink-0" />

      <div className="flex flex-col h-full min-w-0 justify-evenly">
        <p className="text-green-400 dark:text-dark-green font-bold truncate w-full mb-1 flex-shrink-0">
          @{oppositeUserUsername}
        </p>
        <p className="flex w-full overflow-hidden">
          <span className="font-bold truncate max-w-[50%] mr-1">
            {senderMostRecentMessage}
          </span>
          <span className="truncate flex-grow">{mostRecentMessage}</span>
        </p>
      </div>
    </NavLink>
  );
}

export default ChatPreview;

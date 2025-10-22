import { Plus } from "lucide-react";
import { useState } from "react";
import AddChatModal from "./AddChatModal";
import { useQuery } from "@tanstack/react-query";
import { getAllUserChats } from "../../utils/chatHandlers";
import CustomLoader from "../ui/CustomLoader";
import ErrorText from "../ui/ErrorText";
import ChatPreview from "./ChatPreview";
import useAuth from "../../stores/authStore";
import useSocket from "../../stores/socketStore";

function ChatNavbar() {
  const user = useAuth((state) => state.user)!;
  const [isAddChatModalOpen, setIsAddChatModalOpen] = useState<boolean>(false);
  const { messagesReceived, messageDeleted } = useSocket((state) => state);
  const {
    data: chats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get all chats", messagesReceived, messageDeleted],
    queryFn: getAllUserChats,
  });

  console.log(chats);
  return (
    <nav className="min-h-[85vh] max-h-[85vh] overflow-y-auto w-[13vw] border-r-2 p-2 border-r-green-300 dark:border-r-dark-green bg-gray-50 dark:bg-dark-gray z-10 flex flex-col items-center">
      <button
        onClick={() => setIsAddChatModalOpen(true)}
        title="Add Chat"
        aria-label="Add chat"
        className="dark:bg-neutral-700 bg-neutral-400 rounded-full p-2 mt-4 mb-6 hover:brightness-110 cursor-pointer"
      >
        <Plus className="text-white" size={48} />
      </button>
      {isLoading && <CustomLoader styles="mt-20 md:mt-50" size={60} />}
      {!isLoading && isError && <ErrorText text="Something went wrong..." />}
      {!isLoading &&
        chats &&
        chats.length > 0 &&
        chats.map((chat) => (
          <ChatPreview
            key={chat.id}
            mostRecentMessageType={
              chat.messages.length > 0 ? chat.messages[0].type : ""
            }
            countUnreadMessages={chat._count.messages}
            chatId={chat.id}
            profilePicture={
              chat.userOne.username === user.username
                ? chat.userTwo.profilePicture
                : chat.userOne.profilePicture
            }
            oppositeUserUsername={
              chat.userOne.username === user.username
                ? chat.userTwo.username
                : chat.userOne.username
            }
            /*change this later because when finished their shouldnt be chats possible with no messages since createing chat happens after sending message*/
            mostRecentMessage={
              chat.messages.length > 0 ? chat.messages[0].content : ""
            }
            senderMostRecentMessage={
              chat.messages.length > 0
                ? chat.messages[0].sender.username + ":"
                : ""
            }
          />
        ))}
      {isAddChatModalOpen && <AddChatModal setIsOpen={setIsAddChatModalOpen} />}
    </nav>
  );
}

export default ChatNavbar;

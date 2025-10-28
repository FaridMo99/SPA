import { useLocation, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSingleChatMessagesByChatId } from "../utils/chatHandlers";
import MessagesContainer from "../components/messages/MessagesContainer.tsx";
import useSocket from "../stores/socketStore.tsx";
import CustomLoader from "../components/ui/CustomLoader.tsx";
import ErrorText from "../components/ui/ErrorText.tsx";
import NotFound from "../components/ui/NotFound.tsx";
import CreateMessage from "../components/messages/CreateMessage.tsx";


function Messages() {
  const { chatId } = useParams();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { messagesReceived, messageSentSuccessful, messageDeleted } = useSocket(
    (state) => state
  );

  const {
    data: chat,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get chat", chatId],
    queryFn: () => getSingleChatMessagesByChatId(chatId ?? ""),
  });

  useEffect(() => {
    if (messagesReceived || messageSentSuccessful) {
      queryClient.invalidateQueries({
        queryKey: ["get chat", chatId],
      });
    }
    queryClient.invalidateQueries({
      queryKey: ["get all chats", messagesReceived, messageDeleted],
    });
    queryClient.invalidateQueries({
      queryKey: ["get unread message count", messagesReceived],
    });
  }, [
    messagesReceived,
    messageSentSuccessful,
    messageDeleted,
    chatId,
    queryClient,
    location
  ]);

  return (
    <section className="w-full h-full">
      <div className="w-full h-[85vh] flex flex-col justify-center items-center p-6">
        {isLoading && <CustomLoader size={80} />}
        {isError && <ErrorText text="Something went wrong..." />}
        {chat && chat.messages.length === 0 && (
          <NotFound text="No Messages sent yet" />
        )}
        {chat && chat.messages.length > 0 && (
          <MessagesContainer messages={chat.messages} chatId={chatId ?? ""} />
        )}
      </div>
      <CreateMessage chatId={chatId ?? ""} />
    </section>
  );
}

export default Messages;

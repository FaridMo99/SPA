import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MessageCommentForm from "../components/ui/MessageCommentForm";
import { useEffect, useState } from "react";
import { getSingleChatMessagesByChatId } from "../utils/chatHandlers";
import MessagesContainer from "../components/messages/MessagesContainer.tsx";
import useSocket from "../stores/socketStore.tsx";
import CustomLoader from "../components/ui/CustomLoader.tsx";
import ErrorText from "../components/ui/ErrorText.tsx";
import NotFound from "../components/ui/NotFound.tsx";

//add pagination/infinite scroll
function Messages() {
  const { chatId } = useParams();
  const [message, setMessage] = useState<string>("");
  const queryClient = useQueryClient();

  const { sendMessage, messagesReceived, messageSentSuccessful } = useSocket(
    (state) => state,
  );

  const {
    data: chat,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get chat", chatId, messagesReceived, messageSentSuccessful],
    queryFn: () => getSingleChatMessagesByChatId(chatId ?? ""),
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["get all chats"] });
  }, [messageSentSuccessful, messagesReceived, queryClient]);

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage({ message, chatId: chatId ?? "" });
    setMessage("");
  }

  return (
    <section className="w-full h-full">
      <div className="w-full h-[85vh] flex flex-col justify-center items-center p-6">
        {isLoading && <CustomLoader size={80} />}
        {isError && <ErrorText text="Something went wrong..." />}
        {chat && chat.messages.length === 0 && (
          <NotFound text="No Messages sent yet" />
        )}
        {chat && chat.messages.length > 0 && (
          <MessagesContainer messages={chat.messages} />
        )}
      </div>
      <MessageCommentForm
        placeholder="Send Message"
        ariaLabel="send message"
        value={message}
        setValue={setMessage}
        submitHandler={submitHandler}
        isPending={false}
      />
    </section>
  );
}

export default Messages;

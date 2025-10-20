import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import MessageCommentForm from "../components/ui/MessageCommentForm";
import { useState } from "react";
import { getSingleChatMessagesByChatId } from "../utils/chatHandlers";
import MessagesContainer from "../components/messages/MessagesContainer.tsx";
import useSocket from "../stores/socketStore.tsx";
import CustomLoader from "../components/ui/CustomLoader.tsx";
import ErrorText from "../components/ui/ErrorText.tsx";
import NotFound from "../components/ui/NotFound.tsx";

//inside chat should be scrollable and auto scroll to lowest(most recent messages)
//add pagination/infinite scroll
//add some listener to know when the message got received

function Messages() {
  const { chatId } = useParams();
  const [message, setMessage] = useState<string>("");
  const queryClient = useQueryClient();

  const { sendMessage, isConnecting } = useSocket((state) => state);

  //invalidate query to updae ui on successful message sending
  const {
    data: chat,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get chat", chatId],
    queryFn: () => getSingleChatMessagesByChatId(chatId ?? ""),
  });

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage({ message, chatId: chatId ?? "" });
  }

  //look how to handle send messages states like sending,pending,error,success

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

import React, { useState } from "react";
import MessageCommentForm from "../ui/MessageCommentForm";
import useSocket from "../../stores/socketStore";

function CreateMessage({ chatId }: { chatId: string }) {
  const sendMessage = useSocket((state) => state.sendMessage);
  const [message, setMessage] = useState<string>("");

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage({ message, chatId: chatId ?? "" });
    setMessage("");
  }

  return (
    <MessageCommentForm
      placeholder="Send Message"
      ariaLabel="send message"
      value={message}
      setValue={setMessage}
      submitHandler={submitHandler}
      isPending={false}
    />
  );
}

export default CreateMessage;

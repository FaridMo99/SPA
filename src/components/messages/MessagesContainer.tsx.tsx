import { useEffect, useRef } from "react";
import useAuth from "../../stores/authStore";
import type { Message, User } from "../../types/types";
import MessageField from "./MessageField";

//change to proper messages type
//should mutate messages to read = true
//logic for deleted true and content null to just notify it got deleted
//logic for deleting message

function MessagesContainer({
  messages,
  chatId,
}: {
  messages: Message[] | [];
  chatId: string;
}) {
  const { username } = useAuth((state) => state.user) as User;
  const viewEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    viewEndRef.current?.scrollIntoView();
  }, []);

  //profile picture for whatever reason type only string instead of string/null,check in backend why exactly
  return (
    <ul className="w-full h-full overflow-scroll flex flex-col items-center mb-10">
      {messages.map((message) => (
        <MessageField
          type={message.type}
          key={message.createdAt.toString()}
          profilePicture={message.sender.profilePicture}
          messageId={message.id}
          chatId={chatId}
          content={message.content}
          createdAt={message.createdAt}
          username={message.sender.username}
          isOwn={message.sender.username === username ? true : false}
        />
      ))}
      <div ref={viewEndRef} />
    </ul>
  );
}

export default MessagesContainer;

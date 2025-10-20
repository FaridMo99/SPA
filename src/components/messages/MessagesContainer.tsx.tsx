import useAuth from "../../stores/authStore";
import type { Message, User } from "../../types/types";
import MessageField from "./MessageField";

//change to proper messages type
//should auto scroll to bottom
//should mutate messages to read = true
//logic for deleted true and content null to just notify it got deleted
//logic for deleting message

function MessagesContainer({ messages }: { messages: Message[] | [] }) {
  const { username } = useAuth((state) => state.user) as User;

  console.log(messages);

  //profile picture for whatever reason type only string instead of string/null,check in backend why exactly
  return (
    <ul className="w-full h-full overflow-scroll flex flex-col items-center">
      {messages.map((message) => (
        <MessageField
          key={message.createdAt.toString()}
          profilePicture={message.sender.profilePicture}
          content={message.content}
          createdAt={message.createdAt}
          username={message.sender.username}
          isOwn={message.sender.username === username ? true : false}
        />
      ))}
    </ul>
  );
}

export default MessagesContainer;

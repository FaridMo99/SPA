import { backendUrl } from "../stores/authStore";
import type { ChatList, Message } from "../types/types";

//change this later this just provisiorically
export type Chat = {
  id: string;
  createdAt: Date;
  userOneId: string;
  userTwoId: string;
  deletedByUserOne: boolean;
  deletedAtUserOne: Date;
  deletedByUserTwo: boolean;
  deletedAtUserTwo: Date;
  messages: Message[] | [];
};

export async function createChat(userTwoUsername: string): Promise<Chat> {
  const res = await fetch(`${backendUrl}/chats`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userTwoUsername }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return await res.json();
}

//should also be able to send gifs but no images
//not needed i think since websockets send message not http
/*export async function sendMessage(
  message: string,
  receiverUsername:string,
  chatId:string
): Promise<{ chatId: string }> {
  const res = await fetch(`${backendUrl}/chats/${chatId}/messages`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message,receiverUsername }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return await res.json();
}*/

export async function deleteMessage(
  messageId: string,
  chatId: string,
): Promise<{ chatId: string }> {
  const res = await fetch(
    `${backendUrl}/chats/${chatId}/messages/${messageId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return await res.json();
}

//should only delete for the user that deleted it like just kicking a flag thats deleted true for him and then doesnt render anymore
export async function deleteChat(chatId: string): Promise<{ chatId: string }> {
  const res = await fetch(`${backendUrl}/etc./${chatId}`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return await res.json();
}

export async function getAllUserChats(): Promise<ChatList> {
  const res = await fetch(`${backendUrl}/chats`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.json());

  return await res.json();
}

export async function getSingleChatMessagesByChatId(
  chatId: string,
): Promise<Chat> {
  const res = await fetch(`${backendUrl}/chats/${chatId}/messages`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.json());

  return await res.json();
}

//look what typings you have to add to promise void
//add some logic that when you have new messages in a chat its the first chats and have a green dot on that chat and on this messages icon in general on aside component
//add chat group functionality

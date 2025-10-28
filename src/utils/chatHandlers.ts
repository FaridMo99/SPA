import { backendUrl } from "../stores/authStore";
import type { ChatList, Chat } from "../types/types";



export async function createChat(userTwoUsername: string): Promise<Omit<Chat, "messages">> {
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

export async function deleteChat(chatId: string):Promise<{id:string}> {
  const res = await fetch(`${backendUrl}/chats/${chatId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    console.log(err)
    throw new Error(err.message);
  }

  return await res.json()
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

export async function getAllUnreadMessagesCount(): Promise<number> {
  const res = await fetch(`${backendUrl}/chats/messages?read=false`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.json());

  return await res.json();
}

//look what typings you have to add to promise void
//add some logic that when you have new messages in a chat its the first chats and have a green dot on that chat and on this messages icon in general on aside component
//add chat group functionality

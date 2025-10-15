import type z from "zod";
import { backendUrl } from "../stores/authStore";
import type { User } from "../types/types";
import type { editUserSchema } from "../schemas/schemas";

export type EditFields = z.infer<typeof editUserSchema>;

export default async function editUser(
  username: string,
  fieldsToEdit: EditFields,
): Promise<User> {
  const res = await fetch(`${backendUrl}/users/${username}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fieldsToEdit),
  });

  if (!res.ok) {
    throw new Error("Edit failed");
  }

  return await res.json();
}

export async function follow(username: string): Promise<User> {
  const res = await fetch(`${backendUrl}/users/${username}/follow`, {
    method: "POST",
    credentials: "include",
  });
  console.log("hit follow");

  if (!res.ok) {
    throw new Error(`Following failed`);
  }
  return await res.json();
}

export async function unfollow(username: string): Promise<User> {
  const res = await fetch(`${backendUrl}/users/${username}/follow`, {
    method: "DELETE",
    credentials: "include",
  });
  console.log("hit unfollow");
  if (!res.ok) {
    throw new Error(`Unfollowing failed`);
  }
  return await res.json();
}

export async function deleteUser(username: string): Promise<User> {
  const response = await fetch(`${backendUrl}/users/${username}`, {
    credentials: "include",
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`User not found`);
  const data = await response.json();
  return data;
}

import type z from "zod";
import useAuth, { backendUrl } from "../stores/authStore";
import type { ForgotPasswordSchema, User } from "../types/types";
import type { editUserSchema } from "../schemas/schemas";

export type EditFields = z.infer<typeof editUserSchema>;

export type ChangePasswordArgs = {
  password: string;
  token: string;
  userId: string;
};

export default async function editUser(username: string, fieldsToEdit: EditFields): Promise<User> {
  let body: BodyInit;
  const headers: HeadersInit = {};

  if (fieldsToEdit.profilePicture) {
    const formData = new FormData();
    formData.append("profilePicture", fieldsToEdit.profilePicture);
    if (fieldsToEdit.bio) formData.append("bio", fieldsToEdit.bio);
    if (fieldsToEdit.username)
      formData.append("username", fieldsToEdit.username);
    body = formData;
  } else {
    body = JSON.stringify(fieldsToEdit);
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${backendUrl}/users/${username}`, {
    method: "PATCH",
    credentials: "include",
    headers,
    body,
  });

  if (!res.ok) {
    throw new Error("Edit failed");
  }

  return res.json();
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

export async function forgotPassword(
  email: ForgotPasswordSchema,
): Promise<void> {
  const response = await fetch(`${backendUrl}/auth/forgot-password`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
}

export async function changePassword(input: ChangePasswordArgs): Promise<User> {
  console.log("run change password");
  const response = await fetch(`${backendUrl}/auth/change-password`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
    body: JSON.stringify(input),
  });
  const res = await response.json();

  if (!response.ok) throw new Error(res.message);

  const user: User = res;
  useAuth.getState().setUser(user);

  return user;
}

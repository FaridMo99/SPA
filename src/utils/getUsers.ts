import { backendUrl } from "../stores/authStore";
import type { User } from "../types/types";

export async function getUser(username: string): Promise<User> {
  const response = await fetch(`/${backendUrl}/users/${username}/followers`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(`User not found`);
  const data = await response.json();
  return data;
}

export async function searchUsers(username: string): Promise<User[] | []> {
  const response = await fetch(`/${backendUrl}/users/search/${username}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(`User not found`);
  const data = await response.json();
  return data;
}

export async function getFollowers(username: string): Promise<User[] | []> {
  const response = await fetch(`/${backendUrl}/users/${username}/followers`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(`No User found`);
  const data = await response.json();
  return data;
}

export async function getFollowing(username: string): Promise<User[] | []> {
  const response = await fetch(`/${backendUrl}/users/${username}/following`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(`No User found`);
  const data = await response.json();
  return data;
}

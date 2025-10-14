import { backendUrl } from "../stores/authStore";
import type { FollowerList, FollowingList, User } from "../types/types";

export async function getUser(username: string): Promise<User> {
  const response = await fetch(`${backendUrl}/users/${username}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(`User not found`);
  const data = await response.json();
  return data;
}

export async function searchUsers(username: string): Promise<User[] | []> {
  const response = await fetch(`${backendUrl}/users/search/${username}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(`User not found`);
  const data = await response.json();
  return data;
}

export async function getFollowers(username: string): Promise<FollowerList> {
  const response = await fetch(`${backendUrl}/users/${username}/followers`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(`No User found`);
  const data = await response.json();
  return data;
}

export async function getFollowing(username: string): Promise<FollowingList> {
  const response = await fetch(`${backendUrl}/users/${username}/following`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(`No User found`);
  const data = await response.json();
  return data;
}

export async function getFollowStatus(username: string): Promise<boolean> {
  const response = await fetch(`${backendUrl}/users/${username}/mutual`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(`No User found`);
  const data = await response.json();
  return data.following;
}

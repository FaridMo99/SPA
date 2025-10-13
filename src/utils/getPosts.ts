import { backendUrl } from "../stores/authStore";
import type { Post } from "../types/types";

type Posts = Post[] | [];

export async function getPostByPostId(postId: string): Promise<Post> {
  const response = await fetch(`/${backendUrl}/posts/${postId}`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error(`Post not found`);

  const data = await response.json();
  return data;
}

export async function getAllPostsByUsername(name: string): Promise<Posts> {
  const response = await fetch(`${backendUrl}/posts/${name}/posts`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(`No Posts found`);

  const data = await response.json();
  return data;
}

export async function getAllPostsByFollow(): Promise<Posts> {
  const response = await fetch(`${backendUrl}/posts/follow`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(`No Posts found`);

  const data = await response.json();
  return data;
}

export async function getPostsForFyp(): Promise<Posts> {
  const response = await fetch(`${backendUrl}/posts/fyp`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(`No Posts found`);

  const data = await response.json();
  return data;
}

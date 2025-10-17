import { backendUrl } from "../stores/authStore";
import type { Post, Posts } from "../types/types";

export async function getPostByPostId(postId: string): Promise<Post> {
  const response = await fetch(`${backendUrl}/posts/${postId}`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error(`Post not found`);

  const data = await response.json();
  return data;
}

export async function getAllPostsByUsername(name: string): Promise<Posts> {
  console.log(backendUrl);
  const response = await fetch(`${backendUrl}/posts/${name}/posts`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(`No Posts found`);

  const data = await response.json();
  return data;
}

export async function getPostsByFollow(page: number): Promise<Posts> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: String(10),
  });

  const response = await fetch(
    `${backendUrl}/posts/follow?${params.toString()}`,
    {
      credentials: "include",
    },
  );
  if (!response.ok) throw new Error(`No Posts found`);

  const data = await response.json();
  return data;
}

export async function getPostsForFyp(page: number): Promise<Posts> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: String(10),
  });

  const response = await fetch(`${backendUrl}/posts/fyp?${params.toString()}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(`No Posts found`);

  const data = await response.json();
  return data;
}

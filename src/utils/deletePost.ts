import { backendUrl } from "../stores/authStore";
import type { Post } from "../types/types";

export default async function deletePost(postId: string): Promise<Post> {
  const res = await fetch(`${backendUrl}/posts/${postId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Delete failed");
  }

  return await res.json();
}

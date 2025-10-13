import { backendUrl } from "../stores/authStore";
import type { Post } from "../types/types";

export default async function createPost(data: {
  content: string;
}): Promise<Post> {
  const res = await fetch(`${backendUrl}/posts`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Submitting Data failed");
  }

  return await res.json();
}

import { backendUrl } from "../stores/authStore";
import type { Post } from "../types/types";

export async function createPost(data: { content: string }): Promise<Post> {
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

export async function createPostImage(file: File): Promise<File> {
  const formData = new FormData();
  formData.append("image", file);

  console.log(formData);
  const res = await fetch(`${backendUrl}/posts`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(await res.json());
  }

  return await res.json();
}

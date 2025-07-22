import type { Post } from "../mocks/data";

export type PostData = Omit<Post, "id">;

export default async function createPost(data: PostData) {
  const res = await fetch(`/api/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Submitting Data failed");
  }

  return await res.json();
}

import type { Comment, Post } from "../mocks/data";

export type CreateCommentType = Omit<Comment, "createdAt"> & { postId: string };

export async function like(postId: string, username: string): Promise<Post> {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "like",
      username,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to like post");
  }

  return await response.json();
}

export async function comment({
  postId,
  username,
  comment,
  avatar,
}: CreateCommentType): Promise<Post> {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "comment",
      username,
      comment,
      avatar,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to post comment");
  }

  return await response.json();
}

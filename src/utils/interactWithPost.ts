import { backendUrl } from "../stores/authStore";
import type { Post, Comment } from "../types/types";

export async function likePost(postId: string): Promise<Post> {
  const response = await fetch(`${backendUrl}/posts/${postId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to like post");
  }

  return await response.json();
}

export async function dislikePost(postId: string): Promise<Post> {
  const response = await fetch(`${backendUrl}/posts/${postId}/like`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to dislike post");
  }

  return await response.json();
}

export async function createComment(
  postId: string,
  data: { content: string },
): Promise<Comment> {
  const response = await fetch(`${backendUrl}/comments/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to comment on Post");
  }

  return await response.json();
}

export async function deleteComment(
  postId: string,
  commentId: string,
): Promise<Comment> {
  const response = await fetch(
    `${backendUrl}/comments/${postId}/${commentId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }

  return await response.json();
}

export async function getAllCommentsByPostId(
  postId: string,
): Promise<Comment[] | []> {
  const response = await fetch(`${backendUrl}/comments/${postId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("No Comments found");
  }

  return await response.json();
}

export async function getSingleCommentByCommentIdAndPostId(
  postId: string,
  commentId: string,
): Promise<Comment> {
  const response = await fetch(
    `${backendUrl}/comments/${postId}/${commentId}`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("No Comment found");
  }

  return await response.json();
}

export async function likeComment(
  postId: string,
  commentId: string,
): Promise<Comment> {
  const response = await fetch(
    `${backendUrl}/comments/${postId}/${commentId}/like`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to like comment");
  }

  return await response.json();
}

export async function dislikeComment(
  postId: string,
  commentId: string,
): Promise<Comment> {
  const response = await fetch(
    `${backendUrl}/comments/${postId}/${commentId}/like`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to dislike comment");
  }

  return await response.json();
}

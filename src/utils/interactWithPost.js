export async function like(postId, username) {
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

export async function comment(postId, username, text) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "comment",
      username,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to post comment");
  }

  return await response.json();
}

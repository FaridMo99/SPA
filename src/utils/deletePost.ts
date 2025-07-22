export default async function deletePost(id: string): Promise<boolean> {
  const res = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Delete failed");
  }

  return true;
}

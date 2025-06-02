export default async function deletePost(id) {
  const res = await fetch(
    `https://6831e441c3f2222a8cb0be24.mockapi.io/api/friendly/posts/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) {
    throw new Error("Delete failed");
  }

  return await res.json();
}

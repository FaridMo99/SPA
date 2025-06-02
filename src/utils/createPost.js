export default async function createPost(data) {
  const res = await fetch(
    "https://6831e441c3f2222a8cb0be24.mockapi.io/api/friendly/posts",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error("Submitting Data failed");
  }

  return await res.json();
}

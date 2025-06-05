export default async function getPosts(post = "") {
  const response = await fetch(`/api/posts${post}`);

  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  const data = await response.json();
  return data;
}

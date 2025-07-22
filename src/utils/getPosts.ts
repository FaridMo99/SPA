import type { Post } from "../mocks/data";

export async function getPosts(queryString: string = ""): Promise<Post[]> {
  const response = await fetch(`/api/posts${queryString}`);

  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);

  const data = await response.json();
  return data;
}

export async function getPostByUserId(id: string): Promise<Post> {
  const response = await fetch(`/api/posts/id/${id}`);
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);

  const data = await response.json();
  return data;
}

export async function getPostsByUserId(id: string): Promise<Post[]> {
  const response = await fetch(`/api/posts/${id}`);
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);

  const data = await response.json();
  return data;
}

export default async function getPosts(post = "") {
  const response = await fetch(
    `https://6831e441c3f2222a8cb0be24.mockapi.io/api/friendly/posts${post}`,
  );

  if (response.status === 404) {
    return [];
  }
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  const data = await response.json();
  return data;
}

//mockapi.io answers with a 404 instead of a empty array so i have to handle
//that here like that so the website doesnt break

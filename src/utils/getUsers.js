export default async function getUsers(user = "") {
  const response = await fetch(
    `https://6831e441c3f2222a8cb0be24.mockapi.io/api/friendly/users${user}`,
  );
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  const data = await response.json();
  return data;
}

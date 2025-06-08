export default async function getUsers(user = "") {
  const response = await fetch(`/api/users${user}`);
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  const data = await response.json();
  return data;
}

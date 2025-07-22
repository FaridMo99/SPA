import type { User } from "../mocks/data";

export async function getAllUsers(queryString: string = ""): Promise<User[]> {
  const response = await fetch(`/api/users${queryString}`);
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  const data = await response.json();
  return data;
}

export async function getUser(user: string): Promise<User> {
  const response = await fetch(`/api/users/${user}`);
  if (!response.ok)
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  const data = await response.json();
  console.log(data);
  return data;
}

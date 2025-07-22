import type { User } from "../mocks/data";
import type z from "zod";
import type editSchema from "../schemas/editSchema";

export type EditSchema = z.infer<typeof editSchema>;

export default async function editUser({
  data,
  username,
}: {
  data: EditSchema;
  username: string;
}): Promise<User> {
  const res = await fetch(`/api/users/${username}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json();
}

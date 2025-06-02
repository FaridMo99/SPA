export default async function editUser(data, id) {
  const res = await fetch(
    `https://6831e441c3f2222a8cb0be24.mockapi.io/api/friendly/users/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json();
}

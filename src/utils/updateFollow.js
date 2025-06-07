export async function updateFollow({ username, targetUsername, action }) {
  const res = await fetch(`/api/users/${username}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action,
      target: targetUsername,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to ${action}: ${res.statusText}`);
  }
  return await res.json();
}

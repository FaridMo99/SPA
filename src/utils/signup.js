import login from "./login";

export default async function signup(formData) {
  const response = await fetch(
    "https://6831e441c3f2222a8cb0be24.mockapi.io/api/friendly/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const { username, password } = data;

  const loginResult = await login({ username, password });

  return { signupData: data, loginResult };
}

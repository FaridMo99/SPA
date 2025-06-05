import { http, HttpResponse } from "msw";
import { v4 as uuid } from "uuid";
import { users, posts } from "./data";

const TOKEN = "mocktoken";

function generateToken(user) {
  return `${user.id}.${Date.now()}`;
}

export const handlers = [
  http.get("/api/users", () => {
    return new HttpResponse(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),

  http.post("/api/users", async (req) => {
    const newUser = await req.json();

    newUser.id = uuid();
    newUser.createdAt = new Date().toISOString();

    users.push(newUser);

    return new HttpResponse(201, {}, JSON.stringify(newUser));
  }),

  http.get("/api/users/:username", (req) => {
    const { username } = req.params;
    const user = users.find((u) => u.username === username);
    if (!user) {
      return new HttpResponse(
        404,
        {},
        JSON.stringify({ error: "User not found" }),
      );
    }
    return new HttpResponse(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),

  http.get("/api/posts", () => {
    return new HttpResponse(JSON.stringify(posts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),

  http.post("/api/posts", async (req) => {
    const newPost = await req.json();

    newPost.id = uuid();
    newPost.createdAt = new Date().toISOString();

    posts.push(newPost);

    return new HttpResponse(201, {}, JSON.stringify(newPost));
  }),

  http.patch("/api/users/:username", async (req) => {
    const { username } = req.params;
    const updates = await req.json();

    const userIndex = users.findIndex((u) => u.username === username);
    if (userIndex === -1) {
      return new HttpResponse(
        404,
        {},
        JSON.stringify({ error: "User not found" }),
      );
    }

    users[userIndex] = { ...users[userIndex], ...updates };

    return new HttpResponse(200, {}, JSON.stringify(users[userIndex]));
  }),

  http.delete("/api/posts/:id", (req) => {
    const { id } = req.params;

    const postIndex = posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      return new HttpResponse(
        404,
        {},
        JSON.stringify({ error: "Post not found" }),
      );
    }

    posts.splice(postIndex, 1);

    return new HttpResponse(204);
  }),

  // auth
  http.post("/api/login", async (req) => {
    const { username, password } = await req.json();
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );
    if (!user) {
      return new HttpResponse(
        401,
        {},
        JSON.stringify({ error: "Invalid credentials" }),
      );
    }
    const token = generateToken(user);
    const { password: _, ...safeUser } = user;

    return new HttpResponse(
      200,
      {
        "Set-Cookie": `${TOKEN}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24}`,
        "Content-Type": "application/json",
      },
      JSON.stringify(safeUser),
    );
  }),

  http.post("/api/signup", async (req) => {
    const newUser = await req.json();
    const exists = users.some(
      (u) => u.username === newUser.username || u.email === newUser.email,
    );
    if (exists) {
      return new HttpResponse(
        409,
        {},
        JSON.stringify({ error: "User already exists" }),
      );
    }
    newUser.id = uuid();
    newUser.createdAt = new Date().toISOString();
    users.push(newUser);

    const token = generateToken(newUser);
    const { password: _, ...safeUser } = newUser;

    return new HttpResponse(
      201,
      {
        "Set-Cookie": `${TOKEN}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24}`,
        "Content-Type": "application/json",
      },
      JSON.stringify(safeUser),
    );
  }),
  
];

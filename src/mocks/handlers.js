import { http } from "msw";
import { v4 as uuidv4 } from "uuid";
import { users, posts } from "./data";

export const handlers = [
  http.get("/api/users", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),

    http.post("/api/users", async (req, res, ctx) => {
    const newUser = await req.json();

    newUser.id = uuidv4();
    newUser.createdAt = new Date().toISOString();

    posts.push(newUser);

    return res(ctx.status(201), ctx.json(newUser));
  }),

  http.get("/api/users/:username", (req, res, ctx) => {
    const { username } = req.params;
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res(ctx.status(404), ctx.json({ error: "User not found" }));
    }
    return res(ctx.status(200), ctx.json(user));
  }),

  http.get("/api/posts", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(posts));
  }),

  http.post("/api/posts", async (req, res, ctx) => {
    const newPost = await req.json();

    newPost.id = uuidv4();
    newPost.createdAt = new Date().toISOString();

    posts.push(newPost);

    return res(ctx.status(201), ctx.json(newPost));
  }),

  http.patch("/api/users/:username", async (req, res, ctx) => {
    const { username } = req.params;
    const updates = await req.json();

    const userIndex = users.findIndex((u) => u.username === username);
    if (userIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: "User not found" }));
    }

    users[userIndex] = { ...users[userIndex], ...updates };

    return res(ctx.status(200), ctx.json(users[userIndex]));
  }),

  http.delete("/api/posts/:id", (req, res, ctx) => {
    const { id } = req.params;

    const postIndex = posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: "Post not found" }));
    }

    posts.splice(postIndex, 1);

    return res(ctx.status(204));
  }),
];

import { http, HttpResponse } from "msw";
import { v4 as uuid } from "uuid";
import {
  users,
  posts,
  type NewUser,
  type User,
  type Post,
  type Comment,
} from "./data";
import type { LoginFormData } from "../utils/login";
import type { SignupFormDataMandatory } from "../utils/signup";
import type { EditSchema } from "../utils/editUser";

type FollowAction = {
  action: "follow" | "unfollow";
  target: string;
};

type PatchBody = Partial<EditSchema> | (Partial<EditSchema> & FollowAction);

type CommentOrLike = {
  action: "comment" | "like";
  username: string;
  avatar?: string;
  comment?: string;
};

export const handlers = [
  http.get("/api/users", ({ request }) => {
    const url = new URL(request.url);
    const search: string = url.searchParams.get("search")?.toLowerCase() || "";

    const filteredUsers: User[] = users.filter(
      (u) =>
        u.username.toLowerCase().includes(search) ||
        u.bio?.toLowerCase().includes(search),
    );

    return new HttpResponse(JSON.stringify(filteredUsers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
  http.get("/api/posts/id/:id", ({ params }) => {
    const { id } = params;
    const post = posts.find((p) => p.id === id);

    if (!post) {
      return new HttpResponse(JSON.stringify({ error: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new HttpResponse(JSON.stringify(post), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),

  http.post("/api/users", async ({ request }) => {
    const newUser = (await request.json()) as NewUser;

    if (!newUser) {
      return new HttpResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const completeUser: User = {
      ...newUser,
      id: uuid(),
      createdAt: new Date().toISOString(),
      followers: [],
      following: [],
      posts: [],
    };

    users.push(completeUser);

    return new HttpResponse(JSON.stringify(newUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }),

  http.get("/api/users/:username", ({ params }) => {
    const { username } = params;
    const user = users.find((u) => u.username === username);
    if (!user) {
      return new HttpResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new HttpResponse(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),

  http.get("/api/posts", ({ request }) => {
    const url = new URL(request.url);
    const limitParam = url.searchParams.get("limit");
    const pageParam = url.searchParams.get("page");
    const sortParam = url.searchParams.get("sort") || "desc";

    const limit = limitParam ? parseInt(limitParam, 10) : posts.length;
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    const sortedPosts = [...posts].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortParam === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedPosts = sortedPosts.slice(start, end);

    return new HttpResponse(JSON.stringify(paginatedPosts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.get("/api/posts/:username", ({ params }) => {
    const { username } = params;

    const userPosts = posts.filter((post) => post.username === username);

    return new HttpResponse(JSON.stringify(userPosts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),

  http.post("/api/posts", async ({ request }) => {
    const newPost = (await request.json()) as Omit<Post, "id">;

    if (!newPost) {
      return new HttpResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const fullPost: Post = {
      ...newPost,
      id: uuid(),
    };
    posts.push(fullPost);

    return new HttpResponse(JSON.stringify(newPost), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }),

  http.patch("/api/users/:username", async ({ request, params }) => {
    const { username } = params as { username?: string };
    const body = (await request.json()) as PatchBody;

    if (!username || !body) {
      return new HttpResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userIndex = users.findIndex((u) => u.username === username);
    if (userIndex === -1) {
      return new HttpResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = users[userIndex];

    if ("action" in body && "target" in body) {
      const { action, target } = body;
      const targetIndex = users.findIndex((u) => u.username === target);

      if (targetIndex === -1) {
        return new HttpResponse(
          JSON.stringify({ error: "Target user not found" }),
          { status: 404, headers: { "Content-Type": "application/json" } },
        );
      }

      const targetUser = users[targetIndex];

      if (action === "follow") {
        if (!user.following.includes(target)) user.following.push(target);
        if (!targetUser.followers.includes(username))
          targetUser.followers.push(username);
      } else if (action === "unfollow") {
        user.following = user.following.filter((u) => u !== target);
        targetUser.followers = targetUser.followers.filter(
          (u) => u !== username,
        );
      }

      users[userIndex] = user;
      users[targetIndex] = targetUser;

      return HttpResponse.json(user);
    }

    const allowedFields: (keyof EditSchema)[] = ["username", "bio", "avatar"];

    posts.forEach((post) => {
      if (post.username === user.username) {
        if (body.username) post.username = body.username;
        if (body.avatar) post.avatar = body.avatar;
      }

      post.comments.forEach((comment) => {
        if (comment.username === user.username) {
          if (body.username) comment.username = body.username;
          if (body.avatar) comment.avatar = body.avatar;
        }
      });
    });

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        user[field] = body[field];
      }
    });

    users[userIndex] = user;

    return HttpResponse.json(user);
  }),

  http.delete("/api/posts/:id", ({ params }) => {
    const { id } = params;

    const postIndex = posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      return new HttpResponse(JSON.stringify({ error: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    posts.splice(postIndex, 1);

    return new HttpResponse({ status: 204 });
  }),

  http.patch("/api/posts/:id", async ({ request, params }) => {
    const { id } = params;
    const body = (await request.json()) as CommentOrLike;

    if (!body) {
      return new HttpResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const postIndex = posts.findIndex((p) => p.id === id);

    if (postIndex === -1) {
      return new HttpResponse(JSON.stringify({ error: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const post = posts[postIndex];
    const { action, username, comment, avatar } = body;

    if (!action) {
      return new HttpResponse(JSON.stringify({ error: "Action is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (action === "like") {
      if (!post.likes) post.likes = [];
      if (!post.likes.includes(username)) {
        post.likes.push(username);
      } else {
        post.likes = post.likes.filter((u) => u !== username);
      }
    } else if (action === "comment") {
      if (!post.comments) post.comments = [];
      if (!comment) {
        return new HttpResponse(
          JSON.stringify({ error: "Comment text is required" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      const newComment: Comment = {
        username,
        comment,
        avatar: avatar ?? "",
        createdAt: new Date().toISOString(),
      };
      post.comments.push(newComment);
    } else {
      return new HttpResponse(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    posts[postIndex] = post;

    return new HttpResponse(JSON.stringify(post), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),

  // auth
  http.post("/api/login", async ({ request }) => {
    const { username, password } = (await request.json()) as LoginFormData;

    const user = users.find(
      (u) => u.username === username && u.password === password,
    );
    if (!user) {
      return new HttpResponse(
        JSON.stringify({ error: "Invalid credentials" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    const { password: _, ...safeUser } = user;

    return new HttpResponse(JSON.stringify(safeUser), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),

  http.post("/api/signup", async ({ request }) => {
    const newUser = (await request.json()) as SignupFormDataMandatory;

    if (!newUser) {
      return new HttpResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const exists = users.some(
      (u) => u.username === newUser.username || u.email === newUser.email,
    );
    if (exists) {
      return new HttpResponse(
        JSON.stringify({ error: "User already exists" }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const completeUser: User = {
      ...newUser,
      id: uuid(),
      createdAt: new Date().toISOString(),
      followers: [],
      following: [],
      posts: [],
      avatar: "",
      bio: newUser.bio ?? "",
    };

    users.push(completeUser);

    const { password: _, ...safeUser } = newUser;

    return new HttpResponse(JSON.stringify(safeUser), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
];

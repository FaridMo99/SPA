//import avatar type here and change profile picture type after colon to avatar and update everything

import type z from "zod";
import type {
  changePasswordSchema,
  forgotPasswordSchema,
} from "../schemas/schemas";

export type Avatar = string | null;

export type ContentType = "GIF" | "TEXT";

export type User = {
  username: string;
  profilePicture: string | null;
  bio: string | null;
  _count: {
    followers: number;
    following: number;
  };
};

export type Post = {
  user: {
    username: string;
    profilePicture: Avatar
  };
  id: string;
  createdAt: Date;
  content: string;
  type: "TEXT" | "IMAGE";
  //to check if user already liked, if true then .length > 0
  likedBy: {
    id: string;
  }[];
  _count: {
    likedBy: number;
    comments: number;
  };
};

export type Comment = {
  id: string;
  user: {
    username: string;
    profilePicture: Avatar
  };
  createdAt: Date;
  content: string;
  type: ContentType;
  //to check if user already liked, if true then .length > 0
  likedBy: {
    id: string;
  }[];
  _count: {
    likedBy: number;
  };
};

export type FollowerList = {
  followers: {
    follower: {
      username: string;
      profilePicture: Avatar
    };
  }[];
};

export type FollowingList = {
  following: {
    following: {
      username: string;
      profilePicture: Avatar
    };
  }[];
};

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export type Posts = Post[] | [];

export type ChatMessagePreview =
  | {
      createdAt: Date;
      content: null;
      deleted: true;
      read: boolean;
      type: ContentType;
      sender: {
        username: string;
      };
    }
  | {
      createdAt: Date;
      content: string;
      deleted: false;
      read: boolean;
      type: ContentType;
      sender: {
        username: string;
      };
    };

type ChatUser = {
  username: string;
  profilePicture: string;
};

export type ChatPreview = {
  id: string;
  userOne: ChatUser;
  userTwo: ChatUser;
  messages: ChatMessagePreview[];
  //unread messages count
  _count: {
    messages: number;
  };
};

export type ChatList = ChatPreview[] | [];

export type Message =
  | {
      id: string;
      createdAt: Date;
      deleted: true;
      content: null;
      read: boolean;
      type: ContentType;
      sender: {
        username: string;
        profilePicture: string;
      };
    }
  | {
      id: string;
      createdAt: Date;
      deleted: false;
      content: string;
      read: boolean;
      type: ContentType;
      sender: {
        username: string;
        profilePicture: string;
      };
    };



export type Chat = {
  id: string;
  messages: Message[] | [];
  alreadyExists?: boolean;
};
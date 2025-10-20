//import avatar type here and change profile picture type after colon to avatar and update everything

import type z from "zod";
import type {
  changePasswordSchema,
  forgotPasswordSchema,
} from "../schemas/schemas";

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
    profilePicture: string | null;
  };
  id: string;
  createdAt: Date;
  content: string;
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
    profilePicture: string | null;
  };
  createdAt: Date;
  content: string;
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
      profilePicture: string | null;
    };
  }[];
};

export type FollowingList = {
  following: {
    following: {
      username: string;
      profilePicture: string | null;
    };
  }[];
};

//make this also for other schemas
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export type Posts = Post[] | [];

export type ChatMessagePreview = {
  createdAt: Date;
  content: string;
  read: boolean;
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
};

export type ChatList = ChatPreview[] | [];

export type Message =
  | {
      createdAt: Date;
      deleted: true;
      content: null;
      read: boolean;
      sender: {
        username: string;
        profilePicture: string;
      };
    }
  | {
      createdAt: Date;
      deleted: false;
      content: string;
      read: boolean;
      sender: {
        username: string;
        profilePicture: string;
      };
    };

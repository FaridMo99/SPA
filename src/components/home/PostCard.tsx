import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import passedTime from "../../utils/passedTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deletePost from "../../utils/deletePost";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Button from "../auth/Button";
import PostCardIcons from "./PostCardIcons";
import { dislikePost, likePost } from "../../utils/interactWithPost";
import useAuth from "../../stores/authStore";
import UserImage from "../UserImage";
import type { Post, User } from "../../types/types";
import toast from "react-hot-toast";

type PostCardProps = {
  postData: Post;
  editable?: boolean;
};

function PostCard({ postData, editable = false }: PostCardProps) {
  const queryClient = useQueryClient();
  const user = useAuth((state) => state.user) as User;

  //these states are used for optimistic ui updates, otherwise just invalidating query would be enough to rerender after query
  const [like, setLike] = useState<boolean>(postData.likedBy.length > 0);
  const [likeCount, setLikeCount] = useState<number>(postData._count.likedBy);

  const { mutate: toggleLike, isPending: toggleIsPending } = useMutation({
    mutationKey: ["like post", postData.id],
    mutationFn: async () => {
      if (!like) {
        return await likePost(postData.id);
      }

      return await dislikePost(postData.id);
    },
    onMutate: () => {
      setLike((prev) => {
        const newLike = !prev;
        setLikeCount((count) => (newLike ? count + 1 : count - 1));
        return newLike;
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get fyp posts"] });
      queryClient.invalidateQueries({
        queryKey: ["get User posts", user.username],
      });
    },
    onError: () => {
      setLike((prev) => {
        const newLike = !prev;
        setLikeCount((count) => (newLike ? count + 1 : count - 1));
        return newLike;
      });
      toast.error("Something went wrong...");
    },
  });

  const { mutate: deletePostFn, isPending: deletePostIsPending } = useMutation({
    mutationFn: () => deletePost(postData.id),
    mutationKey: ["delete post", postData.id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get fyp posts"] });
      queryClient.invalidateQueries({
        queryKey: ["get User posts", user.username],
      });
      toast.success("Deleted Post successfully!");
    },
    onError: () => {
      toast.error("Something went wrong...");
    },
  });

  return (
    <section
      aria-label={`Post from ${postData.user.username}`}
      className="w-4/5 relative bg-gray-50 dark:bg-dark-gray dark:outline-dark-green outline-2 outline-gray-300 mb-8 rounded-2xl flex flex-col items-center font-bold"
    >
      <div className="w-full h-1/4 flex items-center justify-between">
        <div className="w-1/2 flex items-center h-full">
          <UserImage img={postData.user.profilePicture} />
          <Link
            className="hover:text-black/60 absolute left-20"
            to={`/${postData.user.username}`}
          >
            <h1>@{postData.user.username}</h1>
          </Link>
        </div>
        <p className="text-gray-300 mr-2">{passedTime(postData.createdAt)}</p>
      </div>
      <p className="h-1/2 w-4/5">{postData.content}</p>
      <div className="h-1/4 w-full flex items-center justify-evenly">
        <PostCardIcons
          Icon={Heart}
          ariaLabel="Add or Remove Like"
          iconClassName={`w-10 rounded-full text-gray-400 p-1 hover:bg-red-300 hover:text-red-500 ${
            like ? "fill-red-500 text-red-500" : ""
          }`}
          pClassName={like ? "text-red-500" : "text-gray-400"}
          text={likeCount}
          onClick={toggleLike}
          disabled={toggleIsPending}
        />

        <Link to={`/comments/${postData.id}`}>
          <PostCardIcons
            Icon={MessageCircle}
            ariaLabel="View Comments"
            iconClassName="w-10 rounded-full text-gray-400 p-1 hover:bg-blue-300 hover:text-blue-500"
            pClassName="text-gray-400"
            text={postData._count.comments}
          />
        </Link>
      </div>
      {editable && (
        <Button
          clickHandler={deletePostFn}
          aria-label="Delete Post"
          disabled={deletePostIsPending}
          styles="absolute -bottom-4 -right-3"
          text={<Trash2 className="text-red-500" />}
        />
      )}
    </section>
  );
}

export default PostCard;

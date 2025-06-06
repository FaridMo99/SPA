import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import passedTime from "../../utils/passedTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deletePost from "../../utils/deletePost";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Button from "../auth/Button";
import PostCardIcons from "./PostCardIcons";
import { like as likePost } from "../../utils/interactWithPost";
import useAuth from "../../stores/authStore";

function PostCard({ postData, editable = false }) {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();

  const [like, setLike] = useState(
    postData.likes.includes(currentUser?.username),
  );

  const mutationLike = useMutation({
    mutationFn: () => likePost(postData.id, currentUser.username),
    onSuccess: () => {
      queryClient.invalidateQueries(["get posts"]);
      if (postData.username === currentUser.username) {
        queryClient.invalidateQueries(["get User posts", postData.username]);
      }
    },
  });

  const toggleLike = () => {
    setLike((prev) => !prev);
    mutationLike.mutate();
  };

  return (
    <section
      aria-label={`Post from ${postData.username}`}
      className="w-4/5 relative bg-gray-50 outline-2 outline-gray-300 mb-8 rounded-2xl flex flex-col items-center font-bold"
    >
      <div className="w-full h-1/4 flex items-center justify-between">
        <div className="w-1/2 flex items-center h-full">
          <img
            src={postData.avatar}
            alt={`${postData.username} Avatar`}
            className="mr-4 w-10 h-10 rounded-full"
          />
          <Link className="hover:text-black/60" to={`/${postData.username}`}>
            <h1>{postData.username}</h1>
          </Link>
        </div>
        <p className="text-gray-300 mr-2">{passedTime(postData.createdAt)}</p>
      </div>
      <p className="h-1/2 w-4/5">{postData.post}</p>
      <div className="h-1/4 w-full flex items-center justify-evenly">
        <PostCardIcons
          Icon={Heart}
          ariaLabel="Add or Remove Like"
          iconClassName={`w-10 rounded-full text-gray-400 p-1 hover:bg-red-300 hover:text-red-500 ${
            like ? "fill-red-500 text-red-500" : ""
          }`}
          pClassName={like ? "text-red-500" : "text-gray-400"}
          text={postData.likes.length}
          onClick={toggleLike}
        />

        <Link to={`/comments/${postData.id}`}>
          <PostCardIcons
            Icon={MessageCircle}
            ariaLabel="View Comments"
            iconClassName="w-10 rounded-full text-gray-400 p-1 hover:bg-blue-300 hover:text-blue-500"
            pClassName="text-gray-400"
            text={postData.comments.length}
          />
        </Link>
      </div>
      {editable && (
        <Button
          clickHandler={() => {
            deletePost(postData.id);
          }}
          aria-label="Delete Post"
          styles="absolute -bottom-4 -right-3"
          text={<Trash2 className="text-red-500" />}
        />
      )}
    </section>
  );
}

export default PostCard;

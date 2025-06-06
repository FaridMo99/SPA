import { useState } from "react";
import { Heart, ChartNoAxesColumn, MessageCircle } from "lucide-react";
import passedTime from "../../utils/passedTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deletePost from "../../utils/deletePost";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Button from "../auth/Button";
import PostCardIcons from "./PostCardIcons";

function PostCard({ postData, editable = false }) {
  const [like, setLike] = useState(false);
  const [hovered, setHovered] = useState(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deletePost(postData.id),
    mutationKey: ["delete post", postData.id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get posts"] });
      queryClient.invalidateQueries({
        queryKey: ["get User posts", postData.username],
      });
    },
  });

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
          Icon={ChartNoAxesColumn}
          ariaLabel="View Impressions"
          setHovered={setHovered}
          hoverKey="chart"
          iconClassName={`w-10 text-gray-400 rounded-full p-1 ${
            hovered === "chart" ? "text-green-500 bg-green-300" : ""
          }`}
          pClassName={hovered === "chart" ? "text-green-500" : "text-gray-400"}
          text={postData.impressions}
        />

        <PostCardIcons
          Icon={Heart}
          ariaLabel="Add or Remove Like"
          setHovered={setHovered}
          hoverKey="heart"
          iconClassName={`w-10 rounded-full text-gray-400 p-1 ${
            hovered === "heart" ? "text-red-500 bg-red-300" : ""
          } ${like ? "fill-red-500 text-red-500" : ""}`}
          pClassName={hovered === "heart" ? "text-red-500" : "text-gray-400"}
          text={postData.likes}
          onClick={() => setLike((prev) => !prev)}
        />

        <PostCardIcons
          Icon={MessageCircle}
          ariaLabel="View Comments"
          setHovered={setHovered}
          hoverKey="message"
          iconClassName={`w-10 rounded-full text-gray-400 p-1 ${
            hovered === "message" ? "blueBug bg-blue-300" : ""
          }`}
          pClassName={hovered === "message" ? "text-blue-500" : "text-gray-400"}
          text={postData.comments}
        />
      </div>
      {editable && (
        <Button
          clickHandler={() => {
            mutation.mutate();
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

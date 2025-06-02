import React, { useState } from "react";
import { Heart, ChartNoAxesColumn, MessageCircle } from "lucide-react";
import passedTime from "../../utils/passedTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deletePost from "../../utils/deletePost";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Button from "../auth/Button";

function PostCard({ postData, editable = false }) {
  const [like, setLike] = useState(false);
  const [hovered, setHovered] = useState(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deletePost(postData?.id),
    mutationKey: ["delete post", postData.id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get posts"] });
    },
  });

  return (
    <section
      aria-label={`Post from ${postData?.username}`}
      className="w-4/5 relative bg-gray-50 outline-2 outline-gray-300 mb-8 rounded-2xl flex flex-col items-center font-bold"
    >
      <div className="w-full h-1/4 flex items-center justify-between">
        <div className="w-1/2 flex items-center h-full">
          <img
            src={postData?.avatar}
            alt={`${postData?.username} Avatar`}
            className="mr-4 w-10 h-10 rounded-full"
          />
          <Link className="hover:text-black/60" to={`/${postData?.username}`}>
            <h1>{postData?.username}</h1>
          </Link>
        </div>
        <p className="text-gray-300 mr-2">{passedTime(postData?.createdAt)}</p>
      </div>
      <p className="h-1/2 w-4/5">{postData?.post}</p>
      <div className="h-1/4 w-full flex items-center justify-evenly">
        <div
          className="flex items-center"
          onMouseEnter={() => setHovered("chart")}
          onMouseLeave={() => setHovered(null)}
        >
          <ChartNoAxesColumn
            size={null}
            className={`w-10 text-gray-400 rounded-full p-1 ${
              hovered === "chart" ? "text-green-500 bg-green-300" : ""
            }`}
          />
          <p
            className={`${hovered === "chart" ? "text-green-500" : "text-gray-400"}`}
          >
            {postData?.impressions}
          </p>
        </div>

        <button
          type="button"
          aria-label="Add or Remove Like"
          className="flex items-center"
          onMouseEnter={() => setHovered("heart")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => {
            setLike((pre) => !pre);
          }}
        >
          <Heart
            size={null}
            className={`w-10 rounded-full text-gray-400 p-1 ${
              hovered === "heart" ? "text-red-500 bg-red-300" : ""
            }
            ${like ? "fill-red-500 text-red-500" : ""}
            `}
          />
          <p
            className={`${hovered === "heart" ? "text-red-500" : "text-gray-400"}`}
          >
            {postData?.likes}
          </p>
        </button>

        <button
          type="button"
          aria-label="View Comments"
          className="flex items-center"
          onMouseEnter={() => setHovered("message")}
          onMouseLeave={() => setHovered(null)}
        >
          <MessageCircle
            size={null}
            className={`w-10 rounded-full text-gray-400 p-1 ${
              hovered === "message" ? "blueBug bg-blue-300" : ""
            }`}
          />
          <p
            className={`${hovered === "message" ? " text-blue-500 " : "text-gray-400"}`}
          >
            {postData?.comments}
          </p>
        </button>
      </div>
      {editable && (
        <Button
          clickHandler={() => {
            mutation.mutate();
          }}
          aria-label="Delete Post"
          styles="absolute -bottom-4 -right-3"
          text={<Trash2 className="text-gray-400" />}
        />
      )}
    </section>
  );
}

export default PostCard;

//add like logic so it posts new number to update like count
// add usestate logic to change state through knowing from database and not setting it in general to false
//add like animation

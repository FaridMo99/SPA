import React, { useState } from "react";
import { Heart, ChartNoAxesColumn, MessageCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

function PostCard({ postData }) {
  const [like, setLike] = useState(false);
  const [hovered, setHovered] = useState(null);

  return (
    <section
      aria-label={`Post from ${postData?.username}`}
      className="w-4/5 h-[20vh] bg-gray-50 outline-2 outline-gray-300 mb-8 rounded-2xl flex flex-col items-center font-bold"
    >
      <div className="w-full h-1/4 flex items-center justify-around">
        <div className="w-1/2 flex items-center h-full">
          <img
            src={postData?.avatar}
            alt={`${postData?.username} Avatar`}
            className="mr-4"
          />
          <h1>{postData?.username}wefe</h1>
        </div>
        <p className="text-gray-300">{postData?.createdAt}fwe</p>
      </div>
      <p className="h-1/2 w-4/5">
        nknlefnwnef ewkj jewkfwef jwe fw efle jew ljnwgnf j kgkgr öqr3g gvqj
        örkknjeknrf kew
      </p>
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

        <div
          className="flex items-center"
          onMouseEnter={() => setHovered("heart")}
          onMouseLeave={() => setHovered(null)}
        >
          <Heart
            size={null}
            onClick={() => {
              setLike((pre) => !pre);
            }}
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
        </div>

        <div
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
        </div>
      </div>
    </section>
  );
}

export default PostCard;

//add like logic so it posts new number to update like count
// add usestate logic to change state through knowing from database and not setting it in general to false
// add css for if text too long
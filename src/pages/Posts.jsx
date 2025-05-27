import React from "react";
import PostCard from "../components/home/PostCard";
import { Loader2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";

function Posts() {
  const [data, isLoading] = useOutletContext();

  return (
    <section
      aria-label="Your Posts"
      className="w-full flex flex-col items-center my-10"
    >
      {isLoading ? <CustomLoader /> : <PostCard postData={data[0]} />}
    </section>
  );
}

export default Posts;

//add crud operations and looping all posts

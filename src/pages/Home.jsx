import React from "react";
import CreatePostField from "../components/home/CreatePostField";
import PostCard from "../components/home/PostCard";

function Home() {
  return (
    <>
      <CreatePostField />
      <div className="w-full flex flex-col items-center">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </>
  );
}

export default Home;

//add fetch all users and posts and populate on mount of this component

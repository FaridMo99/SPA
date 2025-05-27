import React from "react";
import CreatePostField from "../components/home/CreatePostField";
import PostCard from "../components/home/PostCard";
import getPosts from "../utils/getPosts";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "../components/CustomLoader";

function Home() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: () => getPosts(),
  });

  if (isError)
    return (
      <p className="text-red-500 font-bold text-2xl self-center">
        {error.message}
      </p>
    );

  return (
    <>
      <CreatePostField />
      <div className="w-full flex flex-col items-center">
        {isLoading && <CustomLoader />}
        {!isLoading &&
          data?.map((post) => <PostCard key={post.username} postData={post} />)}
      </div>
    </>
  );
}

export default Home;

//add fetch all users and posts and populate on mount of this component
//add infinite scrolling, so basically only fetch 10 posts
//and on scroll 10 more etc.

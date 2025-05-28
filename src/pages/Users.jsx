import React from "react";
import { useParams } from "react-router-dom";
import ImageSection from "../components/profile/ImageSection";
import PostCard from "../components/home/PostCard";
import { useQuery } from "@tanstack/react-query";
import getPosts from "../utils/getPosts";
import UsersLoadingSkeleton from "../components/UsersLoadingSkeleton"

function Users() {
  const { username } = useParams();
  const queryString = `?username=${username}`;
  const { data, isLoading } = useQuery({
    queryKey: [username],
    queryFn: () => getPosts(queryString),
    retry:false
  });

  if(isLoading) return <UsersLoadingSkeleton/>

  return (
    <main className="flex flex-col">
      <ImageSection username={username}/>
      <div className="w-full flex flex-col items-center mt-10">
        <PostCard postData={data[0]} />
        <PostCard postData={data[0]} />
        <PostCard postData={data[0]} />
      </div>
    </main>
  );
}

export default Users;


//go back button on errorpage dont send back but sends home

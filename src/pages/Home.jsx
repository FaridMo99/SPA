import { useState } from "react";
import CreatePostField from "../components/home/CreatePostField";
import PostCard from "../components/home/PostCard";
import getPosts from "../utils/getPosts";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "../components/CustomLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import SortDropdown from "../components/home/SortDropdown";

function Home() {
  const [sortValue, setSortValue] = useState("desc");

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["getAllPosts", sortValue],
    queryFn: () => getPosts(`?sortBy=createdAt&order=${sortValue}`),
    refetchOnMount: true,
    staleTime: 0,
  });

  const sortedPosts = data
    ? [...data].sort((a, b) => {
        if (sortValue === "desc") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
      })
    : [];

  return (
    <>
      <CreatePostField />
      <div className="absolute right-2 top-[36vh]">
        <SortDropdown value={sortValue} setSortValue={setSortValue} />
      </div>
      <div className="w-full flex flex-col items-center">
        {isLoading && <CustomLoader styles="mt-[42vh]" />}
        {!isLoading &&
          sortedPosts?.map((post) => (
            <PostCard key={post.username} postData={post} />
          ))}
        {isError && (
          <p className="text-red-500 font-bold text-2xl">{error.message}</p>
        )}
      </div>
    </>
  );
}

export default Home;

//api sorting after creating a post is buggy so i have to sort manually here client-side

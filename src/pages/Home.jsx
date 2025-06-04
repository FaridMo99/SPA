import { useState, useEffect, useRef } from "react";
import CreatePostField from "../components/home/CreatePostField";
import PostCard from "../components/home/PostCard";
import getPosts from "../utils/getPosts";
import { useInfiniteQuery } from "@tanstack/react-query";
import CustomLoader from "../components/CustomLoader";
import SortDropdown from "../components/home/SortDropdown";

function Home() {
  const [sortValue, setSortValue] = useState("desc");

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getAllPosts"],
    queryFn: ({ pageParam = 1 }) => getPosts(`?page=${pageParam}&limit=10`),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < 10 ? undefined : allPages.length + 1,
    refetchOnMount: true,
    staleTime: 0,
  });

  const loadMoreRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const allPosts = data?.pages.flat() || [];
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortValue === "desc" ? dateB - dateA : dateA - dateB;
  });

  return (
    <>
      <CreatePostField />
      <div className="absolute right-2 top-[36vh]">
        <SortDropdown value={sortValue} setSortValue={setSortValue} />
      </div>
      <div className="w-full flex flex-col items-center">
        {status === "loading" && <CustomLoader styles="mt-[42vh]" />}

        {sortedPosts.map((post) => (
          <PostCard key={post.username} postData={post} />
        ))}

        {isFetchingNextPage && <CustomLoader styles="my-4" />}
        <div ref={loadMoreRef} className="h-10" />

        {error && (
          <p className="text-red-500 font-bold text-2xl">{error.message}</p>
        )}
      </div>
    </>
  );
}

export default Home;

//api sorting after creating a post is buggy so i have to sort manually here client-side

import { useState, useEffect, useRef } from "react";
import CreatePostField from "../components/home/CreatePostField";
import PostCard from "../components/home/PostCard";
import { getPosts } from "../utils/getPosts";
import { useInfiniteQuery } from "@tanstack/react-query";
import CustomLoader from "../components/CustomLoader";
import SortDropdown from "../components/home/SortDropdown";
import type { Post } from "../mocks/data";

function Home() {
  const [sortValue, setSortValue] = useState<string>("desc");

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Post[]>({
    queryKey: ["getAllPosts", sortValue],
    queryFn: ({ pageParam = 1 }) =>
      getPosts(`?page=${pageParam}&limit=10&sort=${sortValue}`),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < 10 ? undefined : allPages.length + 1,
    refetchOnMount: true,
    initialPageParam: 1,
    staleTime: 0,
  });

  const loadMoreRef = useRef<null | HTMLDivElement>(null);

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

  return (
    <>
      <CreatePostField />
      <div className="absolute right-2 top-[36vh]">
        <SortDropdown setSortValue={setSortValue} />
      </div>
      <div className="w-full flex flex-col items-center">
        {isLoading && <CustomLoader styles="mt-[42vh]" />}
        {allPosts.length === 0 && (
          <p className="text-green-300 font-bold">No Posts found...</p>
        )}
        {allPosts.map((post) => (
          <PostCard key={post.id} postData={post} />
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

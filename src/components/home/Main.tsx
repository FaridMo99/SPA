import ErrorText from "../ui/ErrorText";
import NotFound from "../ui/NotFound";
import CustomLoader from "../ui/CustomLoader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "./PostCard";
import type { Posts } from "../../types/types";

type MainProps = {
  fetchFunction: (page: number) => Promise<Posts>;
};
function Main({ fetchFunction }: MainProps) {
  const { ref: loadMoreRef, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["get fyp posts"],
    queryFn: ({ pageParam = 1 }) => fetchFunction(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const posts = data?.pages.flat() || [];

  return (
    <section className="w-full flex flex-col items-center mt-16">
      {isLoading && <CustomLoader size={100} />}
      {!isError && posts.length === 0 && !isLoading && (
        <NotFound text="No Posts found..." />
      )}
      {posts.map((post) => (
        <PostCard key={post.id} postData={post} />
      ))}
      {isFetchingNextPage && <CustomLoader styles="my-4" />}
      <div ref={loadMoreRef} className="h-10" />
      {isError && <ErrorText text={error.message} />}
    </section>
  );
}

export default Main;

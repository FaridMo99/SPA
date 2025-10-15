import CreatePostField from "../components/home/CreatePostField";
import PostCard from "../components/home/PostCard";
import { getPostsForFyp } from "../utils/getPosts";
import CustomLoader from "../components/ui/CustomLoader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import NotFound from "../components/ui/NotFound";
import ErrorText from "../components/ui/ErrorText";

//features
//on mobile pulling from upwards reloads, like twitter basically
//two sections, fyp and follows(maybe extra layout for that)

function Home() {
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
    queryFn: ({ pageParam = 1 }) => getPostsForFyp(pageParam),
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
    <>
      <CreatePostField />
      <div className="w-full flex flex-col items-center">
        {isLoading && <CustomLoader styles="mt-[42vh]" />}
        {!isError && posts.length === 0 && !isLoading && (
          <NotFound text="No Posts found..." />
        )}
        {posts.map((post) => (
          <PostCard key={post.id} postData={post} />
        ))}
        {isFetchingNextPage && <CustomLoader styles="my-4" />}
        <div ref={loadMoreRef} className="h-10" />
        {isError && <ErrorText text={error.message} />}
      </div>
    </>
  );
}

export default Home;

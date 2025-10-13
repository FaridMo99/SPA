import CreatePostField from "../components/home/CreatePostField";
import PostCard from "../components/home/PostCard";
import { getPostsForFyp } from "../utils/getPosts";
import CustomLoader from "../components/CustomLoader";

function Home() {
  return (
    <>
      <CreatePostField />
      <div className="absolute right-2 top-[36vh]"></div>
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
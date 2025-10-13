import PostCard from "../components/home/PostCard";
import useAuth from "../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { getAllPostsByUsername } from "../utils/getPosts";
import CustomLoader from "../components/CustomLoader";
import type { User } from "../types/types";

function Posts() {
  const user = useAuth((state) => state.user) as User;
  const { data: posts, isLoading } = useQuery({
    queryKey: ["get User posts", user.username],
    queryFn: () => getAllPostsByUsername(user.username),
  });

  if (isLoading) return <CustomLoader />;

  return (
    <section
      aria-label="Your Posts"
      className="w-full flex flex-col items-center my-10"
    >
      {!posts && (
        <p className="font-bold text-green-300">Something went wrong</p>
      )}
      {posts?.length === 0 && (
        <p className="font-bold text-green-300">No Posts found...</p>
      )}
      {posts && posts.length > 0 && (
        <>
          {posts.map((post) => (
            <PostCard editable key={post.id} postData={post} />
          ))}
        </>
      )}
    </section>
  );
}

export default Posts;

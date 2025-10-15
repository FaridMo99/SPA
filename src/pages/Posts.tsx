import PostCard from "../components/home/PostCard";
import useAuth from "../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { getAllPostsByUsername } from "../utils/getPosts";
import CustomLoader from "../components/ui/CustomLoader";
import type { User } from "../types/types";
import ErrorText from "../components/ui/ErrorText";
import NotFound from "../components/ui/NotFound";

function Posts() {
  const user = useAuth((state) => state.user) as User;
  const { data: posts, isLoading } = useQuery({
    queryKey: ["get User posts", user.username],
    queryFn: () => getAllPostsByUsername(user.username),
  });

  if (isLoading) return <CustomLoader size={80} styles="mt-20" />;

  return (
    <section
      aria-label="Your Posts"
      className="w-full flex flex-col items-center my-10"
    >
      {!posts && <ErrorText text="Something went wrong..." />}
      {posts?.length === 0 && <NotFound text="No Posts found" />}
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

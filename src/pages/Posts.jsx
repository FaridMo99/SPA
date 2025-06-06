import PostCard from "../components/home/PostCard";
import useAuth from "../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import getPosts from "../utils/getPosts";
import CustomLoader from "../components/CustomLoader";

function Posts() {
  const user = useAuth((state) => state.user);
  const { data, isLoading } = useQuery({
    queryKey: ["get User posts", user.username],
    queryFn: () => getPosts(`/${user.username}`),
  });

  if (isLoading) return <CustomLoader />;

  return (
    <section
      aria-label="Your Posts"
      className="w-full flex flex-col items-center my-10"
    >
      {data.length === 0 && (
        <p className="font-bold text-green-300">No Posts found...</p>
      )}
      {data.length !== 0 && (
        <>
          {data.map((element) => (
            <PostCard editable key={element.createdAt} postData={element} />
          ))}
        </>
      )}
    </section>
  );
}

export default Posts;

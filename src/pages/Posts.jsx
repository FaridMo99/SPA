import PostCard from "../components/home/PostCard";
import useAuth from "../stores/authStore";

function Posts() {
  const user = useAuth((state) => state.user);

  return (
    <section
      aria-label="Your Posts"
      className="w-full flex flex-col items-center my-10"
    >
      {user.posts.length === 0 && (
        <p className="font-bold text-green-300">No Posts found...</p>
      )}
      {user.posts.length !== 0 && (
        <>
          {user.posts.map((element) => (
            <PostCard editable key={element.createdAt} postData={element} />
          ))}
        </>
      )}
    </section>
  );
}

export default Posts;

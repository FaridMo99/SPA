import PostCard from "../components/home/PostCard";
import { useOutletContext } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";

function Posts() {
  const [postData, postIsLoading] = useOutletContext();

  return (
    <section
      aria-label="Your Posts"
      className="w-full flex flex-col items-center my-10"
    >
      {postIsLoading && <CustomLoader />}
      {!postIsLoading && postData.length === 0 && (
        <p className="font-bold text-green-300">No Posts found...</p>
      )}
      {!postIsLoading && postData.length !== 0 && (
        <>
          {postData.map((element) => (
            <PostCard editable key={element.createdAt} postData={element} />
          ))}
        </>
      )}
    </section>
  );
}

export default Posts;

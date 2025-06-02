import React from "react";
import PostCard from "../components/home/PostCard";
import { Loader2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";

function Posts() {
  const [data, isLoading] = useOutletContext();

  console.log(data[0].posts);
  return (
    <section
      aria-label="Your Posts"
      className="w-full flex flex-col items-center my-10"
    >
      {isLoading && <CustomLoader />}
      {!isLoading && data[0].posts.length === 0 && (
        <p className="font-bold text-green-300">No Posts found...</p>
      )}
      {!isLoading && data[0].posts.length !== 0 && (
        <>
          {data.map((element) => (
            <PostCard key={element[0]} postData={element[0]} />
          ))}
        </>
      )}
    </section>
  );
}

export default Posts;

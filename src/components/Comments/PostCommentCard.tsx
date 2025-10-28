import type { Post } from "../../types/types";
import passedTime from "../../utils/passedTime";
import { Link } from "react-router-dom";
import UserImage from "../ui/UserImage";

function PostCommentCard({ post }: { post: Post }) {
  return (
    <section
      aria-label={`Post from ${post.user.username}`}
      className="w-[95%] p-2 relative bg-gray-50 dark:bg-dark-gray dark:outline-dark-green outline-2 outline-gray-300 mb-8 rounded-2xl flex flex-col items-center font-bold"
    >
      <div className="w-full h-1/4 flex items-center justify-between">
        <div className="w-1/2 flex items-center h-full">
          <UserImage
            styles="flex-shrink-0 w-10 h-10 md:w-16 md:h-16"
            img={post.user.profilePicture}
          />
          <Link
            className="hover:text-black/60 ml-2"
            to={`/${post.user.username}`}
          >
            <h1>@{post.user.username}</h1>
          </Link>
        </div>
        <p className="text-gray-300 mr-2">{passedTime(post.createdAt)}</p>
      </div>
      {post.type === "IMAGE" ? (
        <img alt={post.content} className="p-4" src={post.content} />
      ) : (
        <p className="h-1/2 w-4/5 break-all">{post.content}</p>
      )}
    </section>
  );
}

export default PostCommentCard;

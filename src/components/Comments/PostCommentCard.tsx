import { User } from "lucide-react";
import type { Post } from "../../types/types";
import passedTime from "../../utils/passedTime";
import { Link } from "react-router-dom";

function PostCommentCard({ post }: { post: Post }) {
  return (
    <section
      aria-label={`Post from ${post.user.username}`}
      className="w-[95%] relative bg-gray-50 dark:bg-dark-gray dark:outline-dark-green outline-2 outline-gray-300 mb-8 rounded-2xl flex flex-col items-center font-bold"
    >
      <div className="w-full h-1/4 flex items-center justify-between">
        <div className="w-1/2 flex items-center h-full">
          {post.user.profilePicture ? (
            <img
              src={post.user.profilePicture}
              alt={`${post.user.username} Avatar`}
              className="mr-4 w-10 h-10 rounded-full"
            />
          ) : (
            <User className="text-green-300 dark:text-dark-green mr-4 w-10 h-10 rounded-full" />
          )}
          <Link className="hover:text-black/60" to={`/${post.user.username}`}>
            <h1>{post.user.username}</h1>
          </Link>
        </div>
        <p className="text-gray-300 mr-2">{passedTime(post.createdAt)}</p>
      </div>
      {post.type === "IMAGE" ? (
        <img src={post.content} />
      ) : (
        <p className="h-1/2 w-4/5">{post.content}</p>
      )}
    </section>
  );
}

export default PostCommentCard;

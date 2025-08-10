import passedTime from "../../utils/passedTime";
import { Link } from "react-router-dom";
import type { Post } from "../../mocks/data";

function PostCommentCard({ comment }: { comment: Post }) {
  return (
    <section
      aria-label={`Post from ${comment.username}`}
      className="w-[95%] relative bg-gray-50 dark:bg-dark-gray dark:outline-dark-green outline-2 outline-gray-300 mb-8 rounded-2xl flex flex-col items-center font-bold"
    >
      <div className="w-full h-1/4 flex items-center justify-between">
        <div className="w-1/2 flex items-center h-full">
          <img
            src={comment.avatar}
            alt={`${comment.username} Avatar`}
            className="mr-4 w-10 h-10 rounded-full"
          />
          <Link className="hover:text-black/60" to={`/${comment.username}`}>
            <h1>{comment.username}</h1>
          </Link>
        </div>
        <p className="text-gray-300 mr-2">{passedTime(comment.createdAt)}</p>
      </div>
      <p className="h-1/2 w-4/5">{comment.post}</p>
    </section>
  );
}

export default PostCommentCard;

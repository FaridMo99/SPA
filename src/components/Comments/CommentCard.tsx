import UserImage from "../UserImage";
import passedTime from "../../utils/passedTime";
import { Link } from "react-router-dom";
import { type Comment } from "../../types/types";

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="w-[90%] bg-gray-50 border dark:bg-dark-gray dark:border-dark-green border-gray-300 flex items-start relative rounded-sm mb-2 font-bold p-2">
      <UserImage styles=" mt-1" img={comment.user.profilePicture} />

      <div className=" w-9/10 relative">
        <Link to={`/${comment.user.username}`}>
          <p className="text-gray-500 font-bold">@{comment.user.username}</p>
        </Link>
        <p className="text-gray-700 dark:text-white ml-4 font-medium whitespace-normal break-words">
          {comment.content}
        </p>
        <p className="text-gray-300 absolute top-0 right-0 text-xs">
          {passedTime(comment.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default CommentCard;

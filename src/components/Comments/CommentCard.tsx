import UserImage from "../UserImage";
import passedTime from "../../utils/passedTime";
import { Link } from "react-router-dom";
import type { Comment } from "../../mocks/data";

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="w-[90%] bg-gray-50 border border-gray-300 flex items-start relative rounded-sm mb-2 font-bold p-2">
      <UserImage styles=" mt-1" img={comment.avatar} />

      <div className=" w-9/10 relative">
        <Link to={`/${comment.username}`}>
          <p className="text-gray-500 font-bold">@{comment.username}</p>
        </Link>
        <p className="text-gray-700 ml-4 font-medium whitespace-normal break-words">
          {comment.comment}
        </p>
        <p className="text-gray-300 absolute top-0 right-0 text-xs">
          {passedTime(comment.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default CommentCard;

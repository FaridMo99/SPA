import CommentCard from "./CommentCard";
import { type Comment } from "../../types/types";
import NotFound from "../ui/NotFound";

function CommentSection({ comments }: { comments: Comment[] | [] }) {
  return (
    <section className="w-full mb-16">
      <p className="text-green-300 dark:text-dark-green ml-3 font-bold text-xl -mt-3 mb-4">
        Comments:
      </p>
      <div className="flex flex-col items-center">
        {comments.length === 0 || !comments ? (
          <NotFound text="No Comments found ..." />
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </section>
  );
}

export default CommentSection;

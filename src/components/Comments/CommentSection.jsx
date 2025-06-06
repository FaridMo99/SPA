import CommentCard from "./CommentCard";

function CommentSection({ comments }) {
  return (
    <section className="w-full">
      <p className="text-green-300 font-bold text-xl -mt-3 mb-4">Comments:</p>
      <div className="flex flex-col items-center">
        {comments.length === 0 || !comments ? (
          <p>No Comments found ...</p>
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.createdAt} comment={comment} />
          ))
        )}
      </div>
    </section>
  );
}

export default CommentSection;

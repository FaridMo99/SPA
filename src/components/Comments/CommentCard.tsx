import UserImage from "../ui/UserImage";
import passedTime from "../../utils/passedTime";
import { Link } from "react-router-dom";
import { type Comment } from "../../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteComment,
  dislikeComment,
  likeComment,
} from "../../utils/interactWithPost";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import Button from "../auth/Button";
import useAuth from "../../stores/authStore";
import CustomLoader from "../ui/CustomLoader";

const thumbStyles =
  "dark:text-dark-green absolute -bottom-8 right-0 flex justify-between items-center dark:hover:text-white text-green-300 hover:text-white";

function CommentCard({ comment }: { comment: Comment }) {
  const { id: postId } = useParams();
  const queryClient = useQueryClient();
  const user = useAuth((state) => state.user);

  const { mutate: likeCommentMutate, isPending: likePending } = useMutation({
    mutationKey: ["like comment"],
    mutationFn: () =>
      comment.likedBy.length > 0
        ? dislikeComment(postId!, comment.id)
        : likeComment(postId!, comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get comments", postId] });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
  const { mutate: deleteCommentMutate, isPending: deletePending } = useMutation(
    {
      mutationKey: ["delete comment"],
      mutationFn: () => deleteComment(postId!, comment.id),
      onSuccess: () => {
        toast.success("Delete Successful");
        queryClient.invalidateQueries({ queryKey: ["get comments", postId] });
      },
      onError: (err) => {
        toast.error(err.message || "Something went wrong");
      },
    },
  );

  return (
    <section className="w-[90%] bg-gray-50 border dark:bg-dark-gray dark:border-dark-green border-gray-300 flex items-start relative rounded-sm mb-2 font-bold p-2">
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

        {comment.likedBy.length > 0 ? (
          <button
            aria-label="dislike comment"
            onClick={() => likeCommentMutate()}
            className={thumbStyles}
          >
            <ThumbsDown className="mr-2" />
            <p>{comment._count.likedBy}</p>
          </button>
        ) : (
          <button
            disabled={likePending}
            aria-label="like comment"
            onClick={() => likeCommentMutate()}
            className={thumbStyles}
          >
            <ThumbsUp className="mr-2" />
            <p>{comment._count.likedBy}</p>
          </button>
        )}
        {comment.user.username === user?.username && (
          <Button
            disabled={deletePending}
            clickHandler={deleteCommentMutate}
            styles="absolute -bottom-16 -right-16 z-10"
            text={
              deletePending ? (
                <CustomLoader />
              ) : (
                <Trash2 className="text-red-500" />
              )
            }
          />
        )}
      </div>
    </section>
  );
}

export default CommentCard;

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../components/LoadingScreen";
import { getPostByPostId } from "../utils/getPosts";
import { getAllCommentsByPostId } from "../utils/interactWithPost";
import PostCommentCard from "../components/Comments/PostCommentCard";
import CommentSection from "../components/Comments/CommentSection";
import CreateComment from "../components/Comments/CreateComment";

function Comments() {
  const { id: postId } = useParams();
  const { data: post, isLoading: postIsLoading } = useQuery({
    queryKey: ["get post", postId],
    queryFn: () => {
      if (postId) return getPostByPostId(postId);
    },
  });
  const { data: comments, isLoading: commentsIsLoading } = useQuery({
    queryKey: ["get comments", postId],
    queryFn: () => {
      if (postId) return getAllCommentsByPostId(postId);
    },
  });

  //maybe add streaming so when one first then only other loads
  if (postIsLoading || commentsIsLoading) return <LoadingScreen />;
  if (!post || !postId || !comments) throw new Error();

  return (
    <div className="w-full flex flex-col items-center mt-40">
      <PostCommentCard post={post} />
      <CommentSection comments={comments} />
      <CreateComment postId={postId} />
    </div>
  );
}

export default Comments;

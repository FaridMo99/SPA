import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../components/LoadingScreen";
import { getPostByUserId } from "../utils/getPosts";
import PostCommentCard from "../components/Comments/PostCommentCard";
import CommentSection from "../components/Comments/CommentSection";
import CreateComment from "../components/Comments/CreateComment";

function Comments() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["get comment", id],
    queryFn: () => {
      if (id) return getPostByUserId(id);
    },
  });

  if (isLoading) return <LoadingScreen />;
  if (!data || !id) throw new Error();

  return (
    <div className="w-full flex flex-col items-center mt-40">
      <PostCommentCard comment={data} />
      <CommentSection comments={data.comments} />
      <CreateComment commentId={id} />
    </div>
  );
}

export default Comments;

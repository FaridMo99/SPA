import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../components/LoadingScreen";
import getPosts from "../utils/getPosts";
import PostCommentCard from "../components/Comments/PostCommentCard";
import CommentSection from "../components/Comments/CommentSection";
import CreateComment from "../components/Comments/CreateComment";

function Comments() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["get comment", id],
    queryFn: () => getPosts(`/id/${id}`),
  });

  if (isLoading) return <LoadingScreen />;
  return (
    <div className="w-full flex flex-col items-center mt-40">
      <PostCommentCard comment={data} />
      <CommentSection comments={data.comments} />
      <CreateComment commentId={id} />
    </div>
  );
}

export default Comments;

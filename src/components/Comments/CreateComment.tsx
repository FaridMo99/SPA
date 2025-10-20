import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../utils/interactWithPost";
import toast from "react-hot-toast";
import MessageCommentForm from "../ui/MessageCommentForm";

function CreateComment({ postId }: { postId: string }) {
  const [value, setValue] = useState<string>("");
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["create comment", postId],
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      createComment(postId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get comments", postId] });
      toast.success("Comment successful!");
      setValue("");
    },
    onError: () => {
      toast.error("Something went wrong...");
    },
  });

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate({ postId, content: value });
  }

  return (
    <MessageCommentForm
      value={value}
      setValue={setValue}
      isPending={isPending}
      submitHandler={submitHandler}
      ariaLabel={"Send Comment"}
      placeholder={"Comment..."}
    />
  );
}

export default CreateComment;

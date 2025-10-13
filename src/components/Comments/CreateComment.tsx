import React, { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../utils/interactWithPost";
import toast from "react-hot-toast";

const buttonStyles: string =
  "bg-green-300 text-white rounded-3xl p-2 mr-2 font-bold hover:bg-gray-300 hover:text-green-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-gray-100 disabled:hover:text-gray-400 absolute right-1 bottom-1 dark:enabled:bg-dark-green enabled:hover:brightness-105";

const formStyles: string =
  "w-full outline-1 bg-gray-50 dark:outline-black outline-gray-300 fixed bottom-0 right-0 flex items-center justify-center py-2 px-4 dark:bg-dark-gray dark:brightness-120";


function CreateComment({ postId }: { postId: string }) {
  const [value, setValue] = useState<string>("");
  const queryClient = useQueryClient()
  const { isPending, isIdle, mutate } = useMutation({
    mutationKey: ["create comment", postId],
    mutationFn: ({postId, content}:{postId:string,content:string}) => createComment(postId, {content}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get comments", postId] });
      toast.success("Comment successful!")
      setValue("")
    },
    onError: () => {
      toast.error("Somethign went wrong...")
    }
  })


  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate({postId, content:value})
  }

  return (
    <form onSubmit={submitHandler} className={formStyles}>
      <textarea
        className="resize-none bg-white focus:outline-green-300 dark:bg-dark-gray dark:focus:outline-dark-green w-1/2 p-2 rounded-md dark:brightness-80"
        placeholder="Comment..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={1}
      />
      <button
        className={buttonStyles}
        type="submit"
        disabled={value.trim().length === 0 || isPending}
        aria-label="Send Comment"
      >
        {isIdle && <Send />}
        {isPending && <Loader2 className="animation-spin"/>}
      </button>
    </form>
  );
}

export default CreateComment;

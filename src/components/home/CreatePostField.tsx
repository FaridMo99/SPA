import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import createPost from "../../utils/createPost";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const buttonStyles =
  "bg-green-300 text-white rounded-3xl p-2 w-18 mr-2 font-bold disabled:bg-gray-100 disabled:text-gray-400 dark:bg-dark-green dark:disabled:bg-gray-100 dark:disabled:text-gray-400 enabled:hover:brightness-110 dark:enabled:hover:brightness-110";

function CreatePostField() {
  const [text, setText] = useState<string>("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { content: string }) => createPost(data),
    mutationKey: ["create Post", text],
  });

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutation.mutate(
      { content: text.trim() },
      {
        onSuccess: () => {
          //add invalidating fyp and fyp should also include user posts
          queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
          setText("");
          toast.success("Successfully posted");
        },
        onError: () => {
          toast.error("Something went wrong!");
        },
      },
    );
  }
  //add file upload and gif upload/preview here
  return (
    <section
      aria-label="Create Post"
      className="w-full h-[20vh] bg-white mb-16 dark:bg-dark-gray"
    >
      <form onSubmit={submitHandler} className="w-full h-full">
        <textarea
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
            setText(e.target.value);
          }}
          placeholder="Tell us..."
          className="bg-white w-full h-2/3 font-bold resize-none  dark:bg-dark-gray"
        />
        <div className="border-y-black/10 dark:border-black border-y-2 w-full h-1/3 -mt-1.5 flex items-center justify-end">
          <button
            disabled={text.length === 0 || mutation.isPending}
            className={buttonStyles}
            type="submit"
          >
            {mutation.isPending ? <Loader2 className="animate-spin" /> : "Post"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePostField;

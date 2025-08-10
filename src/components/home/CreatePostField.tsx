import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import createPost, { type PostData } from "../../utils/createPost";
import useAuth from "../../stores/authStore";
import SuccessScreen from "../auth/SuccessScreen";
import { CheckCircle2 } from "lucide-react";

const buttonStyles =
  "bg-green-300 text-white rounded-3xl p-2 w-18 mr-2 font-bold disabled:bg-gray-100 disabled:text-gray-400 dark:bg-dark-green dark:disabled:bg-gray-100 dark:disabled:text-gray-400 enabled:hover:brightness-110 dark:enabled:hover:brightness-110";

function CreatePostField() {
  const [text, setText] = useState<string>("");
  const user = useAuth((state) => state.user)!;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: PostData) => createPost(data),
    mutationKey: ["create Post", text],
  });

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: PostData = {
      createdAt: new Date().toISOString(),
      username: user.username,
      avatar: user.avatar,
      post: text.trim(),
      likes: [],
      comments: [],
    };

    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
        setText("");
      },
      onError: () => {
        alert("Something went wrong!");
      },
    });
  }

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
        ></textarea>
        <div className="border-y-black/10 dark:border-black border-y-2 w-full h-1/3 -mt-1.5 flex items-center justify-end">
          <button
            disabled={text.length === 0 || mutation.isPending}
            className={buttonStyles}
            type="submit"
          >
            {mutation.isPending ? "Loading..." : "Post"}
          </button>
        </div>
      </form>
      {mutation.isSuccess && (
        <div className="absolute top-0 left-0">
          <SuccessScreen animation="animate-ping" Icon={CheckCircle2} />
        </div>
      )}
    </section>
  );
}

export default CreatePostField;
//user being not null being forced on the private routes is because it
//cant be null otherwise you would be already kicked out

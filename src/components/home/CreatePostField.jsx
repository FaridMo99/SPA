import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import createPost from "../../utils/createPost";
import useAuth from "../../stores/authStore";
import SuccessScreen from "../auth/SuccessScreen";
import { CheckCircle2 } from "lucide-react";

const buttonStyles =
  "bg-green-300 text-white rounded-3xl p-2 w-18 mr-2 font-bold hover:bg-gray-300 hover:text-green-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-gray-100 disabled:hover:text-gray-400";

function CreatePostField() {
  const [text, setText] = useState("");
  const user = useAuth((state) => state.user);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => createPost(data),
    mutationKey: ["create Post", text],
  });

  function submitHandler(e) {
    e.preventDefault();
    const data = {
      createdAt: new Date().toISOString(),
      username: user.username,
      avatar: user.avatar,
      post: text.trim(),
      likes: 0,
      impressions: 0,
      comments: 0,
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
      className="w-full h-[20vh] bg-white mb-16"
    >
      <form onSubmit={submitHandler} className="w-full h-full">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Tell us..."
          className="bg-white w-full h-2/3 font-bold"
        ></textarea>
        <div className="border-y-black/10 border-y-2 w-full h-1/3 -mt-1.5 flex items-center justify-end">
          <button
            disabled={text.length === 0 || mutation.isLoading}
            className={buttonStyles}
            type="submit"
          >
            {mutation.isLoading ? "Loading..." : "Post"}
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

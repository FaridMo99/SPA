import { useState } from "react";
import { Send } from "lucide-react";
import { comment } from "../../utils/interactWithPost";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../stores/authStore";

const buttonStyles =
  "bg-green-300 text-white rounded-3xl p-2 mr-2 font-bold hover:bg-gray-300 hover:text-green-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-gray-100 disabled:hover:text-gray-400 absolute right-1 bottom-1";

const formStyles =
  "w-full  outline-1 bg-gray-50 outline-gray-300 fixed bottom-0 right-0 flex items-center justify-center py-2 px-4";

function CreateComment({ commentId }) {
  const [value, setValue] = useState("");
  const user = useAuth((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["send comment", commentId],
    mutationFn: ({ postId, username, text }) =>
      comment({ postId, username, text }),
    onSuccess: () => {
      setValue("");
    },
  });

  function submitHandler(e) {
    e.preventDefault();

    mutate({
      postId: commentId,
      username: user.username,
      text: value.trim(),
    });
  }

  return (
    <form onSubmit={submitHandler} className={formStyles}>
      <textarea
        className="resize-none bg-white focus:outline-green-300 w-1/2 p-2 rounded-md"
        placeholder="Comment..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={1}
      />
      <button
        className={buttonStyles}
        type="submit"
        disabled={value.trim().length === 0 || isLoading}
        aria-label="Send Comment"
      >
        <Send />
      </button>
    </form>
  );
}

export default CreateComment;

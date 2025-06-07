import { useState } from "react";
import useAuth from "../../stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { updateFollow } from "../../utils/updateFollow";
import { useQueryClient } from "@tanstack/react-query";

function FollowButton({ name }) {
  const { user, setUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(user.following.includes(name));
  const queryClient = useQueryClient();
  const queryString = `/${name}`;
  const { mutate, isPending } = useMutation({
    mutationKey: ["follow/unfollow"],
    mutationFn: ({ username, targetUsername, action }) =>
      updateFollow({ username, targetUsername, action }),
    onSuccess: (updatedUser) => {
      setIsFollowing((prev) => !prev);
      setUser(updatedUser);
      queryClient.invalidateQueries(["userData", queryString]);
    },
  });

  return (
    <button
      type="button"
      className="rounded px-2 py-1 bg-green-300 text-white font-bold absolute right-2"
      onClick={() =>
        mutate({
          username: user.username,
          targetUsername: name,
          action: isFollowing ? "unfollow" : "follow",
        })
      }
      disabled={isPending}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}

export default FollowButton;

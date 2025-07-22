import { useState } from "react";
import useAuth from "../../stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { updateFollow, type UpdateFollow } from "../../utils/updateFollow";
import { useQueryClient } from "@tanstack/react-query";
import { type User } from "../../mocks/data";

function FollowButton({ name }: { name: string }) {
  const { user, setUser } = useAuth();
  const safeUser = user!;
  const [isFollowing, setIsFollowing] = useState(
    safeUser.following.includes(name),
  );
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<User, Error, UpdateFollow>({
    mutationKey: ["follow/unfollow"],
    mutationFn: updateFollow,
    onSuccess: (updatedUser) => {
      setIsFollowing((prev) => !prev);
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ["userData", name] });
    },
  });

  return (
    <button
      type="button"
      className="rounded px-2 py-1 bg-green-300 text-white font-bold absolute right-2"
      onClick={() =>
        mutate({
          username: safeUser.username,
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

import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { follow, unfollow } from "../../utils/editUser";
import useAuth from "../../stores/authStore";
import type { User } from "../../types/types";
import { getFollowStatus } from "../../utils/getUsers";
import CustomLoader from "../ui/CustomLoader";

function FollowButton({ name }: { name: string }) {
  const user = useAuth((state) => state.user) as User;
  const fetchUser = useAuth((state) => state.fetchUser);

  const queryClient = useQueryClient();

  const {
    data: isFollowing,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get follow for button", name],
    queryFn: () => getFollowStatus(name),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["follow/unfollow user", name],
    mutationFn: () => (isFollowing ? unfollow(name) : follow(name)),
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData", name] });
      queryClient.invalidateQueries({
        queryKey: ["getFollows", user.username],
      });
      queryClient.invalidateQueries({
        queryKey: ["get follow for button", name],
      });
      fetchUser();
    },
  });

  if (isLoading || isError) return null;

  return (
    <button
      tabIndex={0}
      type="button"
      disabled={isPending}
      className="rounded px-2 py-1 bg-green-300 dark:bg-dark-green text-white font-bold absolute right-2 disabled:opacity-60"
      onClick={() => mutate()}
    >
      {isPending && <CustomLoader styles="dark:text-white" />}
      {!isPending && isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}

export default FollowButton;

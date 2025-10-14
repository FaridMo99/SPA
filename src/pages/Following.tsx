import useAuth from "../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/types";
import { getFollowing } from "../utils/getUsers";
import FollowSection from "../components/profile/FollowSection";

//look how to solve all these as keywords
//look if you have to maybe invalidate queries to update ui, maybe implement optimistic ui update
function Following() {
  const user = useAuth((state) => state.user) as User;

  const {
    data: followingList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getFollows", user.username],
    queryFn: () => getFollowing(user.username),
  });

  return (
    <div className="w-full flex flex-col my-4 items-center">
      <FollowSection
        isLoading={isLoading}
        isError={isError}
        followList={followingList}
      />
    </div>
  );
}

export default Following;

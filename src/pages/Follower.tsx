import useAuth from "../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { getFollowing } from "../utils/getUsers";
import FollowSection from "../components/profile/FollowSection";

function Follower() {
  const user = useAuth((state) => state.user)!;

  const {
    data: followingList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getFollowers", user.username],
    queryFn: () => getFollowing(user.username),
  });

  return (
    <div className="w-full flex flex-col my-4 items-center">
      <FollowSection
        isLoading={isLoading}
        isError={isError}
        followList={followingList}
        text="follower"
      />
    </div>
  );
}

export default Follower;

import useAuth from "../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { getFollowers } from "../utils/getUsers";
import FollowSection from "../components/profile/FollowSection";

function Follower() {
  const user = useAuth((state) => state.user)!;

  const {
    data: followerList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getFollowers", user.username],
    queryFn: () => getFollowers(user.username),
  });

  return (
    <div className="w-full flex flex-col my-4 items-center">
      <FollowSection
        isLoading={isLoading}
        isError={isError}
        followList={followerList}
      />
    </div>
  );
}

export default Follower;

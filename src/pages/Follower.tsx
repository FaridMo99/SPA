import useAuth from "../stores/authStore";
import FollowCard from "../components/profile/FollowCard";
import CustomLoader from "../components/CustomLoader";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../utils/getUsers";
import type { User } from "../types/types";

function Follower() {
  const user = useAuth((state) => state.user)!;

  const { data = [], isLoading } = useQuery<User[]>({
    queryKey: ["getFollowers", user.followers],
    queryFn: async () => {
      const followersData = await Promise.all(
        user.followers.map((username) => getUser(`${username}`)),
      );
      return followersData;
    },
  });

  if (isLoading) return <CustomLoader />;

  return (
    <div className="w-full flex flex-col my-4 items-center">
      {user.followers.length === 0 ? (
        <p className="font-bold text-green-300 mt-10">
          You have 0 followers...
        </p>
      ) : (
        data.map((follower) => (
          <FollowCard key={follower.id} followsData={follower} />
        ))
      )}
    </div>
  );
}

export default Follower;

import useAuth from "../stores/authStore";
import FollowCard from "../components/profile/FollowCard";
import CustomLoader from "../components/CustomLoader";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../utils/getUsers";
import type { User } from "../mocks/data";

function Follower() {
  const user = useAuth((state) => state.user) as User;

  const { data = [], isLoading } = useQuery<User[]>({
    queryKey: ["getFollows", user.following],
    queryFn: async () => {
      const followingData = await Promise.all(
        user.following.map((username) => getUser(`${username}`)),
      );
      return followingData;
    },
  });

  if (isLoading) return <CustomLoader />;

  return (
    <div className="w-full flex flex-col my-4 items-center">
      {user.following.length === 0 ? (
        <p className="font-bold text-green-300 mt-10">You follow 0 People...</p>
      ) : (
        data.map((follower) => (
          <FollowCard btn key={follower.id} followsData={follower} />
        ))
      )}
    </div>
  );
}

export default Follower;

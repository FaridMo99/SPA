import CustomLoader from "../CustomLoader";
import FollowCard from "./FollowCard";
import type { User } from "../../types/types";

type FollowSectionProps = {
  isLoading: boolean;
  isError: boolean;
  followList: User[] | [] | undefined;
  text: "follows" | "follower";
};

function FollowSection({
  isLoading,
  isError,
  followList,
  text,
}: FollowSectionProps) {
  if (isLoading) return <CustomLoader />;
  if (isError)
    return <p className="font-bold text-red-500 mt-10">Something went wrong</p>;
  if (followList?.length === 0)
    return <p className="font-bold text-green-300 mt-10">You have 0 {text}</p>;
  if (followList && followList.length > 0)
    return followList.map((follower) => (
      <FollowCard btn key={follower.username} followsData={follower} />
    ));
}

export default FollowSection;

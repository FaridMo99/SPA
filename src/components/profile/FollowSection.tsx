import CustomLoader from "../ui/CustomLoader";
import FollowCard from "./FollowCard";
import type { FollowerList, FollowingList } from "../../types/types";

type FollowSectionProps = {
  isLoading: boolean;
  isError: boolean;
  followList: FollowerList | FollowingList | undefined;
};

function isFollowerList(
  list: FollowSectionProps["followList"],
): list is FollowerList {
  return !!list && "followers" in list;
}

function isFollowingList(
  list: FollowSectionProps["followList"],
): list is FollowingList {
  return !!list && "following" in list;
}

function FollowSection({ isLoading, isError, followList }: FollowSectionProps) {
  if (isLoading) return <CustomLoader size={80} styles="mt-20" />;

  if (!isLoading && (isError || !followList))
    return (
      <p className="font-bold text-red-500 mt-10">Something went wrong...</p>
    );

  if (isFollowerList(followList) && followList.followers.length === 0)
    return (
      <p className="font-bold text-green-300 mt-10 dark:text-dark-green">
        You have 0 followers
      </p>
    );

  if (isFollowingList(followList) && followList.following.length === 0)
    return (
      <p className="font-bold text-green-300 dark:text-dark-green mt-10">
        You follow 0 users
      </p>
    );

  if (isFollowerList(followList))
    return followList.followers.map((f) => (
      <FollowCard key={f.follower.username} followsData={f.follower} btn />
    ));

  if (isFollowingList(followList))
    return followList.following.map((f) => (
      <FollowCard key={f.following.username} followsData={f.following} btn />
    ));

  return null;
}

export default FollowSection;

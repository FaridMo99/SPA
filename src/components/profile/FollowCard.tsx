import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import UserImage from "../ui/UserImage";
import type { User } from "../../types/types";

type FollowCardType = {
  followsData: Omit<User, "bio" | "_count">;
  btn?: boolean;
};

function FollowCard({ followsData, btn = false }: FollowCardType) {
  return (
    <section className="w-[90%] h-[10vh] relative rounded-xl bg-gray-50 mt-2 flex items-center outline-1 outline-gray-300 py-12 dark:bg-dark-gray dark:outline-dark-green">
      <UserImage styles="absolute left-4" img={followsData.profilePicture} />
      <Link
        to={`/${followsData.username}`}
        className="absolute hover:text-gray-500 left-[30%] md:left-1/5"
      >
        <p>{followsData.username}</p>
      </Link>
      {btn && <FollowButton name={followsData.username} />}
    </section>
  );
}

export default FollowCard;

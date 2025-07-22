import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import UserImage from "../UserImage";
import type { User } from "../../mocks/data";

type FollowCardType = {
  followsData: User;
  btn?: boolean;
};

function FollowCard({ followsData, btn = false }: FollowCardType) {
  return (
    <section className="w-[90%] h-[10vh] relative rounded-xl bg-gray-50 mt-2 flex items-center outline-1 outline-gray-300 py-12">
      <UserImage styles="absolute left-4" img={followsData.avatar} />
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

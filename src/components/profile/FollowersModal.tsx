import React from "react";
import ModalWrapper from "./ModalWrapper";
import { useQuery } from "@tanstack/react-query";
import { getFollowers } from "../../utils/getUsers";
import CustomLoader from "../ui/CustomLoader";
import ErrorText from "../ui/ErrorText";
import UserImage from "../ui/UserImage";
import NotFound from "../ui/NotFound";
import { Link } from "react-router-dom";

type FollowModalProps = {
  username: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function FollowersModal({ username, setIsOpen }: FollowModalProps) {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get followers", username],
    queryFn: () => getFollowers(username),
  });

  return (
    <ModalWrapper setIsOpen={setIsOpen}>
      <div className="w-1/2 relative min-h-[20vh] max-h-[80vh] overflow-scroll md:w-[38vw] dark:bg-dark-gray bg-white rounded-2xl outline-1 outline-gray-200 shadow-md shadow-black/20 z-51 flex flex-col justify-evenly items-center">
        {isLoading && <CustomLoader size={100} />}
        {isError && <ErrorText text="Something went wrong" />}
        {!isLoading && user?.followers.length === 0 && (
          <NotFound text="No followers found..." />
        )}
        {!isLoading && user && user?.followers.length > 0 && (
          <ul className="w-full h-full">
            {user?.followers.map((follower) => (
              <Link
                to={`/${follower.follower.username}`}
                key={follower.follower.username}
                className="flex justify-between items-center w-full pl-20 pr-40 py-5 hover:bg-gray-500"
              >
                <UserImage
                  styles="w-10 h-10 md:w-14 md:h-14"
                  img={follower.follower.profilePicture}
                />
                {follower.follower.username}
              </Link>
            ))}
          </ul>
        )}
      </div>
    </ModalWrapper>
  );
}

export default FollowersModal;

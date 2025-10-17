import React from "react";
import ModalWrapper from "./ModalWrapper";
import { useQuery } from "@tanstack/react-query";
import { getFollowing } from "../../utils/getUsers";
import CustomLoader from "../ui/CustomLoader";
import ErrorText from "../ui/ErrorText";
import UserImage from "../ui/UserImage";
import NotFound from "../ui/NotFound";
import { Link } from "react-router-dom";

type FollowingsModalProps = {
  username: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function FollowingsModal({ username, setIsOpen }: FollowingsModalProps) {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get followers", username],
    queryFn: () => getFollowing(username),
  });

  return (
    <ModalWrapper setIsOpen={setIsOpen}>
      <div className="w-1/2 relative h-[68vh] overflow-scroll md:w-[38vw] dark:bg-dark-gray bg-white rounded-2xl outline-1 outline-gray-200 shadow-md shadow-black/20 z-51 flex flex-col justify-evenly items-center">
        {isLoading && <CustomLoader size={100} />}
        {isError && <ErrorText text="Something went wrong" />}
        {!isLoading && user?.following.length === 0 && (
          <NotFound text="No followers found..." />
        )}
        {!isLoading && user && user?.following.length > 0 && (
          <ul className="">
            {user?.following.map((following) => (
              <Link
                to={`/${following.following.username}`}
                key={following.following.username}
                className="flex justify-between items-center w-full pl-20 pr-40 py-5 hover:bg-gray-500"
              >
                <UserImage
                  styles="w-10 h-10 md:w-14 md:h-14"
                  img={following.following.profilePicture}
                />
                {following.following.username}
              </Link>
            ))}
          </ul>
        )}
      </div>
    </ModalWrapper>
  );
}

export default FollowingsModal;

import { useState } from "react";
import FollowersModal from "./FollowersModal";
import FollowingsModal from "./FollowingsModal";

type ImageSectioFollowCountSectionProps = {
  followers: number;
  following: number;
  username: string;
};

function ImageSectionFollowCountSection({
  followers,
  following,
  username,
}: ImageSectioFollowCountSectionProps) {
  const [isFollowersOpen, setIsFollowersOpen] = useState<boolean>(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState<boolean>(false);

  return (
    <div className="font-bold text-green-300 dark:text-dark-green flex justify-evenly items-center absolute top-9 left-22 w-1/2">
      <p
        onClick={() => setIsFollowersOpen(true)}
        className="hover:brightness-110 cursor-pointer"
      >
        Follower:{followers}
      </p>
      <p
        onClick={() => setIsFollowingOpen(true)}
        className="hover:brightness-110 cursor-pointer"
      >
        Following:{following}
      </p>
      {isFollowersOpen && (
        <FollowersModal username={username} setIsOpen={setIsFollowersOpen} />
      )}
      {isFollowingOpen && (
        <FollowingsModal username={username} setIsOpen={setIsFollowingOpen} />
      )}
    </div>
  );
}

export default ImageSectionFollowCountSection;

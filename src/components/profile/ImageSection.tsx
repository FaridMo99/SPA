import { useState } from "react";
import EditModal from "./EditModal";
import FollowButton from "./FollowButton";
import UserImage from "../ui/UserImage";
import type { Avatar } from "../main/Header";
import DeleteAccountModal from "./DeleteAccountModal";
import ImageSectionButtonSection from "./ImageSectionButtonSection";
import ImageSectionFollowCountSection from "./ImageSectionFollowCountSection";

type ImageSectionProps = {
  username: string;
  profilePicture: Avatar;
  bio: string | null;
  editable?: boolean;
  followers: number;
  following: number;
};

function ImageSection({
  username,
  profilePicture,
  bio,
  editable = false,
  followers,
  following,
}: ImageSectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);
  const nameStyles = "text-gray-600 font-bold mt-[11vh] flex";

  return (
    <>
      <section
        aria-label="profile picture area"
        className="w-full h-[40vh] flex flex-col items-center bg-gray-300 dark:bg-dark-gray relative"
      >
        {editable ? (
          <ImageSectionButtonSection
            setIsOpen={setIsOpen}
            setDeleteIsOpen={setDeleteIsOpen}
          />
        ) : (
          <div className="absolute font-bold top-8 right-4">
            <FollowButton name={username} />
          </div>
        )}
        <div className="flex w-full items-center pl-10 h-3/4">
          <UserImage img={profilePicture} />
          {!editable && (
            <ImageSectionFollowCountSection
              followers={followers}
              following={following}
              username={username}
            />
          )}
          <p className={nameStyles}>@{username}</p>
        </div>
        <div className="w-full">
          <p className="font-bold text-center break-words">{bio}</p>
        </div>
      </section>
      {isOpen && <EditModal setIsOpen={setIsOpen} />}
      {deleteIsOpen && (
        <DeleteAccountModal
          username={username}
          setDeleteIsOpen={setDeleteIsOpen}
        />
      )}
    </>
  );
}

export default ImageSection;

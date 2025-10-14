import { useState } from "react";
import { Moon, Settings, Sun } from "lucide-react";
import EditModal from "./EditModal";
import Button from "../auth/Button";
import FollowButton from "./FollowButton";
import UserImage from "../UserImage";
import { useTheme } from "next-themes";
import type { Avatar } from "../main/Header";

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
  const { theme, setTheme } = useTheme();
  const nameStyles = "text-gray-600 font-bold mt-[11vh] flex";

  return (
    <>
      <section
        aria-label="profile picture area"
        className="w-full h-[40vh] flex flex-col items-center bg-gray-300 dark:bg-dark-gray relative"
      >
        {editable ? (
          <div>
            <Button
              styles="absolute top-2 right-2 md:px-8"
              clickHandler={() => {
                setTheme((pre) => (pre === "dark" ? "light" : "dark"));
              }}
              text={
                theme === "dark" ? (
                  <Moon className="text-dark-green" />
                ) : (
                  <Sun className="text-green-400" />
                )
              }
            />
            <Button
              styles="absolute top-15 right-2 md:px-8"
              text={<Settings />}
              clickHandler={() => setIsOpen(true)}
            />
          </div>
        ) : (
          <div className="absolute font-bold top-8 right-4">
            <FollowButton name={username} />
          </div>
        )}
        <div className="flex w-full items-center pl-10 h-3/4">
          <UserImage img={profilePicture} />
          {!editable && (
            <div className="font-bold text-green-300 dark:text-dark-green flex justify-evenly items-center absolute top-9 left-22 w-1/2">
              <p>Follower:{followers}</p>
              <p>Following:{following}</p>
            </div>
          )}
          <p className={nameStyles}>@{username}</p>
        </div>
        <div className="w-full">
          <p className="font-bold text-center break-words">{bio}</p>
        </div>
      </section>
      {isOpen && <EditModal setIsOpen={setIsOpen} />}
    </>
  );
}

export default ImageSection;

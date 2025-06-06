import { useState } from "react";
import UserImg from "../UserImage";
import { Settings } from "lucide-react";
import EditModal from "./EditModal";
import Button from "../auth/Button";
import FollowButton from "./FollowButton";

function ImageSection({ username, img, bio = "", editable = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const nameStyles = "text-gray-600 font-bold mt-[11vh] flex";

  return (
    <>
      <section
        aria-label="profile picture area"
        className="w-full h-[40vh] flex flex-col items-center bg-gray-300 relative"
      >
        {editable ? (
          <Button
            styles="absolute top-2 right-2 md:px-8"
            text={<Settings />}
            clickHandler={() => setIsOpen(true)}
          />
        ) : (
          <div className="absolute top-8 right-4">
            <FollowButton name={username} />
          </div>
        )}
        <div className="flex w-full items-center pl-10 h-3/4">
          <UserImg editable img={img} />
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

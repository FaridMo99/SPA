import React from "react";
import UserImg from "../UserImage";
import UsersLoadingSkeleton from "../UsersLoadingSkeleton";

function ImageSection({ username = "Not Found", userimage, bio = "" }) {
  const nameStyles = "text-gray-600 font-bold mt-[11vh]";
  return (
    <section
      aria-label="profile picture area"
      className="w-full h-[30vh] flex pl-10 items-center bg-gray-300 relative"
    >
      <UserImg userSize={100} size="30" noImg />
      <p className={nameStyles}>@{username}</p>
      <p className="absolute right-0 bottom-[37.5%] border-1 border-green-300 w-1/4 h-1/4 overflow-scroll">
        {bio}
      </p>
    </section>
  );
}

export default ImageSection;

//add onclick you can change image
//add username and onclick you can change

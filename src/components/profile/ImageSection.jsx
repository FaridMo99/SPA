import React from "react";
import UserImg from "../UserImage";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ImageSection({ username = "mockname", userimage }) {
  const nameStyles = "text-gray-600 font-bold mt-[11vh]";
  return (
    <section
      aria-label="profile picture area"
      className="w-full h-[30vh] flex pl-10 items-center bg-gray-300"
    >
      <UserImg userSize={100} size="30" noImg />
      <p className={nameStyles}>@{username}</p>
    </section>
  );
}

export default ImageSection;

//add onclick you can change image
//add username and onclick you can change

// loader img       <Skeleton circle width={120} height={120}/>
// loader name        <Skeleton className={nameStyles} width={100} height={20}/>

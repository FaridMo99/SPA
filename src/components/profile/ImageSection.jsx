import React from "react";
import UserImg from "../UserImage"

function ImageSection() {

  return <section aria-label="profile picture area" className="w-full h-[30vh] flex pl-10 items-center bg-gray-300">
      <UserImg userSize={100} size="30" noImg/>
  </section>;
}

export default ImageSection;

//add onclick you can change image

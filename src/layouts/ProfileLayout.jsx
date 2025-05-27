import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/profile/UserNavbar";
import ImageSection from "../components/profile/ImageSection";

function ProfileLayout() {
  return (
    <>
      <ImageSection />
      <UserNavbar />
      <Outlet />
    </>
  );
}

export default ProfileLayout;

//add read, update and delete functionality for posts
//so basically fetch your own posts on render
//have a button to edit (update)
//add a delete button
//add a when editing and dont wanna submit like a reset button

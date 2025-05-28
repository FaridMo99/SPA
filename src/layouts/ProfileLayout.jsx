import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/profile/UserNavbar";
import ImageSection from "../components/profile/ImageSection";
import { useQuery } from "@tanstack/react-query";
import getPosts from "../utils/getPosts";

function ProfileLayout() {
  const queryString = "?username=Claudia_Dietrich";
  const { data, isLoading } = useQuery({
    queryKey: ["get user", queryString],
    queryFn: () => getPosts(queryString),
    refetchOnMount: true,
    staleTime: 0,
  });

  const userLinks = [
    {
      href: "/profile",
      name: "Posts",
    },
    {
      href: "/profile/likes",
      name: "Likes",
    },
    {
      href: "/profile/comments",
      name: "Comments",
    },
  ];

  return (
    <>
      <ImageSection />
      <UserNavbar links={userLinks} />
      <Outlet context={[data, isLoading]} />
    </>
  );
}

export default ProfileLayout;

//add read, update and delete functionality for posts
//so basically fetch your own posts on render
//have a button to edit (update)
//add a delete button
//add a when editing and dont wanna submit like a reset button

import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/profile/UserNavbar";
import ImageSection from "../components/profile/ImageSection";
import { useQuery } from "@tanstack/react-query";
import getUsers from "../utils/getUsers";
import getPosts from "../utils/getPosts";
import useAuth from "../stores/authStore";
import UsersLoadingSkeleton from "../components/UsersLoadingSkeleton";

function ProfileLayout() {
  const user = useAuth((state) => state.user);
  const queryString = `?username=${user.username}`;
  const { data, isLoading } = useQuery({
    queryKey: ["get user", queryString],
    queryFn: () => getUsers(queryString),
    refetchOnMount: true,
    staleTime: 0,
  });

  const { data: postData, isLoading: postsIsLoading } = useQuery({
    queryKey: ["get posts", queryString],
    queryFn: () => getPosts(queryString),
    refetchOnMount: true,
  });

  const userLinks = [
    {
      href: "/profile",
      name: "Posts",
    },
    {
      href: "/profile/comments",
      name: "Comments",
    },
  ];

  if (isLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      <ImageSection
        bio={data[0].bio}
        img={data[0].avatar}
        username={data[0].username}
        editable
      />
      <UserNavbar links={userLinks} />
      <Outlet context={[postData, postsIsLoading]} />
    </>
  );
}

export default ProfileLayout;

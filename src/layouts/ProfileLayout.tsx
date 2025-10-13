import { Outlet } from "react-router-dom";
import UserNavbar from "../components/profile/UserNavbar";
import ImageSection from "../components/profile/ImageSection";
import useAuth from "../stores/authStore";
import type { User } from "../types/types";

export type Link = {
  href: string;
  name: string;
};

function ProfileLayout() {
  const user = useAuth((state) => state.user) as User;

  const userLinks: Link[] = [
    {
      href: "/profile",
      name: "Posts",
    },
    {
      href: "/profile/follower",
      name: `Follower(${user.followers.length})`,
    },
    {
      href: "/profile/follow",
      name: `Follow(${user.following.length})`,
    },
  ];

  return (
    <>
      <ImageSection
        bio={user.bio}
        img={user.avatar}
        username={user.username}
        editable
        followers={user.followers.length}
        following={user.following.length}
      />
      <UserNavbar links={userLinks} />
      <Outlet />
    </>
  );
}

export default ProfileLayout;

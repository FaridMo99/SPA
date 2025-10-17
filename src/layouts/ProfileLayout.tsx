import { Outlet } from "react-router-dom";
import UserNavbar from "../components/profile/Navbar";
import ImageSection from "../components/profile/ImageSection";
import useAuth from "../stores/authStore";
import type { User } from "../types/types";

export type Link = {
  href: string;
  name: string;
};

function ProfileLayout() {
  //user is definitely known here otherwiser loader would redirect
  const user = useAuth((state) => state.user) as User;

  const userLinks: Link[] = [
    {
      href: "/profile",
      name: "Posts",
    },
    {
      href: "/profile/follower",
      name: `Follower(${user._count.followers})`,
    },
    {
      href: "/profile/following",
      name: `Follow(${user._count.following})`,
    },
  ];

  return (
    <>
      <ImageSection
        bio={user.bio}
        profilePicture={user.profilePicture}
        username={user.username}
        editable
        followers={user._count.followers}
        following={user._count.following}
      />
      <UserNavbar links={userLinks} />
      <Outlet />
    </>
  );
}

export default ProfileLayout;

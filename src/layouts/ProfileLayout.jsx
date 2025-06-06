import { Outlet } from "react-router-dom";
import UserNavbar from "../components/profile/UserNavbar";
import ImageSection from "../components/profile/ImageSection";
import useAuth from "../stores/authStore";

function ProfileLayout() {
  const user = useAuth((state) => state.user);

  const userLinks = [
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
      />
      <UserNavbar links={userLinks} />
      <Outlet />
    </>
  );
}

export default ProfileLayout;

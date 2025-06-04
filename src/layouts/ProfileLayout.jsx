import { Outlet, useOutletContext } from "react-router-dom";
import UserNavbar from "../components/profile/UserNavbar";
import ImageSection from "../components/profile/ImageSection";
import { useQuery } from "@tanstack/react-query";
import getPosts from "../utils/getPosts";
import useAuth from "../stores/authStore";
import UsersLoadingSkeleton from "../components/UsersLoadingSkeleton";

function ProfileLayout() {
  const user = useAuth((state) => state.user);
  const queryString = `?username=${user.username}`;
  const [userData, userIsLoading] = useOutletContext();

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
      href: "/profile/follower",
      name: "Follower",
    },
    {
      href: "/profile/follow",
      name: "Follow",
    },
  ];

  if (userIsLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      <ImageSection
        bio={userData[0].bio}
        img={userData[0].avatar}
        username={userData[0].username}
        editable
      />
      <UserNavbar links={userLinks} />
      <Outlet context={[postData, postsIsLoading]} />
    </>
  );
}

export default ProfileLayout;

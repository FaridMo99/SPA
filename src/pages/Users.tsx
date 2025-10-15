import ImageSection from "../components/profile/ImageSection";
import PostCard from "../components/home/PostCard";
import { getAllPostsByUsername } from "../utils/getPosts";
import { getUser } from "../utils/getUsers";
import UsersLoadingSkeleton from "../components/ui/UsersLoadingSkeleton";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAuth from "../stores/authStore";
import { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/types";
import NotFound from "../components/ui/NotFound";

function Users() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.user) as User;
  const { username } = useParams();

  const {
    data: userData,
    isLoading: userIsLoading,
    isError,
  } = useQuery({
    queryKey: ["userData", username],
    queryFn: async () => {
      if (username) return getUser(username);
    },
  });

  const { data: postData, isLoading: postDataIsLoading } = useQuery({
    queryKey: ["getPostData", username],
    queryFn: async () => {
      if (username) return getAllPostsByUsername(username);
    },
  });

  useLayoutEffect(() => {
    if (username === user.username) {
      navigate("/profile");
    }
  }, [username, user, navigate]);

  if (userIsLoading || postDataIsLoading) return <UsersLoadingSkeleton />;

  if (!userData || isError) {
    throw new Error();
  }

  return (
    <main className="flex flex-col">
      <ImageSection
        bio={userData.bio}
        profilePicture={userData.profilePicture}
        username={userData.username}
        followers={userData._count.followers}
        following={userData._count.following}
      />
      <div className="w-full flex flex-col items-center mt-10">
        {postData?.map((element) => (
          <PostCard key={element.id} postData={element} />
        ))}
        {!postData ||
          (postData.length === 0 && <NotFound text="No Posts found..." />)}
      </div>
    </main>
  );
}

export default Users;

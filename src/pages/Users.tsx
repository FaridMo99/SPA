import ImageSection from "../components/profile/ImageSection";
import PostCard from "../components/home/PostCard";
import { getPostsByUserId } from "../utils/getPosts";
import { getUser } from "../utils/getUsers";
import UsersLoadingSkeleton from "../components/UsersLoadingSkeleton";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAuth from "../stores/authStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

function Users() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.user);
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
      if (username) return getPostsByUserId(username);
    },
  });

  useEffect(() => {
    if (username === user!.username) {
      navigate("/profile");
    }
  }, []);

  if (userIsLoading || postDataIsLoading) return <UsersLoadingSkeleton />;

  if (!userData || isError) {
    throw new Error();
  }

  return (
    <main className="flex flex-col">
      <ImageSection
        bio={userData.bio}
        img={userData.avatar}
        username={userData.username}
        followers={userData.followers.length}
        following={userData.following.length}
      />
      <div className="w-full flex flex-col items-center mt-10">
        {postData?.map((element) => (
          <PostCard key={element.id} postData={element} />
        ))}
        {!postData ||
          (postData.length === 0 && (
            <p className="text-green-300  dark:text-dark-green font-bold">
              No Posts found...
            </p>
          ))}
      </div>
    </main>
  );
}

export default Users;

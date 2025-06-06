import ImageSection from "../components/profile/ImageSection";
import PostCard from "../components/home/PostCard";
import getPosts from "../utils/getPosts";
import getUsers from "../utils/getUsers";
import UsersLoadingSkeleton from "../components/UsersLoadingSkeleton";
import { useLoaderData, useNavigation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAuth from "../stores/authStore";
import { useEffect } from "react";

function userQuery(queryString) {
  return {
    queryKey: ["userData", queryString],
    queryFn: async () => getUsers(queryString),
    retry: false,
  };
}

function userPostsQuery(queryString) {
  return {
    queryKey: ["getPostData", queryString],
    queryFn: async () => getPosts(queryString),
    retry: false,
  };
}

export const clientLoader =
  (queryClient) =>
  async ({ params }) => {
    const username = params.username;
    const queryString = `/${username}`;
    const userQueryObj = userQuery(queryString);
    const postsQueryObj = userPostsQuery(queryString);

    const userData =
      queryClient.getQueryData(userQueryObj.queryKey) ??
      (await queryClient.fetchQuery(userQueryObj));

    const postsData =
      queryClient.getQueryData(postsQueryObj.queryKey) ??
      (await queryClient.fetchQuery(postsQueryObj));

    return { userData, postsData };
  };

function Users() {
  const { userData, postsData } = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const user = useAuth((state) => state.user);
  const { username } = useParams();

  useEffect(() => {
    if (username === user.username) {
      navigate("/profile");
    }
  }, [username, user.username, navigate]);

  if (navigation.state === "loading") return <UsersLoadingSkeleton />;

  if (userData.length === 0) {
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
        {postsData?.map((element) => (
          <PostCard key={element.username} postData={element} />
        ))}
        {postsData.length === 0 && (
          <p className="text-green-300 font-bold">No Posts found...</p>
        )}
      </div>
    </main>
  );
}

export default Users;

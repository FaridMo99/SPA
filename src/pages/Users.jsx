import ImageSection from "../components/profile/ImageSection";
import PostCard from "../components/home/PostCard";
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

export const clientLoader =
  (queryClient) =>
  async ({ params }) => {
    const username = params.username;
    const queryString = `/${username}`;
    const userQueryObj = userQuery(queryString);

    const userData =
      queryClient.getQueryData(userQueryObj.queryKey) ??
      (await queryClient.fetchQuery(userQueryObj));

    return { userData };
  };

function Users() {
  const { userData } = useLoaderData();
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

  if (!userData) {
    throw new Error();
  }

  return (
    <main className="flex flex-col">
      <ImageSection
        bio={userData.bio}
        img={userData.avatar}
        username={userData.username}
      />
      <div className="w-full flex flex-col items-center mt-10">
        {userData?.posts.map((element) => (
          <PostCard key={element.username} postData={element} />
        ))}
        {userData.posts.length === 0 && (
          <p className="text-green-300 font-bold">No Posts found...</p>
        )}
      </div>
    </main>
  );
}

export default Users;

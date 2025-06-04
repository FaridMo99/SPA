import ImageSection from "../components/profile/ImageSection";
import PostCard from "../components/home/PostCard";
import getPosts from "../utils/getPosts";
import getUsers from "../utils/getUsers";
import UsersLoadingSkeleton from "../components/UsersLoadingSkeleton";
import { useLoaderData, useNavigation } from "react-router-dom";

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
    const queryString = `?username=${username}`;
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
  const navigate = useNavigation();

  if (navigate.state === "loading") return <UsersLoadingSkeleton />;

  if (userData.length === 0) {
    throw new Error();
  }

  return (
    <main className="flex flex-col">
      <ImageSection
        bio={userData[0].bio}
        img={userData[0].avatar}
        username={userData[0].username}
      />
      <div className="w-full flex flex-col items-center mt-10">
        {postsData?.map((element) => (
          <PostCard key={element.username} postData={element} />
        ))}
        {postsData.length === 0 && <p>No Posts found...</p>}
      </div>
    </main>
  );
}

export default Users;

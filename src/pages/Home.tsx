import { getPostsForFyp } from "../utils/getPosts";
import Main from "../components/home/Main";

function Home() {
  return <Main fetchFunction={getPostsForFyp} />;
}

export default Home;

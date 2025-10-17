import Main from "../components/home/Main";
import { getPostsByFollow } from "../utils/getPosts";

function Follow() {
  return <Main fetchFunction={getPostsByFollow} />;
}

export default Follow;

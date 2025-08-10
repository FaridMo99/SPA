import UserImage from "../UserImage";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";

export type Avatar = string | null;

function Header({ avatar }: { avatar: Avatar }) {
  return (
    <header className="w-full h-[15vh] border-green-300 dark:border-dark-green border-b-2 flex items-center justify-between fixed top-0 right-0 bg-gray-50 dark:bg-dark-gray z-498">
      <Link to="/home" className="self-start font-bold text-4xl">
        <h1>friendly.</h1>
      </Link>
      <Searchbar />
      <div className="w-[20vw] h-full border-l-2 border-green-300 dark:border-dark-green flex justify-center items-center">
        <Link to="/profile">
          <UserImage img={avatar} />
        </Link>
      </div>
    </header>
  );
}

export default Header;

import UserImage from "../UserImage";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";


function Header({avatar}) {

  return (
    <header className="w-full h-[15vh] border-green-300 border-b-2 flex items-center justify-between fixed top-0 right-0 bg-gray-50 z-5">
      <Link to="/home" className="self-start font-bold text-4xl">
        <h1>friendly.</h1>
      </Link>
      <Searchbar />
      <div className="w-[20vw] h-full border-l-2 border-green-300 flex justify-center items-center">
        {avatar ? (
          <UserImage img={avatar} />
        ) : (
          <UserImage noImg size="20" userSize={60} />
        )}
      </div>
    </header>
  );
}

export default Header;
import useAuth from "../../stores/authStore";
import UserImage from "../UserImage";
import Searchbar from "./Searchbar";

function Header() {
  const user = useAuth();

  return (
    <header className="w-full h-[15vh] border-green-300 border-b-2 flex items-center justify-between fixed top-0 right-0 bg-gray-50 z-5">
      <h1 className="self-start font-bold text-4xl">friendly.</h1>
      <Searchbar />
      <div className="w-[20vw] h-full border-l-2 border-green-300 flex justify-center items-center">
        {user?.img ? (
          <UserImage img={user.img} />
        ) : (
          <UserImage noImg size="20" userSize={60} />
        )}
      </div>
    </header>
  );
}

export default Header;

//add search functionality
//add debounce
//make button prevent default
//add on search that if no users with that name theres no user found with a loop icon
//add button to completely empty input
//fix bug that shows line when nothing found
//make it so if query key changes but not the data no refetch,
//right now if only one name left it keeps refetching when typing in name

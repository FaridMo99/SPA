import React, { useState } from "react";
import { User, Search } from "lucide-react";
import useAuth from "../../stores/authStore";

function Header() {
  const user = useAuth();
  const [search, setSearch] = useState(
    JSON.parse(sessionStorage.getItem("search")) || "",
  );

  return (
    <header className="w-full h-[15vh] border-green-300 border-b-2 flex items-center justify-between fixed top-0 right-0 bg-gray-50">
      <h1 className="self-start font-bold text-4xl">friendly.</h1>
      <form className="w-2/3 h-2/3 flex justify-center items-center">
        <input
          name="search"
          placeholder="Search..."
          className="h-1/2 w-4/5 border-2 border-r-1 border-gray-300 rounded-l-lg outline-0 px-2 focus:shadow-lg"
          type="text"
          autoComplete="on"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            sessionStorage.setItem("search", JSON.stringify(e.target.value));
          }}
        />
        <button
          type="submit"
          className="h-1/2 bg-gray-600 rounded-r-lg px-3 flex items-center justify-center"
        >
          <Search size={24} className="text-green-300" />
        </button>
      </form>

      <div className="w-[20vw] h-full border-l-2 border-green-300 flex justify-center items-center">
        <div className="w-20 h-20 flex justify-center items-center rounded-full border-green-300 border-4 overflow-hidden  bg-gray-600">
          {user?.img ? (
            <img
              src={user.img}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={40} className="text-green-300" />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

//add search functionality
//make button prevent default

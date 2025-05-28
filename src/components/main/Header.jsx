import React, { useState } from "react";
import { Search } from "lucide-react";
import useAuth from "../../stores/authStore";
import UserImage from "../UserImage";
import SearchList from "./SearchList";
import {useQuery} from "@tanstack/react-query"
import getUsers from "../../utils/getUsers"

function Header() {
  const user = useAuth();
  const [search, setSearch] = useState(
    JSON.parse(sessionStorage.getItem("search")) || "",
  );

  const {data} = useQuery({
    queryKey:["get users for searchbar", search],
    queryFn:()=>getUsers(`?username=${search}`)
  })

  return (
    <header className="w-full h-[15vh] border-green-300 border-b-2 flex items-center justify-between fixed top-0 right-0 bg-gray-50">
      <h1 className="self-start font-bold text-4xl">friendly.</h1>
      <form className="w-2/3 h-2/3 flex justify-center items-center relative">
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
        {search.length > 0 && (
          <SearchList items={data} styles="border-2 border-gray-300 border-t-0 absolute top-[7.5vh] w-[calc(79%+48px)] bg-gray-50 z-50 rounded-b-lg max-h-[20vh] overflow-y-auto" />
        )}
      </form>

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

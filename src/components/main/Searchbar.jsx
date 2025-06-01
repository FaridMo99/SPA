import  { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import getUsers from "../../utils/getUsers";
import SearchList from "./SearchList";

function Searchbar() {
  const [search, setSearch] = useState(
    JSON.parse(sessionStorage.getItem("search")) || "",
  );
  const [isFocused, setIsFocused] = useState(false);

  const { data } = useQuery({
    queryKey: ["get users for searchbar", search],
    queryFn: () => getUsers(`?username=${search}`),
    enabled: search.length > 0,
  });

  return (
    <form className="w-2/3 h-2/3 flex justify-center items-center relative z-4">
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        name="search"
        placeholder="Search..."
        className={`h-1/2 w-4/5 border-2 bg-gray-50 border-r-1 border-gray-300 rounded-l-lg outline-0 px-2 ${search.length === 0 ? "focus:shadow-lg" : ""} z-4`}
        type="text"
        autoComplete="on"
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          sessionStorage.setItem("search", JSON.stringify(value));
        }}
      />
      <button
        type="submit"
        className="h-1/2 bg-gray-600 rounded-r-lg px-3 flex items-center justify-center z-3"
      >
        <Search size={24} className="text-green-300" />
      </button>
      {search.length > 0 && isFocused && (
        <SearchList
          items={data}
          styles="border-2 border-gray-300 border-t-0 absolute top-[7vh] w-[calc(79%+48px)] bg-gray-50 rounded-b-lg max-h-[20vh] overflow-y-auto z-2"
        />
      )}
    </form>
  );
}

export default Searchbar;

//add search functionality
//add debounce
//make button prevent default
//add on search that if no users with that name theres no user found with a loop icon
//make it so if query key changes but not the data no refetch,
//right now if only one name left it keeps refetching when typing in name
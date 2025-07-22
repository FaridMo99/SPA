import React, { useState, useRef } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../utils/getUsers";
import SearchList from "./SearchList";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import type { User } from "../../mocks/data";

function Searchbar() {
  const [search, setSearch] = useState<string>(() => {
    const stored = sessionStorage.getItem("search");
    return stored !== null ? JSON.parse(stored) : "";
  });
  const debouncedSearch: string = useDebounce(search, 600);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data } = useQuery<User[]>({
    queryKey: ["get users for searchbar", debouncedSearch],
    queryFn: () => getAllUsers(`?search=${debouncedSearch}`),
    enabled: debouncedSearch.length > 0,
  });

  function searchHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (data && data.length > 0) {
      setIsFocused(false);
      inputRef.current?.blur();
      navigate(`/${data[0].username}`);
    }
  }

  return (
    <form
      onSubmit={searchHandler}
      className="w-2/3 h-2/3 flex justify-center items-center relative z-4"
    >
      <input
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setTimeout(() => {
            setIsFocused(false);
          }, 200);
        }}
        name="search"
        placeholder="Search..."
        className={`h-1/2 w-4/5 border-2 bg-gray-50 border-r-1 border-gray-300 rounded-l-lg outline-0 px-2 ${
          search.length === 0 ? "focus:shadow-lg" : ""
        } z-4`}
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
        className="h-1/2 bg-gray-600 rounded-r-lg px-3 flex items-center justify-center z-500 disabled:opacity-60"
        disabled={!data || data.length === 0}
      >
        <Search size={24} className="text-green-300" />
      </button>
      {debouncedSearch.length > 0 && isFocused && (
        <SearchList items={data ?? []} />
      )}
    </form>
  );
}

export default Searchbar;

import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

function SearchList({ items }) {
  const styles =
    "border-2 flex flex-col border-gray-300 border-t-0 absolute top-[7vh] w-[calc(79%+48px)] bg-gray-50 rounded-b-lg max-h-[20vh] overflow-y-auto z-499";
  return (
    <div className={styles}>
      {items?.map((item) => (
        <Link
          to={`/${item.username}`}
          className="w-full hover:bg-gray-300 h-11"
        >
          {item.username}
        </Link>
      ))}
      {!items && (
        <div className="w-full h-[10vh] flex justify-center items-center text-gray-500">
          <p>No Users Found</p>
          <Search className="ml-2" />
        </div>
      )}
    </div>
  );
}

export default SearchList;

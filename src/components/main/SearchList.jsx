import React from "react";
import useDebounce from "../../hooks/useDebounce";

function SearchList({ styles, items }) {
  return (
    <ul className={styles}>
      {items?.map((item) => (
        <li className="w-full hover:bg-gray-300 h-11">{item.username}</li>
      ))}
    </ul>
  );
}

export default SearchList;

//add functionality when clicking on user you dynamically route to their page

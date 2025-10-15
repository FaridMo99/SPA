import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import type { User } from "../../types/types";


function SearchList({ items }: { items: User[] }) {
  const styles =
    "border-2 flex flex-col border-gray-300 border-t-0 absolute top-[7vh] w-[calc(80%+48px)] bg-gray-50 dark:bg-dark-gray dark:border-dark-green rounded-b-lg max-h-[20vh] overflow-y-auto z-499";
  return (
    <div className={styles}>
      {items?.map((item) => (
        <Link
          to={`/${item.username}`}
          className="w-full hover:bg-gray-300 h-11"
          key={item.username}
        >
          {item.username}
        </Link>
      ))}
      {items.length === 0 && (
        <div className="w-full h-[10vh] flex justify-center items-center text-gray-500">
          <p>No Users Found</p>
          <Search className="ml-2 dark:text-dark-green" />
        </div>
      )}
    </div>
  );
}

export default SearchList;

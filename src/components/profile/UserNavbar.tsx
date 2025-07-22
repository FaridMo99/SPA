import { NavLink } from "react-router-dom";
import type { Link } from "../../layouts/ProfileLayout";

function UserNavbar({ links }: { links: Link[] }) {
  return (
    <nav
      aria-label="User navigation"
      className="w-full h-10 bg-gray-400 flex justify-evenly items-center"
    >
      {links.map((link) => (
        <NavLink
          end
          className={({ isActive }) =>
            `${isActive ? "decoration-3 text-white decoration-green-300 underline underline-offset-4" : ""} hover:bg-gray-300 h-full flex items-center justify-center px-4 font-bold`
          }
          to={link.href}
          key={link.href}
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default UserNavbar;
